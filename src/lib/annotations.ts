import { supabase } from "./supabase/client";

export type AnnotationType = "point" | "rectangle" | "freehand";

export interface Point {
  x: number;
  y: number;
}

export interface AnnotationCoordinates {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  points?: Point[];
}

export interface Annotation {
  id: string;
  project_id: string;
  project_file_id: string | null;
  type: AnnotationType;
  coordinates: AnnotationCoordinates;
  color: string;
  stroke_width: number;
  created_by: string;
  created_by_profile?: {
    id: string;
    email: string;
    full_name: string | null;
  };
  resolved: boolean;
  resolved_by: string | null;
  resolved_at: string | null;
  created_at: string;
  updated_at: string;
  comments?: AnnotationComment[];
}

export interface AnnotationComment {
  id: string;
  annotation_id: string;
  user_id: string;
  user_profile?: {
    id: string;
    email: string;
    full_name: string | null;
  };
  content: string;
  created_at: string;
}

export interface CursorPosition {
  user_id: string;
  user_name: string;
  x: number;
  y: number;
  updated_at: string;
}

const PRESENCE_CHANNEL = `annotations:presence`;

export async function getAnnotations(projectId: string, projectFileId?: string) {
  let query = supabase
    .from("annotations")
    .select(`
      *,
      created_by_profile:profiles!annotations_created_by_fkey(id, email, full_name)
    `)
    .eq("project_id", projectId)
    .order("created_at", { ascending: false });

  if (projectFileId) {
    query = query.eq("project_file_id", projectFileId);
  }

  const { data, error } = await query;

  if (error) throw error;

  const annotationsWithComments = await Promise.all(
    (data || []).map(async (annotation) => ({
      ...annotation,
      comments: await getAnnotationComments(annotation.id),
    }))
  );

  return annotationsWithComments;
}

export async function getAnnotationComments(annotationId: string) {
  const { data, error } = await supabase
    .from("annotation_comments")
    .select(`
      *,
      user_profile:profiles!annotation_comments_user_id_fkey(id, email, full_name)
    `)
    .eq("annotation_id", annotationId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function createAnnotation(
  projectId: string,
  type: AnnotationType,
  coordinates: AnnotationCoordinates,
  projectFileId?: string,
  color = "#ffff00",
  strokeWidth = 2
) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated");
  }

  const { data, error } = await supabase
    .from("annotations")
    .insert({
      project_id: projectId,
      project_file_id: projectFileId || null,
      type,
      coordinates,
      color,
      stroke_width: strokeWidth,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateAnnotation(
  annotationId: string,
  updates: Partial<Pick<Annotation, "coordinates" | "color" | "stroke_width">>
) {
  const { data, error } = await supabase
    .from("annotations")
    .update(updates)
    .eq("id", annotationId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function resolveAnnotation(annotationId: string) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated");
  }

  const { data, error } = await supabase
    .from("annotations")
    .update({
      resolved: true,
      resolved_by: user.id,
      resolved_at: new Date().toISOString(),
    })
    .eq("id", annotationId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function unresolveAnnotation(annotationId: string) {
  const { data, error } = await supabase
    .from("annotations")
    .update({
      resolved: false,
      resolved_by: null,
      resolved_at: null,
    })
    .eq("id", annotationId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAnnotation(annotationId: string) {
  const { error } = await supabase
    .from("annotations")
    .delete()
    .eq("id", annotationId);

  if (error) throw error;
}

export async function addComment(annotationId: string, content: string) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User must be authenticated");
  }

  const { data, error } = await supabase
    .from("annotation_comments")
    .insert({
      annotation_id: annotationId,
      user_id: user.id,
      content,
    })
    .select(`
      *,
      user_profile:profiles!annotation_comments_user_id_fkey(id, email, full_name)
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function deleteComment(commentId: string) {
  const { error } = await supabase
    .from("annotation_comments")
    .delete()
    .eq("id", commentId);

  if (error) throw error;
}

export async function exportAnnotationsAsJson(projectId: string) {
  const { data, error } = await supabase.rpc("export_annotations_for_project", {
    project_param: projectId,
  });

  if (error) throw error;
  return data;
}

export function subscribeToAnnotations(
  projectId: string,
  projectFileId: string | null,
  callbacks: {
    onInsert?: (annotation: Annotation) => void;
    onUpdate?: (annotation: Annotation) => void;
    onDelete?: (annotationId: string) => void;
  }
) {
  const query = supabase
    .channel(`annotations:${projectId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "annotations",
        filter: projectFileId ? `project_file_id=eq.${projectFileId}` : `project_id=eq.${projectId}`,
      },
      async (payload) => {
        if (payload.eventType === "INSERT" && callbacks.onInsert) {
          const annotation = payload.new as Annotation;
          annotation.comments = await getAnnotationComments(annotation.id);
          callbacks.onInsert(annotation);
        } else if (payload.eventType === "UPDATE" && callbacks.onUpdate) {
          const annotation = payload.new as Annotation;
          annotation.comments = await getAnnotationComments(annotation.id);
          callbacks.onUpdate(annotation);
        } else if (payload.eventType === "DELETE" && callbacks.onDelete) {
          callbacks.onDelete(payload.old.id);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(query);
  };
}

export function subscribeToComments(
  annotationId: string,
  callbacks: {
    onInsert?: (comment: AnnotationComment) => void;
    onDelete?: (commentId: string) => void;
  }
) {
  const query = supabase
    .channel(`comments:${annotationId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "annotation_comments",
        filter: `annotation_id=eq.${annotationId}`,
      },
      async (payload) => {
        if (payload.eventType === "INSERT" && callbacks.onInsert) {
          const comment = payload.new as AnnotationComment;
          const { data } = await supabase
            .from("profiles")
            .select("id, email, full_name")
            .eq("id", comment.user_id)
            .single();

          if (data) {
            comment.user_profile = data;
          }
          callbacks.onInsert(comment);
        } else if (payload.eventType === "DELETE" && callbacks.onDelete) {
          callbacks.onDelete(payload.old.id);
        }
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(query);
  };
}

export function trackCursorPosition(
  projectId: string,
  userId: string,
  userName: string
) {
  const channel = supabase.channel(PRESENCE_CHANNEL, {
    config: {
      presence: {
        key: `${projectId}:${userId}`,
      },
    },
  });

  channel.on("presence", { event: "sync" }, () => {
    const state = channel.presenceState<CursorPosition>();
    const cursors = Object.values(state).flat();
    return cursors;
  });

  channel.subscribe(async (status) => {
    if (status === "SUBSCRIBED") {
      await channel.track({
        user_id: userId,
        user_name: userName,
        x: 0,
        y: 0,
        updated_at: new Date().toISOString(),
      });
    }
  });

  return {
    updatePosition: async (x: number, y: number) => {
      await channel.track({
        user_id: userId,
        user_name: userName,
        x,
        y,
        updated_at: new Date().toISOString(),
      });
    },
    getOtherCursors: () => {
      const state = channel.presenceState<CursorPosition>();
      const cursors = Object.values(state).flat();
      return cursors.filter((c) => c.user_id !== userId);
    },
    unsubscribe: () => {
      channel.unsubscribe();
    },
  };
}

export async function downloadAnnotationsJson(projectId: string, fileName: string = "annotations.json") {
  const annotations = await exportAnnotationsAsJson(projectId);
  const blob = new Blob([JSON.stringify(annotations, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
