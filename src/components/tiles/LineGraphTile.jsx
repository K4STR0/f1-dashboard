import { Line } from 'react-chartjs-2'
import { chartOptions } from '../../helpers'

/**
 * Tile component wich draw a line graph given:
 * @property {Object} data: Information to be represented -> {labels: [], datasets: []}
 * @property {String} title: Name of the graph
 * @property {String} subtitle: Extra info about the graph
 * @property {function} onClick: Function to be executed when graph is clicked
 **/

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
