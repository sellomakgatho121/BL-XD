# Extractable Components (for Superdesign DraftComponents)

These are high-leverage components to extract so Superdesign can reuse them across multiple page drafts.

## AdminLayout
- **Source**: `src/app/(admin)/layout.tsx`
- **Category**: layout
- **Description**: Admin shell with sidebar + header + content area.
- **Extractable props**: none (children slot only)
- **Hardcoded**: sidebar item labels/hrefs, icons, layout spacing, colors.

## PortalLayout
- **Source**: `src/app/(portal)/layout.tsx`
- **Category**: layout
- **Description**: Client portal shell with sidebar + header + content area.
- **Extractable props**: none (children slot only)
- **Hardcoded**: sidebar items, branding, notification indicator styles.

## Navigation
- **Source**: `src/components/marketing/navigation.tsx`
- **Category**: layout
- **Description**: Marketing top navigation + mobile menu.
- **Extractable props**: `transparent` (boolean, default: false)
- **Hardcoded**: nav link labels, service tiers, logo mark, spacing.

## Footer
- **Source**: `src/components/marketing/footer.tsx`
- **Category**: layout
- **Description**: Marketing footer with link columns + newsletter form.
- **Extractable props**: none
- **Hardcoded**: link structure, icon set, copy, spacing.

