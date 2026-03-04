"use client";

import { useState, useEffect, useRef } from "react";
import {
  MousePointer,
  Square,
  Pencil,
  Download,
  MessageSquare,
  CheckCircle2,
  X,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Annotation, AnnotationType, Point } from "@/lib/annotations";
import {
  getAnnotations,
  createAnnotation as createAnnotationApi,
  deleteAnnotation,
  resolveAnnotation,
  unresolveAnnotation,
  subscribeToAnnotations,
  downloadAnnotationsJson,
} from "@/lib/annotations";
import { CursorPresence } from "./CursorPresence";
import { CommentThread } from "./CommentThread";
import { cn } from "@/lib/utils";

interface AnnotationCanvasProps {
  projectId: string;
  projectFileId?: string;
  children: React.ReactNode;
  className?: string;
}

export function AnnotationCanvas({
  projectId,
  projectFileId,
  children,
  className,
}: AnnotationCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isAnnotating, setIsAnnotating] = useState(false);
  const [currentTool, setCurrentTool] = useState<AnnotationType>("point");
  const [currentColor, setCurrentColor] = useState("#ffff00");
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const [drawingStart, setDrawingStart] = useState<Point | null>(null);
  const [currentDrawingPosition, setCurrentDrawingPosition] = useState<Point | null>(null);
  const [selectedAnnotationId, setSelectedAnnotationId] = useState<string | null>(null);
  const [showToolbar, setShowToolbar] = useState(false);

  useEffect(() => {
    getAnnotations(projectId, projectFileId).then(setAnnotations);

    const unsubscribe = subscribeToAnnotations(projectId, projectFileId || null, {
      onInsert: (annotation) => {
        setAnnotations((prev) => [annotation, ...prev]);
      },
      onUpdate: (annotation) => {
        setAnnotations((prev) =>
          prev.map((a) => (a.id === annotation.id ? annotation : a))
        );
      },
      onDelete: (annotationId) => {
        setAnnotations((prev) => prev.filter((a) => a.id !== annotationId));
      },
    });

    return () => {
      unsubscribe();
    };
  }, [projectId, projectFileId]);

  const handleCanvasClick = async (e: React.MouseEvent) => {
    if (!isAnnotating || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (currentTool === "point") {
      await createAnnotationApi(projectId, "point", { x, y }, projectFileId, currentColor);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!isAnnotating || currentTool === "point") return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setIsDrawing(true);
    setDrawingStart({ x, y });
    setCurrentPath([{ x, y }]);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (currentTool === "freehand") {
      setCurrentPath([...currentPath, { x, y }]);
    } else if (currentTool === "rectangle") {
      setCurrentDrawingPosition({ x, y });
    }
  };

  const handleMouseUp = async () => {
    if (!isDrawing || !drawingStart) return;

    if (currentTool === "rectangle" && currentDrawingPosition) {
      const x = Math.min(drawingStart.x, currentDrawingPosition.x);
      const y = Math.min(drawingStart.y, currentDrawingPosition.y);
      const width = Math.abs(drawingStart.x - currentDrawingPosition.x);
      const height = Math.abs(drawingStart.y - currentDrawingPosition.y);

      if (width > 0.1 && height > 0.1) {
        await createAnnotationApi(projectId, "rectangle", { x, y, width, height }, projectFileId, currentColor);
      }
    } else if (currentTool === "freehand" && currentPath.length > 1) {
      await createAnnotationApi(projectId, "freehand", { points: currentPath }, projectFileId, currentColor);
    }

    setIsDrawing(false);
    setDrawingStart(null);
    setCurrentDrawingPosition(null);
    setCurrentPath([]);
  };

  const handleDeleteAnnotation = async (annotationId: string) => {
    await deleteAnnotation(annotationId);
    setSelectedAnnotationId(null);
  };

  const handleToggleResolve = async (annotation: Annotation) => {
    if (annotation.resolved) {
      await unresolveAnnotation(annotation.id);
    } else {
      await resolveAnnotation(annotation.id);
    }
  };

  const handleExport = async () => {
    await downloadAnnotationsJson(projectId, `annotations-${projectId}.json`);
  };

  const colors = ["#ffff00", "#ff0000", "#00ff00", "#0000ff", "#ff00ff", "#00ffff"];

  const selectedAnnotation = annotations.find((a) => a.id === selectedAnnotationId);

  return (
    <div
      ref={canvasRef}
      data-annotation-canvas="true"
      className={cn("relative overflow-hidden", className)}
      onMouseEnter={() => setShowToolbar(true)}
      onMouseLeave={() => setShowToolbar(false)}
      onClick={handleCanvasClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {children}

      <CursorPresence projectId={projectId} />

      {isAnnotating && (
        <div className="absolute inset-0 pointer-events-none border-2 border-[var(--signal-lime)]/50 border-dashed z-40" />
      )}

      {isDrawing && currentTool === "freehand" && currentPath.length > 1 && (
        <svg className="absolute inset-0 pointer-events-none z-50">
          <polyline
            points={currentPath.map((p) => `${p.x}% ${p.y}%`).join(" ")}
            fill="none"
            stroke={currentColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}

      {isDrawing && currentTool === "rectangle" && drawingStart && currentDrawingPosition && (
        <div
          className="absolute border-2 pointer-events-none z-50"
          style={{
            left: `${Math.min(drawingStart.x, currentDrawingPosition.x)}%`,
            top: `${Math.min(drawingStart.y, currentDrawingPosition.y)}%`,
            width: `${Math.abs(drawingStart.x - currentDrawingPosition.x)}%`,
            height: `${Math.abs(drawingStart.y - currentDrawingPosition.y)}%`,
            borderColor: currentColor,
          }}
        />
      )}

      {annotations.map((annotation) => (
        <div
          key={annotation.id}
          className="absolute z-30 cursor-pointer animate-in zoom-in-90 fade-in duration-200"
          style={
            annotation.type === "point"
              ? { left: `${annotation.coordinates.x}%`, top: `${annotation.coordinates.y}%`, transform: "translate(-50%, -50%)" }
              : annotation.type === "rectangle"
                ? {
                  left: `${annotation.coordinates.x}%`,
                  top: `${annotation.coordinates.y}%`,
                  width: `${annotation.coordinates.width}%`,
                  height: `${annotation.coordinates.height}%`,
                }
                : {}
          }
          onClick={(e) => {
            e.stopPropagation();
            setSelectedAnnotationId(annotation.id);
          }}
        >
          {annotation.type === "point" && (
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
              style={{ backgroundColor: annotation.color }}
            />
          )}

          {annotation.type === "rectangle" && (
            <div
              className="absolute inset-0 border-2 border-white shadow-lg"
              style={{ borderColor: annotation.color, borderWidth: annotation.stroke_width }}
            />
          )}

          {annotation.type === "freehand" && annotation.coordinates.points && (
            <svg className="absolute inset-0 overflow-visible">
              <polyline
                points={annotation.coordinates.points.map((p) => `${p.x}% ${p.y}%`).join(" ")}
                fill="none"
                stroke={annotation.color}
                strokeWidth={annotation.stroke_width}
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="drop-shadow(0 1px 2px rgba(0,0,0,0.3))"
              />
            </svg>
          )}

          {(annotation.comments?.length || 0) > 0 && (
            <div
              className="absolute flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold text-white bg-[var(--onyx)] shadow-md"
              style={
                annotation.type === "point"
                  ? { transform: "translate(4px, -4px)" }
                  : { top: "-10px", left: "-10px" }
              }
            >
              {annotation.comments?.length}
            </div>
          )}

          {annotation.resolved && (
            <div className="absolute -top-1 -right-1 bg-[var(--signal-lime)] rounded-full p-0.5">
              <CheckCircle2 className="w-3 h-3 text-[var(--onyx)]" />
            </div>
          )}
        </div>
      ))}

      {selectedAnnotation && (
        <div
          className="absolute z-50"
          style={
            selectedAnnotation.type === "point"
              ? { left: `${selectedAnnotation.coordinates.x}%`, top: `${selectedAnnotation.coordinates.y}%`, transform: "translate(20px, -50%)" }
              : { left: `${selectedAnnotation.coordinates.x}%`, top: `${selectedAnnotation.coordinates.y}%`, transform: "translate(10px, -10px)" }
          }
        >
          <CommentThread
            annotation={selectedAnnotation}
            onClose={() => setSelectedAnnotationId(null)}
          />
        </div>
      )}

      {showToolbar && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <Card className="flex items-center gap-2 px-4 py-2">
            <Button
              variant={currentTool === "point" ? "default" : "ghost"}
              size="icon"
              onClick={() => setCurrentTool("point")}
              className="h-9 w-9"
            >
              <MousePointer className="w-4 h-4" />
            </Button>

            <Button
              variant={currentTool === "rectangle" ? "default" : "ghost"}
              size="icon"
              onClick={() => setCurrentTool("rectangle")}
              className="h-9 w-9"
            >
              <Square className="w-4 h-4" />
            </Button>

            <Button
              variant={currentTool === "freehand" ? "default" : "ghost"}
              size="icon"
              onClick={() => setCurrentTool("freehand")}
              className="h-9 w-9"
            >
              <Pencil className="w-4 h-4" />
            </Button>

            <div className="w-px h-6 bg-[var(--border)] mx-1" />

            <div className="flex items-center gap-1">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setCurrentColor(color)}
                  className={cn(
                    "w-6 h-6 rounded-full border-2 transition-all",
                    currentColor === color ? "border-white scale-110" : "border-transparent"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <div className="w-px h-6 bg-[var(--border)] mx-1" />

            <Button
              variant={isAnnotating ? "default" : "ghost"}
              size="icon"
              onClick={() => setIsAnnotating(!isAnnotating)}
              className="h-9 w-9"
            >
              <MessageSquare className="w-4 h-4" />
            </Button>

            <Button variant="ghost" size="icon" onClick={handleExport} className="h-9 w-9">
              <Download className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      )}

      {selectedAnnotation && (
        <div className="absolute top-4 right-4 z-50 animate-in fade-in duration-200">
          <Card className="flex items-center gap-2 px-3 py-2">
            <span className="text-sm font-medium">
              {selectedAnnotation.comments?.length || 0} comments
            </span>

            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => handleToggleResolve(selectedAnnotation)}
              className={cn(
                "h-7 w-7",
                selectedAnnotation.resolved
                  ? "text-[var(--signal-lime)]"
                  : "text-[var(--spectral-muted)] hover:text-[var(--signal-lime)]"
              )}
            >
              <CheckCircle2 className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => handleDeleteAnnotation(selectedAnnotation.id)}
              className="h-7 w-7 text-[var(--spectral-muted)] hover:text-[var(--siren-red)]"
            >
              <Trash2 className="w-4 h-4" />
            </Button>

            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => setSelectedAnnotationId(null)}
              className="h-7 w-7 text-[var(--spectral-muted)] hover:text-[var(--spectral-white)]"
            >
              <X className="w-4 h-4" />
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
