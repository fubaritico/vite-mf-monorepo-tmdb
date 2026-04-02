import { Container, Section } from '@vite-mf-monorepo/layouts'
import { Typography } from '@vite-mf-monorepo/ui'
import { useLocation, useParams } from 'react-router-dom'

import { getMediaTypeFromPath } from '../../utils'

import SimilarMoviesCarousel from './SimilarMoviesCarousel'
import SimilarTVCarousel from './SimilarTVCarousel'

import type { FC } from 'react'

type MediaType = 'movie' | 'tv'

const SimilarSection: FC = () => {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()

  const mediaType = getMediaTypeFromPath(location.pathname) as MediaType

  return (
    <Container variant="default">
      <Section maxWidth="xl" spacing="md">
        <Typography variant="h2">You may also like</Typography>

        {mediaType === 'movie' ? (
          <SimilarMoviesCarousel id={Number(id)} />
        ) : (
          <SimilarTVCarousel id={Number(id)} />
        )}
      </Section>
    </Container>
  )
}

export default SimilarSection
