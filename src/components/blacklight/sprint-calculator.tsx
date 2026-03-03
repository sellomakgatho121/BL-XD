"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, Minus, Calculator, RefreshCw, Zap, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

type BasePackage = {
  id: string;
  name: string;
  basePrice: number;
  baseWeeks: number;
  description: string;
};

type AddOn = {
  id: string;
  name: string;
  price: number;
  durationWeeks: number;
  description: string;
};

const basePackages: BasePackage[] = [
  { 
    id: "discovery", 
    name: "Discovery Node", 
    basePrice: 4500, 
    baseWeeks: 1,
    description: "AI-ready landing page + GEO setup" 
  },
  { 
    id: "merchant", 
    name: "Chat Merchant", 
    basePrice: 12000, 
    baseWeeks: 3,
    description: "WhatsApp AI store + Payments" 
  },
  { 
    id: "orchestrator", 
    name: "Orchestrator Setup", 
    basePrice: 25000, 
    baseWeeks: 6,
    description: "Full multi-agent architecture" 
  },
];

const availableAddOns: AddOn[] = [
  { 
    id: "video", 
    name: "Video Engine", 
    price: 6000, 
    durationWeeks: 0, 
    description: "30 AI shorts/mo (Recurring)" 
  },
  { 
    id: "blog", 
    name: "Content Hub", 
    price: 3500, 
    durationWeeks: 1, 
    description: "SEO blog engine setup" 
  },
  { 
    id: "crm", 
    name: "CRM Sync", 
    price: 4500, 
    durationWeeks: 1, 
    description: "HubSpot/Pipedrive integration" 
  },
  { 
    id: "training", 
    name: "Deep Training", 
    price: 5000, 
    durationWeeks: 2, 
    description: "Custom knowledge base ingestion" 
  },
];

export default function SprintCalculator() {
  const [selectedPackage, setSelectedPackage] = useState<string>("merchant");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const currentPackage = basePackages.find(p => p.id === selectedPackage) || basePackages[0];
  
  const totalPrice = currentPackage.basePrice + selectedAddOns.reduce((sum, id) => {
    const addOn = availableAddOns.find(a => a.id === id);
    return sum + (addOn?.price || 0);
  }, 0);

  const totalWeeks = currentPackage.baseWeeks + selectedAddOns.reduce((sum, id) => {
    const addOn = availableAddOns.find(a => a.id === id);
    return sum + (addOn?.durationWeeks || 0);
  }, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR',
      maximumFractionDigits: 0 
    }).format(price);
  };

  return (
    <div className="border border-[var(--border)] bg-[var(--card)] p-6 md:p-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-8">
        <Calculator className="w-5 h-5 text-[var(--signal-lime)]" />
        <h2 className="text-xl font-bold font-mono uppercase tracking-wider">Sprint Calculator</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Selection Column */}
        <div className="space-y-8">
          <div>
            <label className="text-sm text-[var(--spectral-dim)] uppercase tracking-wider mb-4 block">Select Core System</label>
            <div className="space-y-3">
              {basePackages.map((pkg) => (
                <div 
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg.id)}
                  className={`p-4 border cursor-pointer transition-all duration-300 ${
                    selectedPackage === pkg.id 
                      ? "border-[var(--signal-lime)] bg-[var(--signal-lime)]/5" 
                      : "border-[var(--border)] hover:border-[var(--border-hover)]"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold">{pkg.name}</span>
                    <span className="text-[var(--signal-lime)] font-mono">{formatPrice(pkg.basePrice)}</span>
                  </div>
                  <p className="text-xs text-[var(--spectral-dim)]">{pkg.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-[var(--spectral-dim)] uppercase tracking-wider mb-4 block">Add Modules</label>
            <div className="grid grid-cols-1 gap-3">
              {availableAddOns.map((addOn) => (
                <div 
                  key={addOn.id}
                  onClick={() => toggleAddOn(addOn.id)}
                  className={`flex items-center justify-between p-3 border cursor-pointer transition-all duration-300 ${
                    selectedAddOns.includes(addOn.id)
                      ? "border-[var(--signal-lime)] bg-[var(--signal-lime)]/5"
                      : "border-[var(--border)] hover:border-[var(--border-hover)]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${
                      selectedAddOns.includes(addOn.id) ? "border-[var(--signal-lime)] bg-[var(--signal-lime)]" : "border-[var(--spectral-dim)]"
                    }`}>
                      {selectedAddOns.includes(addOn.id) && <Check className="w-3 h-3 text-[var(--onyx)]" />}
                    </div>
                    <div>
                      <div className="text-sm font-bold">{addOn.name}</div>
                      <div className="text-[10px] text-[var(--spectral-dim)]">{addOn.description}</div>
                    </div>
                  </div>
                  <div className="text-sm font-mono text-[var(--spectral-muted)]">
                    +{formatPrice(addOn.price)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="flex flex-col h-full border-l border-[var(--border)] md:pl-12">
          <div className="flex-grow space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm text-[var(--spectral-dim)] uppercase tracking-wider">Estimated Timeline</h3>
              <div className="flex items-end gap-2">
                <span className="text-6xl font-black text-[var(--spectral-white)] leading-none">{totalWeeks}</span>
                <span className="text-xl text-[var(--spectral-dim)] mb-1">Weeks</span>
              </div>
              <div className="w-full bg-[var(--border)] h-2 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((totalWeeks / 12) * 100, 100)}%` }}
                  className="h-full bg-[var(--signal-lime)]"
                />
              </div>
              <p className="text-xs text-[var(--spectral-dim)] flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Includes development, testing, and handoff
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm text-[var(--spectral-dim)] uppercase tracking-wider">Total Investment</h3>
              <div className="text-5xl font-black text-[var(--signal-lime)] leading-none">
                {formatPrice(totalPrice)}
              </div>
              <p className="text-xs text-[var(--spectral-dim)] flex items-center gap-2">
                <Zap className="w-3 h-3" />
                One-time project fee. No hidden hourly costs.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-[var(--border)]">
            <Button className="w-full py-6 text-lg font-mono uppercase tracking-wider bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90">
              Book This Sprint
            </Button>
            <p className="text-center text-xs text-[var(--spectral-dim)] mt-4">
              * Final quote subject to strategy session confirmation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
