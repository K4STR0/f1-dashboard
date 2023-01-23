import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import { chartOptions, getProgress } from '../helpers'
import { MainView } from '../layout'

export const Progress = () => {
  const [year, setYear] = useState('current') //  1950, 2020, 'current'
  const [top, setTop] = useState(null) //  1960, 2020, 'current'
  const [data, setData] = useState({ labels: [], datasets: [] })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProgress({ year, top }).then((res) => {
      setData({ labels: res.labels, datasets: res.driverDatasets })
      setLoading(false)
    })
  }, [year, top])

  const yearsRange = Array.from(
    { length: new Date().getFullYear() - 1950 },
    (x, i) => i + 1950
  )

  const topRange = Array.from({ length: 20 }, (x, i) => i + 1)

  return (
    <MainView>
      <div
        style={{
          width: '90vw',
          height: '90vh',
          paddingTop: '100px',
          margin: 'auto',
        }}
      >
        <select
          value={year}
          onChange={({ target }) => {
            setLoading(true)
            setYear(target.value)
          }}
        >
          {yearsRange.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
          <option key={'current'} value={'current'}>
            current
          </option>
        </select>

        <select
          value={top}
          onChange={({ target }) => {
            setLoading(true)
            setTop(target.value)
          }}
        >
          {topRange.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <div className="tile">
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <Line options={chartOptions} data={data} />
          )}
        </div>
      </div>
    </MainView>
  )
}
