// Stub — supabase replaced by in-memory store + optional Neon
export const supabase = {
  auth: {
    signUp: async () => ({ data: null, error: new Error("Supabase removed — use /api/auth") }),
    signIn: async () => ({ data: null, error: new Error("Supabase removed — use NextAuth") }),
    signOut: async () => {},
    getSession: async () => ({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
  },
  from: () => ({
    select: () => ({ order: () => ({ data: [], error: null }), eq: () => ({ single: () => ({ data: null, error: null }), data: [], error: null }), data: [], error: null }),
    insert: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }), data: null, error: null }),
    update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }), data: null, error: null }) }),
    delete: () => ({ eq: () => ({ data: null, error: null }) }),
  }),
  channel: () => ({ on: () => ({ subscribe: () => {} }), unsubscribe: () => {} }),
};
