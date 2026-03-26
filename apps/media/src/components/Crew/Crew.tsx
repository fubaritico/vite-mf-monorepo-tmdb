import { Container, Section } from '@vite-mf-monorepo/layouts'
import { getImageUrl } from '@vite-mf-monorepo/shared'
import { Skeleton, Talent, Typography } from '@vite-mf-monorepo/ui'
import { useLocation, useParams } from 'react-router-dom'

import { useMediaCredits } from '../../hooks'
import { getMediaTypeFromPath } from '../../utils'

import type { FC } from 'react'

const Crew: FC = () => {
  const location = useLocation()
  const { id } = useParams<{ id: string }>()
  const contentId = Number(id)
  const mediaType = getMediaTypeFromPath(location.pathname)

  const {
    data: credits,
    isLoading,
    error,
  } = useMediaCredits(mediaType, contentId)

  if (isLoading) {
    return (
      <Container variant="default">
        <Section maxWidth="xl" spacing="md">
          <Typography variant="h2" className="mda:mb-6">
            Crew
          </Typography>
          <div className="mda:flex mda:gap-6">
            <Skeleton variant="circle" width="80px" height="80px" />
            <Skeleton variant="circle" width="80px" height="80px" />
            <Skeleton variant="circle" width="80px" height="80px" />
          </div>
        </Section>
      </Container>
    )
  }

  if (error || !credits?.crew) {
    return (
      <Container variant="default">
        <Section maxWidth="xl" spacing="md">
          <Typography variant="h2" className="mda:mb-6">
            Crew
          </Typography>
          <Typography variant="body" className="mda:text-muted-foreground">
            Unable to load crew information.
          </Typography>
        </Section>
      </Container>
    )
  }

  const director = credits.crew.find((c) => c.job === 'Director')
  const writers = credits.crew
    .filter((c) => c.department === 'Writing')
    .slice(0, 2)

  if (!director && writers.length === 0) {
    return null
  }

  return (
    <Container variant="default">
      <Section maxWidth="xl" spacing="md">
        <Typography variant="h2" className="mda:mb-6">
          Crew
        </Typography>
        <div className="mda:flex mda:flex-row mda:flex-wrap mda:gap-6 mda:justify-start">
          {director && (
            <Talent
              name={director.name}
              role="Director"
              imageSrc={
                director.profile_path
                  ? getImageUrl(director.profile_path, 'w185')
                  : undefined
              }
              variant="vertical"
              size="3xl"
            />
          )}
          {writers.map((writer) => (
            <Talent
              key={writer.id}
              name={writer.name}
              role={writer.job}
              imageSrc={
                writer.profile_path
                  ? getImageUrl(writer.profile_path, 'w185')
                  : undefined
              }
              variant="vertical"
              size="3xl"
            />
          ))}
        </div>
      </Section>
    </Container>
  )
}

export default Crew
