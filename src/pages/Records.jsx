import { useEffect, useState } from 'react'
import { getFastestLap } from '../api'
import { SimplePanel } from '../components/panels'
import { SimpleTile } from '../components/tiles'
import { getLastRaceFastestPitstop } from '../helpers'
import { MainView } from '../layout/MainView'

export const Records = () => {
  const [fastestPitstop, setFastestPitstop] = useState({ driver: '', time: '' })
  const [fastestLap, setFastestLap] = useState({ driver: '', lapTime: '' })

  useEffect(() => {
    getLastRaceFastestPitstop().then((res) => {
      setFastestPitstop(res)
    })
    getFastestLap().then((res) => {
      setFastestLap(res)
    })
  }, [])

  return (
    <MainView>
      <div className='grid grid-cols-1 w-11/12 md:w-2/3 gap-y-4 mx-auto my-4 mt-20'>
        <SimpleTile
          title='BAHREIN FASTEST LAP'
          subtitle='1:34.570'
          content='Pedro Martínez de la Rosa'
          color='gold'
        />
        <SimplePanel>
          <SimpleTile
            title='LAST RACE FASTEST PITSTOP'
            subtitle={fastestPitstop.time + 's'}
            content={fastestPitstop.driver}
          />
          <SimpleTile
            title='LAST RACE FASTEST LAP'
            subtitle={fastestLap.lapTime}
            content={fastestLap.driver}
          />
        </SimplePanel>
        <SimpleTile
          title='ANOTHER RECORD'
          subtitle='-----'
          content='-----'
          color='silver'
        />
      </div>
    </MainView>
  )
}
