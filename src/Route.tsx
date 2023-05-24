import { LazyRouteElement, RouteElement, TRoute } from './utils/types'

export function Route ({ path, component }: TRoute): LazyRouteElement | RouteElement | null {
  const routeParams = { path, component }
  routeParams.path = path
  return null
}
