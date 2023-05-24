import { AnchorHTMLAttributes, HTMLAttributeAnchorTarget } from 'react'
import { navigate } from './utils/navigation'

export function Link ({ target, to, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & {
  target?: HTMLAttributeAnchorTarget,
  to?: string
}) {
  const handleClick = (event: React.MouseEvent) => {
    const isMainEvent = event.button === 0 // primaryClick
    const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey // modified
    const isManageableEvent = target === undefined || target === '_self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to)
    }
  }

  return (
    <a onClick={handleClick} href={to} target={target} {...props} />
  )
}
