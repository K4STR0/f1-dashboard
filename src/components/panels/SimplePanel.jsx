
// Panel component for one or more simple tiles
export const SimplePanel = ({ children }) => {
  const cols = children.length
  return (
    <div className={`grid grid-cols-2 xl:grid-cols-${cols} gap-2 `}>{children}</div>
  )
}
