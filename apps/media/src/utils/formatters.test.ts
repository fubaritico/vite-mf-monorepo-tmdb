import { describe, expect, it } from 'vitest'

import { formatRuntime } from './formatters'

describe('formatRuntime', () => {
  it('formats zero minutes as "0h 0m"', () => {
    expect(formatRuntime(0)).toBe('0h 0m')
  })

  it('formats exactly 60 minutes as "1h 0m"', () => {
    expect(formatRuntime(60)).toBe('1h 0m')
  })

  it('formats less than 60 minutes with 0 hours (45 → "0h 45m")', () => {
    expect(formatRuntime(45)).toBe('0h 45m')
  })

  it('formats typical runtime (142 minutes → "2h 22m")', () => {
    expect(formatRuntime(142)).toBe('2h 22m')
  })

  it('formats 150 minutes as "2h 30m"', () => {
    expect(formatRuntime(150)).toBe('2h 30m')
  })

  it('formats large runtime (300 minutes → "5h 0m")', () => {
    expect(formatRuntime(300)).toBe('5h 0m')
  })
})
