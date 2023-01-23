import { useLayoutEffect, useState } from 'react'
import {
  getConstructorStandings,
  getDriverStandings,
  getLastChampionship,
  getLastWin,
} from '../api'
import { GraphPanel, ListPanel, SimplePanel } from '../components/panels'
import { LineGraphTile, ListTile, SimpleTile } from '../components/tiles'
import { Navbar, Sidebar } from '../components/ui'
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
    constructorDatasets: [],
  })

  useLayoutEffect(() => {
    getLastWin().then((res) => {
      setLastWin(res)
    })
    getLastChampionship().then((res) => {
      setLastChamp(res)
    })
    getDriverStandings().then((res) => {
      setDriverStandings(res.slice(0, 3))
    })
    getConstructorStandings().then((res) => {
      setConstructorStandings(res.slice(0, 3))
    })
    getProgress({ top: 5 }).then((res) => {
      setProgress(res)
    })
  }, [])

  return (
    <MainView>
      <div className="grid grid-cols-1 w-11/12 md:w-2/3 gap-y-4 mx-auto my-4 mt-20">
        <SimplePanel>
          <SimpleTile
            title="LAST RACE WINNER"
            subtitle="DRIVER"
            content={lastWin.driver}
          />
          <SimpleTile
            title="LAST RACE WINNER"
            subtitle="CONSTRUCTOR"
            content={lastWin.constructor}
          />
          <SimpleTile
            title="CHAMPIONSHIP WINNER"
            subtitle="DRIVER"
            content={lastChamp.driver}
          />
          <SimpleTile
            title="CHAMPIONSHIP WINNER"
            subtitle="CONSTRUCTOR"
            content={lastChamp.constructor}
          />
        </SimplePanel>
        <ListPanel>
          <ListTile
            title="DRIVERS STANDINGS"
            subtitle="2022"
            labels={['Driver', 'Points']}
            content={driverStandings}
          />
          <ListTile
            title="CONSTRUCTORS STANDINGS"
            subtitle="2022"
            labels={['Driver', 'Points']}
            content={constructorStandings}
          />
        </ListPanel>
        <GraphPanel>
          <LineGraphTile
            title="DRIVERS STANDINGS"
            data={{
              labels: progress.labels,
              datasets: progress.driverDatasets,
            }}
          />
          <LineGraphTile
            title="CONSTRUCTORS STANDINGS"
            data={{
              labels: progress.labels,
              datasets: progress.constructorDatasets,
            }}
          />
        </GraphPanel>
      </div>
    </MainView>
  )
}
