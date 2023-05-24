import { fireEvent, waitFor } from '@testing-library/dom'
import { cleanup, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { Link } from './Link'
import { Route } from './Route'
import { Router } from './Router'
import { EVENTS } from './utils/consts'
import { getCurrentPath } from './utils/navigation'

vi.mock('./utils/navigation', () => ({
  getCurrentPath: vi.fn(),
  navigate: (href?: string | URL) => {
    window.history.pushState({}, '', href)
    const navigationEvent = new Event(EVENTS.PUSHSTATE)
    window.dispatchEvent(navigationEvent)
  }
}))

describe('Router', () => {
  beforeEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  it('should work', () => {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy()
  })

  it('should render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
    expect(screen.getByText('404')).toBeTruthy()
  })

  it('should render the component of the first route that matches', () => {
    getCurrentPath.mockReturnValue('/about')

    const routes = [
      {
        path: '/',
        component: () => <h1>Home</h1>
      },
      {
        path: '/about',
        component: () => <h1>About</h1>
      }
    ]

    render(<Router routes={routes} />)
    expect(screen.getByText('About')).toBeTruthy()
  })

  it('should navigate using links', async () => {
    getCurrentPath.mockReturnValueOnce('/')

    render(
      <Router>
        <Route
          path='/'
          component={() => (
            <>
              <h1>Home</h1>
              <Link to='/about'>Go to About</Link>
            </>
          )}
        />
        <Route path='/about' component={() => <h1>about</h1>} />
      </Router>
    )
    const button = screen.getByText(/Go to About/)

    fireEvent.click(button)

    await waitFor(() => {
      const aboutTitle = screen.findByText('About')
      console.log(screen.debug())
      expect(aboutTitle).toBeTruthy()
    })
  })
})
