import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn utility', () => {
  it('merges class names', () => {
    const result = cn('px-4 py-2', 'bg-red-500')
    expect(result).toBe('px-4 py-2 bg-red-500')
  })

  it('handles conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toContain('base-class')
    expect(result).toContain('active-class')
  })

  it('handles falsey values', () => {
    const result = cn('base', false && 'false-class', null, undefined, '')
    expect(result).toContain('base')
  })

  it('merges tailwind classes with tailwind-merge', () => {
    const result = cn('px-4 px-2', 'bg-red-500 bg-blue-500')
    expect(result).toBe('px-2 bg-blue-500')
  })
})
