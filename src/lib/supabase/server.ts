// Stub — supabase removed
export async function createClient() {
  return {
    from: () => ({
      select: () => ({ order: () => ({ data: [], error: null }), eq: () => ({ data: [], error: null }), data: [], error: null }),
      insert: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }), data: null, error: null }),
      update: () => ({ eq: () => ({ select: () => ({ single: () => ({ data: null, error: null }) }) }) }),
      delete: () => ({ eq: () => ({ data: null, error: null }) }),
    }),
  };
}
