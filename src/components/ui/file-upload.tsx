"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Upload,
  File,
  X,
  Download,
  Trash2,
  Image as ImageIcon,
  FileText,
  Archive,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadFile, getPublicUrl, deleteFile, StorageBuckets } from "@/lib/supabase/storage";

export interface ProjectFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  created_at: string;
}

interface FileUploadProps {
  projectId: string;
  files: ProjectFile[];
  onFilesChange: (files: ProjectFile[]) => void;
  disabled?: boolean;
  onPreviewFile?: (file: ProjectFile) => void;
}

const fileIcons = {
  "image/": ImageIcon,
  "text/": FileText,
  "application/pdf": FileText,
  "application/zip": Archive,
  "application/x-zip": Archive,
  default: File,
};

export function FileUpload({ projectId, files, onFilesChange, disabled, onPreviewFile }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (mimeType: string) => {
    const iconType = Object.keys(fileIcons).find((type) => mimeType.startsWith(type));
    return fileIcons[iconType as keyof typeof fileIcons] || fileIcons.default;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const newFiles: ProjectFile[] = [];

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i];
        const fileName = `${Date.now()}-${file.name}`;
        const filePath = `${projectId}/${fileName}`;

        // Upload file
        const uploadResult = await uploadFile(StorageBuckets.PROJECT_FILES, filePath, file);
        
        // Get public URL
        const publicUrl = await getPublicUrl(StorageBuckets.PROJECT_FILES, filePath);

        newFiles.push({
          id: uploadResult.id,
          name: file.name,
          type: file.type,
          size: file.size,
          url: publicUrl,
          created_at: new Date().toISOString(),
        });

        setUploadProgress(((i + 1) / selectedFiles.length) * 100);
      }

      onFilesChange([...files, ...newFiles]);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteFile = async (file: ProjectFile) => {
    if (disabled) return;

    try {
      // Extract file path from URL
      const urlParts = file.url.split("/");
      const fileName = urlParts[urlParts.length - 1];
      const filePath = `${projectId}/${fileName}`;

      await deleteFile(StorageBuckets.PROJECT_FILES, filePath);
      onFilesChange(files.filter((f) => f.id !== file.id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete file. Please try again.");
    }
  };

  const handleDownload = (file: ProjectFile) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      {!disabled && (
        <div className="border-2 border-dashed border-[var(--border)] rounded-none p-8 text-center hover:border-[var(--signal-lime)]/50 transition-colors">
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={handleFileSelect}
            disabled={isUploading}
            className="hidden"
            accept="image/*,.pdf,.doc,.docx,.txt,.zip"
          />
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90 rounded-none"
            >
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? `Uploading... ${Math.round(uploadProgress)}%` : "Upload Files"}
            </Button>
          </motion.div>

          <p className="text-sm text-[var(--spectral-muted)] mt-4">
            Images, PDFs, documents, and archives (Max 10MB per file)
          </p>
        </div>
      )}

      {/* Files List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-mono uppercase text-[var(--spectral-muted)]">
            Files ({files.length})
          </h3>
          
          <div className="space-y-2">
            {files.map((file) => {
              const Icon = getFileIcon(file.type);
              
              return (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between p-3 bg-[var(--card)] border border-[var(--border)] hover:border-[var(--signal-lime)]/50 transition-colors"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Icon className="w-5 h-5 text-[var(--spectral-muted)] flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <p className="text-xs text-[var(--spectral-muted)]">
                        {formatFileSize(file.size)} • {new Date(file.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {file.type.startsWith("image/") && onPreviewFile && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onPreviewFile(file)}
                        className="p-1 hover:bg-[var(--spectral-muted)]/10"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(file)}
                      className="p-1 hover:bg-[var(--spectral-muted)]/10"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    
                    {!disabled && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFile(file)}
                        className="p-1 hover:bg-[var(--siren-red)]/10 text-[var(--siren-red)]"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
