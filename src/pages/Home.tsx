import { FormEvent, useRef } from 'react'
import { Link } from '../Link'
import { navigate } from '../utils/navigation'

export default function HomePage () {
  const searchRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = searchRef.current?.value.trim() === '' || searchRef.current?.value === undefined ? 'defaultValue' : searchRef.current?.value
    console.log({ value })
    navigate(`/search/${value}`)
  }

  return (
    <>
      <h1>Home</h1>
      <p>Esta es una pagina de ejemplo para crear un React Router desde cero</p>
      <Link to='/about'>Ir a Sobre Nosotros</Link>
      <form onSubmit={handleSubmit}>
        <input type='search' placeholder='search' ref={searchRef} />
        <button type='submit'>Buscar</button>
      </form>
    </>
  )
}
