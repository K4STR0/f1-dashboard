import { getPitStops } from '../api'

/**
 * Calculates the fastest pitstop of the last race given the year and round
 * @param {number} year Can be 'current' for actual season
 * @param {number} round Can be 'last' for last race of the season selected
 * @returns {Object} -> {driver, time} Drivers name and lap time
 */

export const getFastestPitstop = async (year = 'current', round = 'last') => {
  const pitstops = await getPitStops(year, 'last')
  // Calculate the lowest pitstop time and the driver who achieve it
  const fastest = pitstops.reduce(
    (a, b) => {
      return parseFloat(a.duration) < parseFloat(b.duration) ? a : b
    },
    { duration: Infinity }
  )

  return {
    driver: fastest.driverId.toLocaleUpperCase(),
    time: fastest.duration
  }
}
