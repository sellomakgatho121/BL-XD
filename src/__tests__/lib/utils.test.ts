import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('cn utility', () => {
  it('merges class names correctly', () => {
    const result = cn('bg-red-500', 'text-white');
    expect(result).toContain('bg-red-500');
    expect(result).toContain('text-white');
  });

  it('handles conditional classes', () => {
    const isActive = true;
    const result = cn('base-class', isActive && 'active-class');
    expect(result).toContain('active-class');
  });

  it('handles falsy values', () => {
    const result = cn('base', false, null, undefined, 'end');
    expect(result).toContain('base');
    expect(result).toContain('end');
  });

  it('deduplicates conflicting tailwind classes', () => {
    const result = cn('bg-red-500', 'bg-blue-500');
    expect(result).toContain('bg-blue-500');
    expect(result).not.toContain('bg-red-500');
  });
});
