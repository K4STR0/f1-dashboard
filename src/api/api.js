import axios from 'axios'

const BASE_URL = 'https://ergast.com/api/f1/'

// Returns the last race driver winner and his constructor name
export const getLastWin = async () => {
  const res = await axios.get(BASE_URL + 'current/last/results/1.json')
  const data = res.data.MRData.RaceTable.Races[0].Results[0]
  return {
    driver: data.Driver.givenName + ' ' + data.Driver.familyName,
    constructor: data.Constructor.name
  }
}

// Returns the last champion driver and his constructor name
export const getLastChampionship = async () => {
  const res1 = await axios.get(BASE_URL + 'current/driverStandings.json')
  const res2 = await axios.get(BASE_URL + 'current/constructorStandings.json')
  const data1 =
    res1.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
  const data2 =
    res2.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]
  return {
    driver: data1.Driver.givenName + ' ' + data1.Driver.familyName,
    constructor: data2.Constructor.name
  }
}

// Returns the constructor standings after the last race of a season given the year
export const getConstructorStandings = async (year = 'current') => {
  const res = await axios.get(BASE_URL + `${year}/constructorStandings.json`)
  const data =
    res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
  return data.map((item) => {
    return [
      item.Constructor.name,
      item.Constructor.nationality,
      item.wins,
      item.points
    ]
  })
}

// Returns the driver standings after the last race of a season given the year
export const getDriverStandings = async (year = 'current') => {
  const res = await axios.get(BASE_URL + `${year}/driverStandings.json`)
  const data = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
  return data.map((item) => {
    return [
      item.Driver.givenName + ' ' + item.Driver.familyName,
      item.Driver.nationality,
      item.wins,
      item.points
    ]
  })
}

// Returns the number of rounds of a season given the year
export const getRounds = async (year) => {
  const res = await axios.get(BASE_URL + year + '.json')
  const data = res.data.MRData.total
  return data
}

// Returns the list of the drivers of a season given the year
export const getDrivers = async (year) => {
  const res = await axios.get(BASE_URL + year + '/drivers.json')
  const data = res.data.MRData.DriverTable.Drivers
  return data
}

// Returns the list of the constructors of a season given the year
export const getConstructors = async (year) => {
  const res = await axios.get(BASE_URL + year + '/constructors.json')
  const data = res.data.MRData.ConstructorTable.Constructors
  return data
}

// Return the result of a specific race given the year and the round number
export const getRaceResults = async (year, round) => {
  const res = await axios.get(BASE_URL + year + '/' + round + '/results.json')
  const data = res.data.MRData.RaceTable.Races[0]
  return data
}

// Return the result of a specific sprint race given the year and the round number
export const getSprintRaceResults = async (year, round) => {
  const res = await axios.get(BASE_URL + year + '/' + round + '/sprint.json')
  const data = res.data.MRData.RaceTable.Races[0]
  return data
}

// Return the list of pitstops given the year and the round number
export const getPitStops = async (year, round) => {
  const res = await axios.get(BASE_URL + year + '/' + round + '/pitstops.json')
  return res.data.MRData.RaceTable.Races[0].PitStops
}

// Return the fastest lap of a specific race given the year and the round number
export const getFastestLap = async (year = 'current', round = 'last') => {
  const res = await axios.get(
    BASE_URL + year + '/' + round + '/fastest/1/results.json'
  )

  const driver = res.data.MRData.RaceTable.Races[0].Results[0].Driver.familyName
  const lapTime =
    res.data.MRData.RaceTable.Races[0].Results[0].FastestLap.Time.time

  return { driver, lapTime }
}
