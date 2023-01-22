export const SimpleTile = ({ title, subtitle, content }) => {
  return (
    <div className="tile">
      <div className="text-sm font-semibold ">{title}</div>
      <div className="text-xs">{subtitle}</div>
      <div className="m-3 text-xl font-bold">{content}</div>
    </div>
  )
}
