"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnnotationCanvas } from "./AnnotationCanvas";

interface ProjectFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  created_at: string;
}

interface FilePreviewProps {
  file: ProjectFile;
  projectId: string;
  onClose?: () => void;
}

export function FilePreview({ file, projectId, onClose }: FilePreviewProps) {
  const [isAnnotating, setIsAnnotating] = useState(false);
  const isImage = file.type.startsWith("image/");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-[var(--onyx)]/95 flex flex-col"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-[var(--spectral-muted)]">PREVIEW</span>
          <span className="font-medium">{file.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isAnnotating ? "default" : "outline"}
            size="sm"
            onClick={() => setIsAnnotating(!isAnnotating)}
            className="rounded-none"
          >
            <Maximize2 className="w-4 h-4 mr-2" />
            {isAnnotating ? "Annotating" : "Annotate"}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-[var(--spectral-muted)] hover:text-[var(--spectral-white)]"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <div className="flex-1 relative overflow-hidden">
        {isAnnotating ? (
          <AnnotationCanvas 
            projectId={projectId} 
            projectFileId={file.id}
            className="w-full h-full"
          >
            <FileContent file={file} isImage={isImage} />
          </AnnotationCanvas>
        ) : (
          <FileContent file={file} isImage={isImage} />
        )}
      </div>
    </motion.div>
  );
}

function FileContent({ file, isImage }: { file: ProjectFile; isImage: boolean }) {

  if (isImage) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-[var(--onyx)]">
        <Image
          src={file.url}
          alt={file.name}
          width={1920}
          height={1080}
          className="max-w-full max-h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-[var(--onyx)]">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-[var(--spectral-muted)]/10 rounded-lg flex items-center justify-center">
          <span className="text-2xl">📄</span>
        </div>
        <p className="text-sm text-[var(--spectral-muted)] mb-2">Preview not available</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(file.url, "_blank")}
          className="rounded-none"
        >
          Open in New Tab
        </Button>
      </div>
    </div>
  );
}
