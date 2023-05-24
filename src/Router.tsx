/* eslint-disable @typescript-eslint/no-explicit-any */
import { match } from 'path-to-regexp'
import { Children, useEffect, useState } from 'react'
import { EVENTS } from './utils/consts'
import { LazyRouteElement, Parameters, RouteElement, TRoute } from './utils/types'
import { getCurrentPath } from './utils/navigation'

export function Router ({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>
}: {
  children?: (LazyRouteElement | RouteElement)[] | (LazyRouteElement | RouteElement),
  routes?: TRoute[],
  defaultComponent?: ({ routeParams }: { routeParams?: Parameters }) => LazyRouteElement | RouteElement
}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  const routesFromChildren = children && Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'
    return isRoute ? props : null
  }).filter(Boolean)

  const routesToUse = routes.concat(routesFromChildren ?? [])

  let routeParams: Parameters = {}
  const Component = routesToUse.find(({ path }) => {
    if (path === currentPath) return true
    const matcherUrl = match<Parameters>(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false
    routeParams = matched.params
    return true
  })?.component ?? DefaultComponent

  return <Component routeParams={routeParams} />
}
