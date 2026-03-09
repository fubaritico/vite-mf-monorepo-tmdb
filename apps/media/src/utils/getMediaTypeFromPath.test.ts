import { describe, expect, it } from 'vitest'

import { getMediaTypeFromPath } from './getMediaTypeFromPath'

describe('getMediaTypeFromPath', () => {
  it('returns "movie" for "/movie/278"', () => {
    expect(getMediaTypeFromPath('/movie/278')).toBe('movie')
  })

  it('returns "tv" for "/tv/94722"', () => {
    expect(getMediaTypeFromPath('/tv/94722')).toBe('tv')
  })

  it('returns "tv" when both segments present (tv takes priority)', () => {
    expect(getMediaTypeFromPath('/tv/94722/movie/278')).toBe('tv')
  })

  it('returns "movie" for nested path "/movie/278/photos/0"', () => {
    expect(getMediaTypeFromPath('/movie/278/photos/0')).toBe('movie')
  })

  it('throws for unknown path "/unknown/278"', () => {
    expect(() => getMediaTypeFromPath('/unknown/278')).toThrow(
      "Invalid media type in pathname: \"/unknown/278\". Expected 'movie' or 'tv' segment."
    )
  })

  it('throws for empty pathname "/"', () => {
    expect(() => getMediaTypeFromPath('/')).toThrow(
      "Invalid media type in pathname: \"/\". Expected 'movie' or 'tv' segment."
    )
  })

  it('throws for empty string pathname ""', () => {
    expect(() => getMediaTypeFromPath('')).toThrow(
      "Invalid media type in pathname: \"\". Expected 'movie' or 'tv' segment."
    )
  })

  it('handles trailing slashes correctly ("/movie/278/")', () => {
    expect(getMediaTypeFromPath('/movie/278/')).toBe('movie')
  })
})
