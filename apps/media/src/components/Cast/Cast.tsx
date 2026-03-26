import { Container, Section } from '@vite-mf-monorepo/layouts'
import { getImageUrl } from '@vite-mf-monorepo/shared'
import { Button, Skeleton, Talent, Typography } from '@vite-mf-monorepo/ui'
import { useLocation, useParams } from 'react-router-dom'

import { useMediaCredits } from '../../hooks'
import { getMediaTypeFromPath } from '../../utils'

import type { FC } from 'react'

const Cast: FC = () => {
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
            Cast
          </Typography>
          <div className="mda:grid mda:grid-cols-2 mda:gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangle"
                width="100%"
                height="64px"
              />
            ))}
          </div>
        </Section>
      </Container>
    )
  }

  if (error || !credits?.cast?.length) {
    return null
  }

  const topCast = credits.cast.slice(0, 10)

  return (
    <Container variant="default">
      <Section maxWidth="xl" spacing="md">
        <Typography variant="h2" className="mda:mb-6">
          Cast
        </Typography>
        <div className="mda:grid mda:grid-cols-2 mda:gap-6 mda:mb-8">
          {topCast.map((actor) => (
            <Talent
              key={actor.credit_id}
              name={actor.name}
              role={actor.character}
              imageSrc={
                actor.profile_path
                  ? getImageUrl(actor.profile_path, 'w185')
                  : undefined
              }
              variant="horizontal"
              size="xl"
            />
          ))}
        </div>
        <Button
          as="link"
          to="#"
          variant="outline"
          size="sm"
          icon="Users"
          iconPosition="left"
        >
          Whole cast
        </Button>
      </Section>
    </Container>
  )
}

export default Cast
