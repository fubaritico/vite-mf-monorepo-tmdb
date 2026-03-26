import { Container, Section } from '@vite-mf-monorepo/layouts'
import { Skeleton, TrailerCard, Typography } from '@vite-mf-monorepo/ui'
import { useParams } from 'react-router-dom'

import { useMovieVideos } from '../../hooks/useMovieVideos'

import type { FC } from 'react'

const TrailersSection: FC = () => {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useMovieVideos(Number(id))

  if (isLoading) {
    return (
      <Section>
        <Typography variant="h2" className="mda:mb-6">
          Trailers & Clips
        </Typography>
        <div className="mda:grid mda:gap-4 mda:grid-cols-1 mda:md:grid-cols-2 mda:lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangle"
              width="100%"
              aspectRatio="16 / 9"
            />
          ))}
        </div>
      </Section>
    )
  }

  if (error || !data?.results || data.results.length === 0) {
    return null
  }

  return (
    <Container variant="default">
      <Section maxWidth="xl" spacing="md">
        <Typography variant="h2" className="mda:mb-6">
          Trailers & Clips
        </Typography>
        <div className="mda:grid mda:gap-4 mda:grid-cols-1 mda:md:grid-cols-2 mda:lg:grid-cols-3">
          {data.results.map((video) => (
            <TrailerCard
              key={video.id}
              videoKey={video.key ?? ''}
              title={video.name ?? 'Untitled'}
              type={video.type}
            />
          ))}
        </div>
      </Section>
    </Container>
  )
}

export default TrailersSection
