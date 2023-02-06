import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { useNavigate, useParams } from 'react-router'
import Select from 'react-select'
import { chartOptions, getProgress } from '../helpers'
import { MainView } from '../layout'

export const Progress = () => {
  const { champ } = useParams()
  const navigate = useNavigate()

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

  const yearOptions = [
    { value: 'current', label: 'CURRENT' },
    ...Array.from(
      { length: new Date().getFullYear() - 1950 },
      (x, i) => i + 1950
    )
      .reverse()
      .map((year) => ({ value: year, label: year }))
  ]

  const onYearChange = (event) => {
    if (event.value === year) return
    setLoading(true)
    setYear(event.value)
  }

  const topOptions = [
    { value: null, label: 'ALL' },
    ...Array.from({ length: 20 }, (x, i) => i + 1).map((top) => ({
      value: top,
      label: 'TOP ' + top
    }))
  ]

  const onTopChange = (event) => {
    if (event.value === top) return
    setLoading(true)
    setTop(event.value)
  }

  const championshipOptions = [
    {
      label: 'DRIVERS',
      value: 'drivers'
    },
    {
      label: 'CONSTRUCTORS',
      value: 'constructors'
    }
  ]

  const onChampChange = (event) => {
    if (event.value === championship) return
    setLoading(true)
    setChampionship(event.value)
    navigate(`/progress/${event.value}`)
  }

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: '#1e1e1e',
      borderColor: 'rgba(255, 0, 0, 0.3)',
      textAlign: 'center',
      boxShadow: 'red',
      '&:hover': {
        borderColor: 'rgba(255, 0, 0, 0.6)'
      }
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: '#1e1e1e'
    }),
    option: (provided, state) => ({
      ...provided,
      fontWeight: state.isSelected ? 'bold' : 'normal',
      color: 'white',
      backgroundColor: '#1e1e1e',
      textAlign: 'center',
      fontSize: state.selectProps.myFontSize
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: state.data.color,
      fontSize: state.selectProps.myFontSize
    })
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

        <div className='tile mb-10'>
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
