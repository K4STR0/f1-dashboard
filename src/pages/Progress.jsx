import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router'
import Select from 'react-select'
import { Line } from 'react-chartjs-2'

import { championshipOptions, chartOptions, getProgress, selectStyles, topOptions, yearOptions } from '../helpers'
import { MainView } from '../layout'

// Component for the progress page
export const Progress = () => {
  const { champ } = useParams()

  // Todo: Refactor (Custom Hook?)

  const [year, setYear] = useState('current') //  1950, 2020, 'current'
  const [top, setTop] = useState(null) //  5, 10, 'all'
  const [championship, setChampionship] = useState(champ) //  'drivers', 'constructors'
  const [data, setData] = useState({ labels: [], datasets: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProgress({ year, top }).then((res) => {
      setData({
        labels: res.labels,
        datasets:
        championship === 'drivers'
          ? res.driverDatasets
          : res.constructorDatasets
      })
      setLoading(false)
    })
  }, [year, top, championship])

  const navigate = useNavigate()

  const onYearChange = (event) => {
    if (event.value === year) return
    setLoading(true)
    setYear(event.value)
  }

  const onTopChange = (event) => {
    if (event.value === top) return
    setLoading(true)
    setTop(event.value)
  }

  const onChampChange = (event) => {
    if (event.value === championship) return
    setLoading(true)
    setChampionship(event.value)
    navigate(`/progress/${event.value}`)
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
          className='grid grid-rows-3 sm:grid-rows-1 grid-flow-col
          justify-center mb-10 gap-x-10 gap-y-3'
        >
          {/* Selector for year, top and championship */}
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
            <label className='mx-2 opacity-50'>TOP</label>
            <Select
              className='w-32'
              placeholder='TOP'
              value={{
                label: topOptions.find((t) => t.value === top).label
              }}
              onChange={onTopChange}
              options={topOptions}
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

        {/* Graph of progress */}
        <div className='tile mb-10 min-h-[500px]'>
          {loading
            ? (
              <h2>Loading...</h2>
              )
            : (
              <Line options={chartOptions} data={data} />
              )}
        </div>
      </div>
    </MainView>
  )
}
