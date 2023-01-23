export const ListTile = ({ title, subtitle, labels, content }) => {
  return (
    <div className="tile">
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs">{subtitle}</div>

      <div className={`m-3 w-9/12`}>
        {/* Labels */}
        <div
          className={`grid grid-cols-${labels.length} font-bold text-xs md:text-base my-2 text-center`}
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
            className={`grid grid-cols-${labels.length} text-xs md:text-base`}
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
