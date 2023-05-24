declare module 'alec-react-router' {
  import type { AnchorHTMLAttributes, HTMLAttributeAnchorTarget, LazyExoticComponent } from 'react'

  type Parameters = { [param: string]: string }

  interface RouteElement extends JSX.Element {
    routeParams?: Parameters
  }

  type LazyRouteElement = RouteElement & LazyExoticComponent<() => RouteElement>

  type TRoute = { path: string, component: LazyRouteElement | (({ routeParams }: { routeParams?: Parameters }) => RouteElement) }

  function Link ({ target, to, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    target?: HTMLAttributeAnchorTarget,
    to?: string
  }): JSX.Element

  function Route ({ path, component }: TRoute): LazyRouteElement | RouteElement | null

  function Router ({
    children,
    routes = [],
    defaultComponent: DefaultComponent
  }: {
    children?: (LazyRouteElement | RouteElement)[] | (LazyRouteElement | RouteElement),
    routes?: TRoute[],
    defaultComponent?: ({ routeParams }: { routeParams?: Parameters }) => LazyRouteElement | RouteElement
  }): JSX.Element
}
