import { useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  getConstructorStandings,
  getDriverStandings,
  getLastChampionship,
  getLastWin
} from '../api'
import { GraphPanel, ListPanel, SimplePanel } from '../components/panels'
import { LineGraphTile, ListTile, SimpleTile } from '../components/tiles'
import { getProgress } from '../helpers'
import { MainView } from '../layout'

export const Home = () => {
  const [lastWin, setLastWin] = useState({})
  const [lastChamp, setLastChamp] = useState({})
  const [driverStandings, setDriverStandings] = useState([])
  const [constructorStandings, setConstructorStandings] = useState([])
  const [progress, setProgress] = useState({
    labels: [],
    driverDatasets: [],
    constructorDatasets: []
  })

  const navigate = useNavigate()

  useLayoutEffect(() => {
    getLastWin().then((res) => {
      setLastWin(res)
    })
    getLastChampionship().then((res) => {
      setLastChamp(res)
    })
    getDriverStandings().then((res) => {
      setDriverStandings(res.slice(0, 3).map((d) => [d[0], d[3]]))
    })
    getConstructorStandings().then((res) => {
      setConstructorStandings(res.slice(0, 3).map((d) => [d[0], d[3]]))
    })
    getProgress({ top: 5 }).then((res) => {
      setProgress(res)
    })
  }, [])

  return (
    <MainView>
      <div className='grid grid-cols-1 w-11/12 md:w-2/3 gap-y-4 mx-auto my-4 mt-20'>
        <SimplePanel>
          <SimpleTile
            title='LAST RACE WINNER'
            subtitle='DRIVER'
            content={lastWin.driver}
            color='silver'
          />
          <SimpleTile
            title='LAST RACE WINNER'
            subtitle='CONSTRUCTOR'
            content={lastWin.constructor}
            color='silver'
          />
          <SimpleTile
            title='CHAMPIONSHIP WINNER'
            subtitle='DRIVER'
            content={lastChamp.driver}
            color='gold'
          />
          <SimpleTile
            title='CHAMPIONSHIP WINNER'
            subtitle='CONSTRUCTOR'
            content={lastChamp.constructor}
            color='gold'
          />
        </SimplePanel>
        <ListPanel>
          <ListTile
            title='DRIVERS STANDINGS'
            subtitle='2022'
            labels={['DRIVER', 'POINTS']}
            content={driverStandings}
            onClick={() => navigate('/standings/drivers')}
            rank
          />
          <ListTile
            title='CONSTRUCTORS STANDINGS'
            subtitle='2022'
            labels={['CONSTRUCTOR', 'POINTS']}
            content={constructorStandings}
            onClick={() => navigate('/standings/constructors')}
            rank
          />
        </ListPanel>
        <GraphPanel>
          <LineGraphTile
            title='DRIVERS PROGRESSION'
            data={{
              labels: progress.labels,
              datasets: progress.driverDatasets
            }}
            onClick={() => navigate('/progress/drivers')}
          />
          <LineGraphTile
            title='CONSTRUCTORS PROGRESSION'
            data={{
              labels: progress.labels,
              datasets: progress.constructorDatasets
            }}
            onClick={() => navigate('/progress/constructors')}
          />
        </GraphPanel>
      </div>
    </MainView>
  )
}
