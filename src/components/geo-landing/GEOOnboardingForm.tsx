"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Upload, Building, Globe, Palette, Clock, Mail, Phone, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OnboardingData {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  province: string;
  serviceType: string;
  targetAudience: string;
  keyMessage: string;
  competitors: string;
  designPreference: "modern" | "classic" | "bold" | "minimal";
  deliverables: string[];
  timeline: string;
}

interface GEOOnboardingFormProps {
  onSubmit?: (data: OnboardingData) => void;
  onSuccess?: () => void;
}

const steps = [
  { id: 1, title: "Business Info", icon: Building },
  { id: 2, title: "Location", icon: Globe },
  { id: 3, title: "Content", icon: FileText },
  { id: 4, title: "Design", icon: Palette },
];

const serviceTypes = [
  "Professional Services",
  "Restaurant & Food",
  "Retail & E-commerce",
  "Health & Wellness",
  "Real Estate",
  "Finance & Legal",
  "Education",
  "Home Services",
  "Other",
];

const provinces = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Free State",
  "Northern Cape",
];

const majorCities: Record<string, string[]> = {
  Gauteng: ["Johannesburg", "Pretoria", "Midrand", "Sandton", "Roodepoort"],
  "Western Cape": ["Cape Town", "Stellenbosch", "Paarl", "Durbanville"],
  "KwaZulu-Natal": ["Durban", "Pietermaritzburg", "Umhlanga", "Ballito"],
  "Eastern Cape": ["Port Elizabeth", "East London", "Mthatha"],
  Limpopo: ["Polokwane", "Thabazimbi", "Louis Trichardt"],
  Mpumalanga: ["Nelspruit", "Mbombela", "White River"],
  "North West": ["Rustenburg", "Klerksdorp", "Mafikeng"],
  "Free State": ["Bloemfontein", "Welkom", "Bethlehem"],
  "Northern Cape": ["Kimberley", "Upington", "Springbok"],
};

export default function GEOOnboardingForm({ onSubmit, onSuccess }: GEOOnboardingFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  const [formData, setFormData] = useState<OnboardingData>({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    city: "",
    province: "",
    serviceType: "",
    targetAudience: "",
    keyMessage: "",
    competitors: "",
    designPreference: "modern",
    deliverables: ["landing-page"],
    timeline: "48-hours",
  });

  const updateField = <K extends keyof OnboardingData>(field: K, value: OnboardingData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSubmit?.(formData);
      setIsComplete(true);
      onSuccess?.();
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.businessName && formData.contactName && formData.email;
      case 2:
        return formData.city && formData.province;
      case 3:
        return formData.serviceType && formData.targetAudience;
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (isComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto p-8 border border-signal-lime/30 bg-signal-lime/10 rounded-lg text-center"
      >
        <div className="w-16 h-16 rounded-full bg-signal-lime/20 flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-signal-lime" />
        </div>
        <h2 className="text-2xl font-black mb-2">You're In!</h2>
        <p className="text-spectral-white/60 mb-4">
          We've received your details. Our team will be in touch within 24 hours to kick things off.
        </p>
        <p className="text-sm text-spectral-white/40 font-mono">
          Reference: GEO-{Date.now().toString(36).toUpperCase()}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.id === currentStep;
          const isComplete = step.id < currentStep;
          
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                  ${isActive ? "border-signal-lime bg-signal-lime/20" : isComplete ? "border-signal-lime bg-signal-lime" : "border-spectral-white/20"}
                `}>
                  {isComplete ? (
                    <Check className="w-5 h-5 text-onyx" />
                  ) : (
                    <Icon className={`w-5 h-5 ${isActive ? "text-signal-lime" : "text-spectral-white/40"}`} />
                  )}
                </div>
                <span className={`text-xs mt-2 font-mono ${isActive ? "text-signal-lime" : "text-spectral-white/40"}`}>
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-2 ${isComplete ? "bg-signal-lime" : "bg-spectral-white/20"}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="border border-spectral-white/10 bg-spectral-white/5 rounded-lg p-6">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold mb-4">Tell us about your business</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-spectral-white/60 mb-1 block">Business Name *</label>
                  <Input
                    placeholder="Your Business Name"
                    value={formData.businessName}
                    onChange={(e) => updateField("businessName", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-spectral-white/60 mb-1 block">Contact Person *</label>
                  <Input
                    placeholder="Your Name"
                    value={formData.contactName}
                    onChange={(e) => updateField("contactName", e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-spectral-white/60 mb-1 block">Email *</label>
                  <Input
                    type="email"
                    placeholder="you@business.co.za"
                    value={formData.email}
                    onChange={(e) => updateField("email", e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm text-spectral-white/60 mb-1 block">Phone</label>
                  <Input
                    type="tel"
                    placeholder="+27 82 123 4567"
                    value={formData.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold mb-4">Where do you operate?</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-spectral-white/60 mb-1 block">Province *</label>
                  <Select value={formData.province} onValueChange={(v) => {
                    updateField("province", v);
                    updateField("city", "");
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map(p => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm text-spectral-white/60 mb-1 block">City/Town *</label>
                  <Select value={formData.city} onValueChange={(v) => updateField("city", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder={formData.province ? "Select city" : "Select province first"} />
                    </SelectTrigger>
                    <SelectContent>
                      {(majorCities[formData.province] || []).map(c => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold mb-4">What do you do?</h3>
              
              <div>
                <label className="text-sm text-spectral-white/60 mb-1 block">Business Type *</label>
                <Select value={formData.serviceType} onValueChange={(v) => updateField("serviceType", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {serviceTypes.map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm text-spectral-white/60 mb-1 block">Who is your ideal customer? *</label>
                <Textarea
                  placeholder="E.g., Small business owners in Johannesburg looking for professional web design..."
                  value={formData.targetAudience}
                  onChange={(e) => updateField("targetAudience", e.target.value)}
                  rows={3}
                />
              </div>
              
              <div>
                <label className="text-sm text-spectral-white/60 mb-1 block">Key message (optional)</label>
                <Textarea
                  placeholder="What's the main thing you want visitors to know?"
                  value={formData.keyMessage}
                  onChange={(e) => updateField("keyMessage", e.target.value)}
                  rows={2}
                />
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-bold mb-4">Design preferences</h3>
              
              <div>
                <label className="text-sm text-spectral-white/60 mb-2 block">Design Style</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {(["modern", "classic", "bold", "minimal"] as const).map(style => (
                    <button
                      key={style}
                      onClick={() => updateField("designPreference", style)}
                      className={`
                        p-3 rounded-lg border text-sm font-mono capitalize transition-all
                        ${formData.designPreference === style 
                          ? "border-signal-lime bg-signal-lime/10 text-signal-lime" 
                          : "border-spectral-white/20 hover:border-spectral-white/40"}
                      `}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-signal-lime/5 border border-signal-lime/20 rounded-lg">
                <div className="flex items-center gap-2 text-signal-lime mb-2">
                  <Clock size={18} />
                  <span className="font-bold">48-Hour Delivery</span>
                </div>
                <p className="text-sm text-spectral-white/60">
                  Your landing page will be delivered within 48 hours of confirmation.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-between mt-6 pt-4 border-t border-spectral-white/10">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          
          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-signal-lime text-onyx hover:bg-signal-lime/90"
            >
              Next
              <ArrowRight className="ml-2" size={16} />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-signal-lime text-onyx hover:bg-signal-lime/90"
            >
              {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              <ArrowRight className="ml-2" size={16} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
