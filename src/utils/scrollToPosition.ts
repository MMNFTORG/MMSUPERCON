export const scrollToPosition = (
  { x, y }: Record<string, number>,
  container: Element | Window = window,
): void =>
  container.scrollTo({
    top: y,
    left: x,
    behavior: 'smooth',
  })
