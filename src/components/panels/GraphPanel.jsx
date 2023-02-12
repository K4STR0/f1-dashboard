
// Panel component for one or more graph tiles
export const GraphPanel = ({ children }) => {
  const cols = children.length
  return (
    <div className={`grid grid-cols-1 2xl:grid-cols-${cols} gap-2`}>{children}</div>
  )
}
