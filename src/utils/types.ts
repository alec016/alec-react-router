import { LazyExoticComponent } from 'react'

export type Parameters = { [param: string]: string }

export type RouteElement = JSX.Element & { routeParams?: Parameters }

export type LazyRouteElement = LazyExoticComponent<() => JSX.Element> & RouteElement

export type TRoute = { path: string, component: LazyRouteElement | (({ routeParams }: { routeParams?: Parameters }) => RouteElement) }
