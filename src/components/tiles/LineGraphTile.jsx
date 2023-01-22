import React from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export const options = {
  responsive: true,
  fontColor: 'white',
  scales: {
    x: {
      ticks: {
        color: 'white',
      },
    },
    y: {
      ticks: {
        color: 'white',
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'white',
      },
    },
  },
  maintainAspectRatio: false,
}
//const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Red Bull',
//       data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Aston Martin',
//       data: [9, 8, 7, 6, 5, 4, 3, 2, 1],
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// }

export const LineGraphTile = ({ data, title, subtitle }) => {
  return (
    <div className="tile">
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-xs">{subtitle}</div>
      <div style={{ height: '300px', width: '100%' }}>
        <Line options={options} data={data} />
      </div>
    </div>
  )
}
