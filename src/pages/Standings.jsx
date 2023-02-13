import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Select from 'react-select'
import { getConstructorStandings, getDriverStandings } from '../api'
import { championshipOptions, selectStyles, yearOptions } from '../helpers'
import { MainView } from '../layout'

export const Standings = () => {
  const { champ } = useParams()

  // Todo: Refactor (Custom Hook?)

  const [year, setYear] = useState('current') //  1950, 2020, 'current'
  const [championship, setChampionship] = useState(champ) //  'drivers', 'constructors'
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (championship === 'drivers') {
      getDriverStandings(year).then((res) => setData(res))
    } else if (championship === 'constructors') {
      getConstructorStandings(year).then((res) => setData(res))
    } else {
      throw Error('Not allowed championship')
    }
    setLoading(false)
  }, [year, championship])

  const labels = ['NAME', 'NATIONALITY', 'WINS', 'POINTS']

  const onYearChange = (event) => {
    if (event.value === year) return
    setLoading(true)
    setYear(event.value)
  }

  const onChampChange = (event) => {
    if (event.value === championship) return
    setLoading(true)
    setChampionship(event.value)
  }

  return (
    <MainView>
      <div
        style={{
          width: '90vw',
          height: '85vh',
          paddingTop: '100px',
          margin: 'auto'
        }}
      >
        <div
          className='grid grid-rows-2 sm:grid-rows-1 grid-flow-col
          justify-center mb-10 gap-x-10 gap-y-3'
        >
          <div className='m-auto text-center sm:m-0 sm:text-left'>
            <label className='mx-2 opacity-50'>SEASON</label>
            <Select
              className='w-44 '
              placeholder='YEAR'
              value={{
                label: yearOptions.find((y) => y.value === year).label
              }}
              onChange={onYearChange}
              options={yearOptions}
              styles={selectStyles}
              maxMenuHeight={200}
              isSearchable={false}
            />
          </div>

          <div className='m-auto text-center sm:m-0 sm:text-left'>
            <label className='mx-2 opacity-50'>CHAMPIONSHIP</label>
            <Select
              className='w-52'
              placeholder='CHAMPIONSHIP'
              value={{
                label: championshipOptions.find((c) => c.value === championship)
                  .label
              }}
              onChange={onChampChange}
              options={championshipOptions}
              styles={selectStyles}
              maxMenuHeight={200}
              isSearchable={false}
            />
          </div>
        </div>
        <div
          className='tile'
          style={{
            display: 'grid',
            justifyContent: 'space-around',
            height: 'auto',
            maxWidth: '1000px',
            margin: 'auto',
            gap: '5px'
          }}
        >
          <div className='grid grid-cols-4 text-xs md:text-base opacity-70'>
            {labels.map((item, i) => (
              <div key={i} className='mx-5'>
                {item}
              </div>
            ))}
          </div>
          {loading
            ? (
              <h2>Loading...</h2>
              )
            : (
                data.map((item, x) => (
                  <div
                    key={x}
                    className={
                  ' text-xs md:text-base border ' +
                  'border-red-900 rounded  bg-red-900 bg-opacity-20 ' +
                  (x === 0 ? 'gold' : '') +
                  (x === 1 ? 'silver' : '') +
                  (x === 2 ? 'bronze' : '')
                }
                  >
                    <div className='absolute text-xs'>{x + 1}</div>
                    <div className='grid grid-cols-4 p-2'>
                      {item.map((value, i) => (
                        <div
                          key={i}
                          className={
                        'md:px-3 lg:px-10 ' +
                        (i === 0
                          ? 'text-left font-semibold ml-2 '
                          : 'text-center ' +
                            ((x === 0) | (x === 1) | (x === 2)
                              ? 'border-l border-l-black'
                              : 'border-l border-l-red-900'))
                      }
                        >
                          {value}
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
        </div>
      </div>
    </MainView>
  )
}
