import { GraphPanel, ListPanel, SimplePanel } from '../components/panels'
import { LineGraphTile, ListTile, SimpleTile } from '../components/tiles'

export const Home = () => {
  const constructors = {
    labels: ['Bahrein', 'Saudi Arabia', 'Australia', 'China', 'Azerbaiyan'],
    datasets: [
      {
        label: 'Red Bull',
        data: [46, 78, 101, 101, 112],
        borderColor: 'rgb(219, 10, 64)',
        backgroundColor: 'rgba(219, 10, 64, 0.5)',
      },
      {
        label: 'Aston Martin',
        data: [10, 40, 56, 89, 131],
        borderColor: 'rgb(3, 122, 104)',
        backgroundColor: 'rgba(3, 122, 104, 0.5)',
      },
    ],
  }
  const drivers = {
    labels: ['Bahrein', 'Saudi Arabia', 'Australia', 'China', 'Azerbaiyan'],
    datasets: [
      {
        label: 'Fernando Alonso',
        data: [10, 35, 55, 78, 103],
        borderColor: 'rgb(3, 122, 104)',
        backgroundColor: 'rgba(3, 122, 104, 0.5)',
      },
      {
        label: 'Nikita Mazepin',
        data: [10, 24, 28, 45, 56],
        borderColor: 'rgb(200, 200, 200)',
        backgroundColor: 'rgba(200, 200, 200, 0.5)',
      },
    ],
  }

  return (
    <>
      <div className="grid grid-cols-1 w-11/12 md:w-2/3 gap-y-4 mx-auto my-4">
        <SimplePanel>
          <SimpleTile
            title="LAST RACE WINNER"
            subtitle="DRIVER"
            content="Nikita Mazepin"
          />
          <SimpleTile
            title="LAST RACE WINNER"
            subtitle="CONSTRUCTOR"
            content="Haas"
          />
          <SimpleTile
            title="CHAMPIONSHIP WINNER"
            subtitle="DRIVER"
            content="Fernando Alonso"
          />
          <SimpleTile
            title="CHAMPIONSHIP WINNER"
            subtitle="CONSTRUCTOR"
            content="Aston Martin"
          />
        </SimplePanel>
        <ListPanel>
          <ListTile
            title="DRIVERS STANDINGS"
            subtitle="2023"
            content={[
              ['El nano', 180],
              ['Carlos Sainz', 33],
              ['Mazepin', 13],
            ]}
          />
          <ListTile
            title="CONSTRUCTORS STANDINGS"
            subtitle="2023"
            content={[
              ['Aston Martin', 'Mercedes', 181],
              ['Ferrari', 'Ferrari', 45],
              ['Haas', 'Ferrari', 23],
            ]}
          />
        </ListPanel>
        <GraphPanel>
          <LineGraphTile title="DRIVERS STANDINGS" data={drivers} />
          <LineGraphTile title="CONSTRUCTORS STANDINGS" data={constructors} />
        </GraphPanel>
      </div>
    </>
  )
}
