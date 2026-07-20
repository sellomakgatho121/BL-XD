// Notification stubs — supabase removed
export async function getNotifications() { return []; }
export async function markNotificationRead() { return true; }
export async function markAllRead() { return true; }
export async function subscribeToNotifications() { return () => {}; }
export async function createNotification() { return { id: "stub" }; }
export function useNotifications() {
  return { notifications: [], unreadCount: 0, loading: false, error: null };
}
