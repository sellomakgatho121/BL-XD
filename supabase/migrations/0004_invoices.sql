-- Add invoices table for billing management
CREATE TABLE invoices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_number TEXT UNIQUE NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  client_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  issue_date DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date DATE NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  tax_rate DECIMAL(5,4) DEFAULT 0.15 NOT NULL,
  tax_amount DECIMAL(10,2) GENERATED ALWAYS AS (subtotal * tax_rate) STORED,
  total_amount DECIMAL(10,2) GENERATED ALWAYS AS (subtotal + tax_amount) STORED,
  currency TEXT DEFAULT 'ZAR' NOT NULL,
  notes TEXT,
  payment_method TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Invoice line items table
CREATE TABLE invoice_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE NOT NULL,
  description TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_invoices_client_id ON invoices(client_id);
CREATE INDEX idx_invoices_project_id ON invoices(project_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_invoices_issue_date ON invoices(issue_date DESC);
CREATE INDEX idx_invoice_items_invoice_id ON invoice_items(invoice_id);

-- Function to generate invoice number
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
  year_part TEXT;
  sequence_num INTEGER;
  invoice_number TEXT;
BEGIN
  year_part := EXTRACT(YEAR FROM CURRENT_DATE)::TEXT;
  
  -- Get next sequence number for this year
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 6) AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM invoices
  WHERE invoice_number LIKE 'INV-' || year_part || '-%';
  
  invoice_number := 'INV-' || year_part || '-' || LPAD(sequence_num::TEXT, 4, '0');
  
  RETURN invoice_number;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate invoice number
CREATE OR REPLACE FUNCTION set_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invoice_number IS NULL OR NEW.invoice_number = '' THEN
    NEW.invoice_number := generate_invoice_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_set_invoice_number
  BEFORE INSERT ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION set_invoice_number();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_invoice_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_invoice_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW
  EXECUTE FUNCTION update_invoice_updated_at();

-- RLS for invoices
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items ENABLE ROW LEVEL SECURITY;

-- Clients can view their own invoices
CREATE POLICY "Clients can view own invoices"
ON invoices FOR SELECT
USING (client_id = auth.uid());

-- Admins can manage all invoices
CREATE POLICY "Admins can manage all invoices"
ON invoices FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);

-- Invoice items inherit invoice permissions
CREATE POLICY "Invoice items follow invoice permissions"
ON invoice_items FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM invoices 
    WHERE invoices.id = invoice_items.invoice_id
    AND (
      invoices.client_id = auth.uid()
      OR EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role IN ('admin', 'superadmin')
      )
    )
  )
);

-- Function to create invoice from project
CREATE OR REPLACE FUNCTION create_project_invoice(
  p_project_id UUID,
  p_due_date DATE,
  p_items JSONB DEFAULT '[]'::JSONB
)
RETURNS UUID AS $$
DECLARE
  v_invoice_id UUID;
  v_client_id UUID;
  v_project_name TEXT;
BEGIN
  -- Get project details
  SELECT client_id, name INTO v_client_id, v_project_name
  FROM projects
  WHERE id = p_project_id;
  
  IF v_client_id IS NULL THEN
    RAISE EXCEPTION 'Project not found';
  END IF;
  
  -- Create invoice
  INSERT INTO invoices (
    project_id,
    client_id,
    due_date,
    notes
  ) VALUES (
    p_project_id,
    v_client_id,
    p_due_date,
    'Invoice for project: ' || v_project_name
  ) RETURNING id INTO v_invoice_id;
  
  -- Add invoice items if provided
  IF jsonb_array_length(p_items) > 0 THEN
    INSERT INTO invoice_items (invoice_id, description, quantity, unit_price)
    SELECT 
      v_invoice_id,
      item->>'description',
      (item->>'quantity')::DECIMAL,
      (item->>'unit_price')::DECIMAL
    FROM jsonb_array_elements(p_items) AS item;
  END IF;
  
  RETURN v_invoice_id;
END;
$$ LANGUAGE plpgsql;
