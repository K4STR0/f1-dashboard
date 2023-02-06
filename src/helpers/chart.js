export const chartOptions = {
  responsive: true,
  fontColor: 'white',
  radius: 1,
  borderWidth: 2,
  scales: {
    x: {
      ticks: {
        color: 'white'
      }
    },
    y: {
      ticks: {
        color: 'white'
      }
    }
  },
  plugins: {
    legend: {
      position: 'top',
      align: 'center',
      labels: {
        color: 'white',
        boxWidth: 10,
        boxHeight: 10
      }
    }
  },
  maintainAspectRatio: false
}
