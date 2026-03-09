import {
  mockMovieDetails,
  mockTVSeriesDetails,
} from '@vite-mf-monorepo/shared/mocks'
import { describe, expect, it } from 'vitest'

import { isMovie } from './typeGuards'

import type { TvSeriesDetailsResponse } from '@vite-mf-monorepo/tmdb-client'

describe('isMovie', () => {
  it('returns true for a MovieDetailsResponse (has "title" field)', () => {
    expect(isMovie(mockMovieDetails)).toBe(true)
  })

  it('returns false for a TvSeriesDetailsResponse (has "name" field, not "title")', () => {
    expect(isMovie(mockTVSeriesDetails)).toBe(false)
  })

  it('narrows type correctly for a movie — title is accessible', () => {
    const media = mockMovieDetails

    if (isMovie(media)) {
      expect(media.title).toBe('The Shawshank Redemption')
    } else {
      throw new Error('Expected isMovie to return true')
    }
  })

  it('narrows type correctly for a TV series — name is accessible in else branch', () => {
    const media = mockTVSeriesDetails

    if (isMovie(media)) {
      throw new Error('Expected isMovie to return false')
    } else {
      expect((media as TvSeriesDetailsResponse).name).toBe('Law & Order')
    }
  })

  it('returns true for a minimal object that only has the "title" discriminant field', () => {
    const minimalMovie = { title: 'Minimal Movie' }

    expect(isMovie(minimalMovie as typeof mockMovieDetails)).toBe(true)
  })

  it('returns false for a minimal object that only has the "name" discriminant field', () => {
    const minimalTv = { name: 'Minimal TV Show' }

    expect(isMovie(minimalTv as typeof mockTVSeriesDetails)).toBe(false)
  })
})
