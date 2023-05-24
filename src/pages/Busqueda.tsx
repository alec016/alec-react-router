import { Link } from '../Link'
import { Parameters } from '../utils/types'

export default function Busqueda ({ routeParams }: { routeParams: Parameters }) {
  return (
    <>
      <h1>Buscador</h1>
      <p>
        {JSON.stringify(routeParams)}
      </p>
      <Link to='/'>Ir a Inicio</Link>
    </>
  )
}
