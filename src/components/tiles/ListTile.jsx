export const ListTile = ({ title, subtitle, content }) => {
  const cols = content[0]?.length.toString()
  console.log(cols)

  return (
    <div className="tile">
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs">{subtitle}</div>
      <div className={`grid grid-cols-${cols} m-3 gap-x-20 text-xs md:text-base justify-center`}>
        {content.map((item) =>
          item.map((value, i) =>
            i === 0 ? (
              <div key={i} className="text-left">
                {value}
              </div>
            ) : (
              <div key={i} className="text-center">
                {value}
              </div>
            )
          )
        )}
      </div>
    </div>
  )
}
