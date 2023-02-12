
/**
 * Tile component wich shows a list of elements:
 * @property {String} title: Name of the list
 * @property {String} subtitle: Extra info about the list
 * @property {List} labels: Name of the columns
 * @property {Object} content: Data of the columns
 * @property {function} onClick: Function to be executed when list is clicked
 * @property {bool} rank: If setted to true the 3 first items of the list
 * will be colorized with "gold", "silver" and "bronze"
 **/

export const ListTile = ({
  title,
  subtitle,
  labels,
  content,
  onClick,
  rank = false
}) => {
  return (
    <div className='tile' onClick={onClick}>
      <div className='text-sm font-semibold'>{title}</div>
      <div className='text-xs'>{subtitle}</div>

      <div className='m-3 w-9/12'>
        {/* Labels */}
        <div
          className={`grid grid-cols-${labels.length} text-xs md:text-base my-2 text-center opacity-80`}
        >
          {labels.map((item, i) => (
            <div key={i} className={i === 0 ? 'text-left' : 'text-center'}>
              {item}
            </div>
          ))}
        </div>

        {/* Content */}
        {content.map((item, x) => (
          <div
            key={x}
            className={
              `grid grid-cols-${labels.length} text-xs md:text-base p-1 rounded mb-1 ` +
              (rank & (x === 0) ? 'gold ' : '') +
              (rank & (x === 1) ? 'silver ' : '') +
              (rank & (x === 2) ? 'bronze ' : '')
            }
          >
            {item.map((value, i) => (
              <div key={i} className={i === 0 ? 'text-left' : 'text-center'}>
                {value}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
