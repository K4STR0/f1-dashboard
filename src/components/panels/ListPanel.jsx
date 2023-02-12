
// Panel component for one or more list tiles
export const ListPanel = ({ children }) => {
  const cols = children.length
  return (
    <div className={`grid grid-cols-1 xl:grid-cols-${cols} gap-2`}>
      {children}
    </div>
  )
}
