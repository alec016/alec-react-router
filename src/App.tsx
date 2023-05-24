import { Suspense, lazy } from 'react'
import { Link } from './Link'
import { Route } from './Route'
import { Router } from './Router'
import { LazyRouteElement, TRoute } from './utils/types'

const AboutPage = lazy(() => import('./pages/About')) as LazyRouteElement
const HomePage = lazy(() => import('./pages/Home')) as LazyRouteElement
const Busqueda = lazy(() => import('./pages/Busqueda')) as LazyRouteElement

const routes: TRoute[] = [
  {
    path: '/search/:query',
    component: Busqueda
  }
]

function App () {
  return (
    <main>
      <Suspense fallback={<div>loading...</div>}>
        <Router
          routes={routes}
          defaultComponent={() => (
            <>
              <div>
                <h1>404</h1>
                <img src='https://midu.dev/images/this-is-fine-404.gif' />
                <p>Algo no salio bien</p>
              </div>
              <Link to='/'>Volver a Inicio</Link>
            </>
          )}
        >
          <Route path='/' component={HomePage} />
          <Route path='/about' component={AboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
