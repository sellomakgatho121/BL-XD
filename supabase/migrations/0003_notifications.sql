-- Add notifications table for real-time updates
ALTER TABLE profiles ADD COLUMN last_notification_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW();

CREATE TABLE notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('message', 'project_update', 'lead', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT FALSE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indexes for performance
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);

-- Function to create notifications for new messages
CREATE OR REPLACE FUNCTION create_message_notification()
RETURNS TRIGGER AS $$
DECLARE
  recipient_id UUID;
BEGIN
  -- Get the recipient (other user in the conversation)
  IF NEW.sender_id = NEW.recipient_id THEN
    RETURN NEW;
  END IF;

  recipient_id := NEW.recipient_id;

  -- Create notification
  INSERT INTO notifications (
    user_id,
    type,
    title,
    message,
    data
  ) VALUES (
    recipient_id,
    'message',
    'New Message',
    'You received a new message',
    jsonb_build_object('message_id', NEW.id, 'sender_id', NEW.sender_id)
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for new messages
CREATE TRIGGER trigger_message_notification
  AFTER INSERT ON messages
  FOR EACH ROW
  EXECUTE FUNCTION create_message_notification();

-- Function to create notifications for new leads
CREATE OR REPLACE FUNCTION create_lead_notification()
RETURNS TRIGGER AS $$
DECLARE
  admin_user_id UUID;
BEGIN
  -- Get first admin user
  SELECT id INTO admin_user_id
  FROM profiles
  WHERE role IN ('admin', 'superadmin')
  LIMIT 1;

  IF admin_user_id IS NOT NULL THEN
    INSERT INTO notifications (
      user_id,
      type,
      title,
      message,
      data
    ) VALUES (
      admin_user_id,
      'lead',
      'New Lead',
      'New contact form submission from ' || NEW.name,
      jsonb_build_object('lead_id', NEW.id, 'name', NEW.name, 'email', NEW.email)
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for new leads
CREATE TRIGGER trigger_lead_notification
  AFTER INSERT ON contact_submissions
  FOR EACH ROW
  EXECUTE FUNCTION create_lead_notification();

-- Function to create notifications for project updates
CREATE OR REPLACE FUNCTION create_project_update_notification()
RETURNS TRIGGER AS $$
DECLARE
  client_id UUID;
BEGIN
  -- Get client ID from project
  client_id := NEW.client_id;

  -- Don't notify if status hasn't changed
  IF OLD.status = NEW.status THEN
    RETURN NEW;
  END IF;

  INSERT INTO notifications (
    user_id,
    type,
    title,
    message,
    data
  ) VALUES (
    client_id,
    'project_update',
    'Project Update',
    'Project "' || NEW.name || '" status changed to ' || NEW.status,
    jsonb_build_object('project_id', NEW.id, 'old_status', OLD.status, 'new_status', NEW.status)
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for project status updates
CREATE TRIGGER trigger_project_update_notification
  AFTER UPDATE ON projects
  FOR EACH ROW
  WHEN (OLD.status IS DISTINCT FROM NEW.status)
  EXECUTE FUNCTION create_project_update_notification();

-- RLS for notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can only see their own notifications
CREATE POLICY "Users can view own notifications"
ON notifications FOR SELECT
USING (auth.uid() = user_id);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update own notifications"
ON notifications FOR UPDATE
USING (auth.uid() = user_id);

-- System can create notifications
CREATE POLICY "System can create notifications"
ON notifications FOR INSERT
WITH CHECK (true);

-- Admins can view all notifications
CREATE POLICY "Admins can view all notifications"
ON notifications FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE id = auth.uid() 
    AND role IN ('admin', 'superadmin')
  )
);
