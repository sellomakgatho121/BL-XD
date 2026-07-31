import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryStore, seedAdmin, store } from "@/lib/db/store";

describe("InMemoryStore", () => {
  let store: InMemoryStore;

  beforeEach(() => {
    store = new InMemoryStore();
  });

  it("generates unique IDs", () => {
    const a = store.generateId();
    const b = store.generateId();
    expect(a).not.toBe(b);
  });

  it("generates sequential invoice numbers", () => {
    const year = new Date().getFullYear();
    const a = store.generateInvoiceNumber();
    const b = store.generateInvoiceNumber();
    expect(a).toMatch(new RegExp(`^INV-${year}-\\d{4}$`));
    expect(b).toMatch(new RegExp(`^INV-${year}-\\d{4}$`));
  });

  it("stores and retrieves profiles", () => {
    const profile = {
      id: store.generateId(),
      email: "test@example.com",
      fullName: "Test User",
      role: "client" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.profiles.set(profile.id, profile);
    expect(store.profiles.get(profile.id)).toEqual(profile);
  });

  it("stores and retrieves projects", () => {
    const project = {
      id: store.generateId(),
      clientId: "client-1",
      name: "Test Project",
      tier: "spark" as const,
      status: "planning" as const,
      progress: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.projects.set(project.id, project);
    expect(store.projects.get(project.id)).toEqual(project);
  });

  it("stores and retrieves contact submissions", () => {
    const contact = {
      id: store.generateId(),
      name: "John",
      email: "john@test.com",
      message: "Hello",
      status: "new" as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    store.contacts.set(contact.id, contact);
    expect(store.contacts.get(contact.id)).toEqual(contact);
  });
});

describe("seedAdmin", () => {
  it("creates a superadmin profile", () => {
    const admin = seedAdmin();
    expect(admin.email).toBe("sellomakgatho121@gmail.com");
    expect(admin.role).toBe("superadmin");
    expect(admin.fullName).toBe("Sello Makgatho");
  });

  it("returns existing admin on second call", () => {
    const first = seedAdmin();
    const second = seedAdmin();
    expect(first).toBe(second);
  });

  it("seeds blog posts", () => {
    const blogPosts = Array.from(store.blogPosts.values());
    expect(blogPosts.length).toBeGreaterThanOrEqual(3);
    expect(blogPosts.map((p) => p.status)).not.toContain("draft");
  });
});
