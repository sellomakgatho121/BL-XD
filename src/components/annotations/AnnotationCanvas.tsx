"use client";

import CursorPresence from "./CursorPresence";
import CommentThread from "./CommentThread";

export default function AnnotationCanvas({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CursorPresence />
      <CommentThread />
      {children}
    </>
  );
}
