"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Send, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Annotation, AnnotationComment } from "@/lib/annotations";
import { addComment, deleteComment, subscribeToComments } from "@/lib/annotations";
import { cn } from "@/lib/utils";

interface CommentThreadProps {
  annotation: Annotation;
  onClose?: () => void;
  className?: string;
}

function formatDistanceToNow(date: Date): string {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  return date.toLocaleDateString();
}

export function CommentThread({ annotation, onClose, className }: CommentThreadProps) {
  const [comments, setComments] = useState<AnnotationComment[]>(annotation.comments || []);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToComments(annotation.id, {
      onInsert: (comment) => {
        setComments((prev) => [...prev, comment]);
      },
      onDelete: (commentId) => {
        setComments((prev) => prev.filter((c) => c.id !== commentId));
      },
    });

    return () => {
      unsubscribe();
    };
  }, [annotation.id]);

  useEffect(() => {
    setComments(annotation.comments || []);
  }, [annotation.comments]);

  const handleAddComment = async () => {
    if (!newComment.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const comment = await addComment(annotation.id, newComment);
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  return (
    <Card className={cn("absolute z-50 w-80 bg-card border shadow-xl", className)}>
      <div className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[var(--signal-lime)]" />
            <span className="font-semibold text-sm">Discussion</span>
            {comments.length > 0 && (
              <span className="text-xs bg-[var(--onyx)] px-2 py-0.5 rounded-full">
                {comments.length}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon-xs"
            onClick={onClose}
            className="h-6 w-6 text-[var(--spectral-dim)] hover:text-[var(--spectral-white)]"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="max-h-80 overflow-y-auto">
        <AnimatePresence initial={false}>
          {comments.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="p-6 text-center text-[var(--spectral-dim)] text-sm"
            >
              No comments yet. Start the discussion!
            </motion.div>
          )}

          {comments.map((comment, index) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ delay: index * 0.05 }}
              className="border-b last:border-b-0 px-4 py-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      {comment.user_profile?.full_name || "Anonymous"}
                    </span>
                    <span className="text-xs text-[var(--spectral-dim)]">
                      {formatDistanceToNow(new Date(comment.created_at))}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--spectral-muted)]">{comment.content}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => handleDeleteComment(comment.id)}
                  className="h-6 w-6 text-[var(--spectral-dim)] hover:text-[var(--siren-red)] flex-shrink-0"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t p-3">
        <div className="flex gap-2">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleAddComment();
              }
            }}
            className="min-h-[60px] resize-none text-sm"
          />
          <Button
            size="icon"
            onClick={handleAddComment}
            disabled={!newComment.trim() || isSubmitting}
            className="bg-[var(--signal-lime)] text-[var(--onyx)] hover:bg-[var(--signal-lime)]/90"
          >
            {isSubmitting ? (
              <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
