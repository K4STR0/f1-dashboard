import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { chartOptions } from '../../helpers'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const LineGraphTile = ({ data, title, subtitle, onClick }) => {
  return (
    <div className='tile' onClick={onClick}>
      <div className='text-sm font-semibold'>{title}</div>
      <div className='text-xs'>{subtitle}</div>
      <div style={{ height: '400px', width: '100%' }}>
        <Line options={chartOptions} data={data} />
      </div>
    </div>
  )
}
