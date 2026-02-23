export { trendingHandlers } from './trendingHandlers.js'
export { popularHandlers } from './popularHandlers.js'

import { popularHandlers } from './popularHandlers.js'
import { trendingHandlers } from './trendingHandlers.js'

export const handlers = [
  trendingHandlers.trendingDay,
  trendingHandlers.trendingWeek,
  popularHandlers.popularMovies,
  popularHandlers.popularTV,
]
