import { Container, Section } from '@vite-mf-monorepo/layouts'
import { Typography } from '@vite-mf-monorepo/ui'
import { useLocation, useParams } from 'react-router-dom'

import { getMediaTypeFromPath } from '../../utils'

import RecommendedMoviesCarousel from './RecommendedMoviesCarousel'
import RecommendedTVCarousel from './RecommendedTVCarousel'

import type { FC } from 'react'

type MediaType = 'movie' | 'tv'

const RecommendedSection: FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()

  const mediaType = getMediaTypeFromPath(location.pathname) as MediaType

  return (
    <Container variant="default">
      <Section maxWidth="xl" spacing="md">
        <Typography variant="h2">Recommended for you</Typography>

        {mediaType === 'movie' ? (
          <RecommendedMoviesCarousel id={Number(id)} />
        ) : (
          <RecommendedTVCarousel id={Number(id)} />
        )}
      </Section>
    </Container>
  )
}

export default RecommendedSection
