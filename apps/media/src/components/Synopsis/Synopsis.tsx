import { Container, Section } from '@vite-mf-monorepo/layouts'
import { Skeleton, Typography } from '@vite-mf-monorepo/ui'
import { useLocation, useParams } from 'react-router-dom'

import { useMediaDetails } from '../../hooks/useMediaDetails'
import { getMediaTypeFromPath } from '../../utils'

import type { FC } from 'react'

const Synopsis: FC = () => {
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const contentId = Number(id)
  const mediaType = getMediaTypeFromPath(location.pathname)

  const { data, isLoading, error } = useMediaDetails(mediaType, contentId)

  if (isLoading) {
    return (
      <Container variant="default">
        <Section maxWidth="xl" spacing="md">
          <Typography variant="h2" className="mda:mb-6">
            Synopsis
          </Typography>
          <div className="mda:space-y-2">
            <Skeleton variant="line" width="100%" />
            <Skeleton variant="line" width="100%" />
            <Skeleton variant="line" width="80%" />
          </div>
        </Section>
      </Container>
    )
  }

  if (error) {
    return (
      <Container variant="default">
        <Section maxWidth="xl" spacing="md">
          <Typography variant="h2" className="mda:mb-6">
            Synopsis
          </Typography>
          <Typography variant="body" className="mda:text-neutral-400">
            Unable to load synopsis. Please try again later.
          </Typography>
        </Section>
      </Container>
    )
  }

  if (!data?.overview) {
    return null
  }

  return (
    <Container variant="default">
      <Section maxWidth="xl" spacing="md">
        <Typography variant="h2" className="mda:mb-6">
          Synopsis
        </Typography>
        <Typography variant="body">{data.overview}</Typography>
      </Section>
    </Container>
  )
}

export default Synopsis
