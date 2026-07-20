"use client";

import { Upload } from "lucide-react";

export default function FileUpload({ label, accept, multiple }: { label?: string; accept?: string; multiple?: boolean }) {
  return (
    <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-bl-gold/30 transition-colors cursor-pointer">
      <Upload size={24} className="text-bl-ice/20 mx-auto mb-2" />
      <p className="text-xs text-bl-ice/40">{label || "Upload files"}</p>
    </div>
  );
}
