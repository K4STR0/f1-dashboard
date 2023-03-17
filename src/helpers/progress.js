import {
  getConstructors,
  getDrivers,
  getRaceResults,
  getRounds,
  getSprintRaceResults
} from '../api'

export const constructorColors = {
  Ferrari: '#ff2800',
  'Red Bull': '#400edf',
  Mercedes: '#0edfbd',
  McLaren: '#fc9519',
  'Aston Martin': '#1d9e65',
  'Alpine F1 Team': '#6abad5',
  AlphaTauri: '#69829c',
  'Alfa Romeo': '#a91f1f',
  Williams: '#067af8',
  'Haas F1 Team': '#ffffff'
}

/**
 * Get the progress of the drivers and constructors on a specific season (year)
 * filtered by a top (from best to worst).
 * This progress is calculated accumulating the points of each team/constructor
 * across the season and putting them into a list
 * @param {number} top Return only the data of this top (takes the best)
 * ex: top = 3 on drivers returns only the three drivers with more points
 * @param {number} year Season (can be "current" for the actual year)
 * @returns {Object} -> {labels, driverDatasets, constructorDatasets}
 * labels contains the name of the races of the season
 * driverDatasets contains the progress of the drivers across the season (array)
 * constructorDatasets contains the progress of the constructors across the season (array)
 */

export const getProgress = async ({ top = 10, year = 'current' }) => {
  const labels = ['Season start']
  let driverDatasets = []
  let constructorDatasets = []

  const rounds = await getRounds(year)
  const drivers = await getDrivers(year)
  const constructors = await getConstructors(year)

  // Initialize driver and constructor dict
  drivers.forEach((driver) => {
    driverDatasets[driver.familyName] = []
  })

  constructors.forEach((constructor) => {
    constructorDatasets[constructor.name] = []
  })

  for (let i = 1; i <= rounds; i++) {
    const race = await getRaceResults(year, i)
    const sprint = await getSprintRaceResults(year, i)
    // Add ciruciut name to labels
    if (!race) {
      continue
    }
    labels.push(race.raceName.replace('Grand Prix', 'GP'))

    // Set data with points of each driver
    drivers.forEach((driver) => {
      // Points of long races
      const racePoints =
        race.Results.find((r) => r.Driver.familyName === driver.familyName)
          ?.points || 0

      // Points of sprint races
      const sprintRacePoints =
        sprint?.SprintResults?.find(
          (r) => r.Driver.familyName === driver.familyName
        )?.points || 0

      // Accumuleted points on the previous race
      const lastPoints = i === 1 ? 0 : driverDatasets[driver.familyName][i - 2]

      // Calculate accumulated points
      const totalPoints =
        parseInt(racePoints || 0) + parseInt(sprintRacePoints || 0) + lastPoints

      // Put accumulated points in the dict
      driverDatasets[driver.familyName].push(totalPoints)
    })

    // Set data with points of each constructor
    constructors.forEach((constructor) => {
      // Points of long races
      const raceDrivers = race.Results.filter(
        (r) => r.Constructor.name === constructor.name
      )

      // TODO: Research if there is always 2 drivers max by constructor
      const racePoints =
        parseInt(raceDrivers[0]?.points || 0) +
        parseInt(raceDrivers[1]?.points || 0)

      // Points of sprint races
      const sprintDrivers = sprint?.SprintResults?.filter(
        (r) => r.Constructor.name === constructor.name
      )

      const sprintRacePoints =
        parseInt(sprintDrivers?.[0].points) +
        parseInt(sprintDrivers?.[1].points)

      // Accumuleted points on the previous race
      const lastPoints =
        i === 1 ? 0 : constructorDatasets[constructor.name][i - 2]

      // Calculate accumulated points
      const totalPoints = racePoints + (sprintRacePoints || 0) + lastPoints

      // Put accumulated points in the dict
      constructorDatasets[constructor.name].push(totalPoints)
    })
  }

  driverDatasets = Object.keys(driverDatasets).map((key) => {
    // Generate random colors for each driver
    const r = Math.floor(Math.random() * 200) + 55
    const g = Math.floor(Math.random() * 200) + 55
    const b = Math.floor(Math.random() * 200) + 55

    return {
      label: key,
      data: [0, ...driverDatasets[key]],
      // random colors for each driver
      borderColor: `rgb(${r}, ${g}, ${b})`,
      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`
    }
  })

  constructorDatasets = Object.keys(constructorDatasets).map((key) => {
    // Generate random colors for each constructor
    const r = Math.floor(Math.random() * 200) + 55
    const g = Math.floor(Math.random() * 200) + 55
    const b = Math.floor(Math.random() * 200) + 55

    return {
      label: key,
      data: [0, ...constructorDatasets[key]],
      // color of each constructor or random if its not defined
      borderColor: constructorColors[key] || `rgb(${r}, ${g}, ${b})`,
      backgroundColor: constructorColors[key] || `rgba(${r}, ${g}, ${b}, 0.5)`
    }
  })

  // Filter the data if there is a top selected
  if (top) {
    driverDatasets = driverDatasets
      .sort((a, b) => {
        return b.data[b.data.length - 1] - a.data[a.data.length - 1]
      })
      .slice(0, top)

    constructorDatasets = constructorDatasets
      .sort((a, b) => {
        return b.data[b.data.length - 1] - a.data[a.data.length - 1]
      })
      .slice(0, top)
  }

  return {
    labels,
    driverDatasets,
    constructorDatasets
  }
}
