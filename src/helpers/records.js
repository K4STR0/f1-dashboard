import { getPitStops } from '../api'

export const getLastRaceFastestPitstop = async (year = 'current') => {
  const pitstops = await getPitStops(year, 'last')
  const fastest = pitstops.reduce(
    (a, b) => {
      return parseFloat(a.duration) < parseFloat(b.duration) ? a : b
    },
    { duration: Infinity }
  )
  return {
    driver: fastest.driverId.toLocaleUpperCase(),
    time: fastest.duration,
  }
}
