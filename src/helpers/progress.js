import {
  getConstructors,
  getDrivers,
  getRaceResults,
  getRounds,
  getSprintRaceResults
} from '../api'

export const getProgress = async ({ top = 10, year = 'current' }) => {
  const labels = []
  let driverDatasets = []
  let constructorDatasets = []

  const rounds = await getRounds(year)
  const drivers = await getDrivers(year)
  const constructors = await getConstructors(year)

  drivers.forEach((driver) => {
    driverDatasets[driver.familyName] = []
  })

  constructors.forEach((constructor) => {
    constructorDatasets[constructor.name] = []
  })

  for (let i = 1; i <= rounds; i++) {
    const race = await getRaceResults(year, i)
    const sprint = await getSprintRaceResults(year, i)
    //  Set labels with ciruciut name
    labels.push(race.raceName.replace('Grand Prix', 'GP'))

    //  Set data with points of each driver
    drivers.forEach((driver) => {
      //  Points of long races
      const racePoints =
        race.Results.find((r) => r.Driver.familyName === driver.familyName)
          ?.points || 0

      //  Points of sprint races
      const sprintRacePoints =
        sprint?.SprintResults?.find(
          (r) => r.Driver.familyName === driver.familyName
        )?.points || 0

      //  Add points of last race
      const lastPoints = i === 1 ? 0 : driverDatasets[driver.familyName][i - 2]

      const totalPoints =
        parseInt(racePoints || 0) + parseInt(sprintRacePoints || 0) + lastPoints

      driverDatasets[driver.familyName].push(totalPoints)
    })

    //  Set data with points of each constructor
    constructors.forEach((constructor) => {
      //  Points of long races
      const raceDrivers = race.Results.filter(
        (r) => r.Constructor.name === constructor.name
      )

      const racePoints =
        parseInt(raceDrivers[0]?.points || 0) +
        parseInt(raceDrivers[1]?.points || 0)

      //  Points of sprint races
      const sprintDrivers = sprint?.SprintResults?.filter(
        (r) => r.Constructor.name === constructor.name
      )

      const sprintRacePoints =
        parseInt(sprintDrivers?.[0].points) +
        parseInt(sprintDrivers?.[1].points)

      //  Add points of last race
      const lastPoints =
        i === 1 ? 0 : constructorDatasets[constructor.name][i - 2]

      const totalPoints = racePoints + (sprintRacePoints || 0) + lastPoints

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
      data: driverDatasets[key],
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
      data: constructorDatasets[key],
      // random colors for each constructor
      borderColor: `rgb(${r}, ${g}, ${b})`,
      backgroundColor: `rgba(${r}, ${g}, ${b}, 0.5)`
    }
  })

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
