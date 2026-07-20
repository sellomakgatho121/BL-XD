"use client";

import AnnotationCanvas from "./AnnotationCanvas";

export default function FilePreview({ file }: { file: { url: string; name: string } }) {
  return (
    <AnnotationCanvas>
      <div className="border border-white/5 rounded-xl p-3 bg-white/[0.02]">
        <p className="text-xs text-bl-ice/60 truncate">{file.name}</p>
      </div>
    </AnnotationCanvas>
  );
}
