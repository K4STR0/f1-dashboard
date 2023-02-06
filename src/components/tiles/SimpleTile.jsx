export const SimpleTile = ({ title, subtitle, content, color = '' }) => {
  return (
    <div className={`tile ${color}`}>
      <div className='text-sm font-semibold opacity-80 text-center'>{title}</div>
      <div className='text-xs opacity-80'>{subtitle}</div>
      <div className='m-3 text-sm sm:text-xl font-bold'>{content}</div>
    </div>
  )
}
