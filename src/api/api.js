import axios from 'axios'

const BASE_URL = 'https://ergast.com/api/f1/'

export const getLastWin = async () => {
  const res = await axios.get(BASE_URL + 'current/last/results/1.json')
  const data = res.data.MRData.RaceTable.Races[0].Results[0]
  return {
    driver: data.Driver.givenName + ' ' + data.Driver.familyName,
    constructor: data.Constructor.name,
  }
}

export const getLastChampionship = async () => {
  const res1 = await axios.get(BASE_URL + 'current/driverStandings.json')
  const res2 = await axios.get(BASE_URL + 'current/constructorStandings.json')
  const data1 =
    res1.data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0]
  const data2 =
    res2.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0]
  return {
    driver: data1.Driver.givenName + ' ' + data1.Driver.familyName,
    constructor: data2.Constructor.name,
  }
}

export const getConstructorStandings = async () => {
  const res = await axios.get(BASE_URL + 'current/constructorStandings.json')
  const data =
    res.data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings
  return data.map((item) => {
    return [item.Constructor.name, item.points]
  })
}

export const getDriverStandings = async () => {
  const res = await axios.get(BASE_URL + 'current/driverStandings.json')
  const data = res.data.MRData.StandingsTable.StandingsLists[0].DriverStandings
  return data.map((item) => {
    return [item.Driver.givenName + ' ' + item.Driver.familyName, item.points]
  })
}

export const getRounds = async (year) => {
  const res = await axios.get(BASE_URL + year + '.json')
  const data = res.data.MRData.total
  return data
}

export const getDrivers = async (year) => {
  const res = await axios.get(BASE_URL + year + '/drivers.json')
  const data = res.data.MRData.DriverTable.Drivers
  return data
}

export const getConstructors = async (year) => {
  const res = await axios.get(BASE_URL + year + '/constructors.json')
  const data = res.data.MRData.ConstructorTable.Constructors
  return data
}

export const getRaceResults = async (year, round) => {
  const res = await axios.get(BASE_URL + year + '/' + round + '/results.json')
  const data = res.data.MRData.RaceTable.Races[0]
  return data
}

export const getFastestLaps = async (year, round) => {
  const res = await axios.get(
    BASE_URL + year + '/' + round + '/fastest/1/results.json'
  )
  const data = res.data.MRData.RaceTable.Races[0].Results[0]
  return data
}

export const getSprintRaceResults = async (year, round) => {
  const res = await axios.get(BASE_URL + year + '/' + round + '/sprint.json')
  const data = res.data.MRData.RaceTable.Races[0]
  return data
}
