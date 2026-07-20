// Annotation system stubs — supabase removed
export async function createAnnotation() { return { id: "stub", created_at: new Date().toISOString() }; }
export async function getAnnotations() { return []; }
export async function deleteAnnotation() { return true; }
export async function subscribeToAnnotations() { return () => {}; }
export async function createRealtimePresence() { return () => {}; }
export async function trackCursors() { return () => {}; }
