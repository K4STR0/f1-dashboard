// Selectors style
export const selectStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#1e1e1e',
    borderColor: 'rgba(255, 0, 0, 0.3)',
    textAlign: 'center',
    boxShadow: 'red',
    '&:hover': {
      borderColor: 'rgba(255, 0, 0, 0.6)'
    }
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#1e1e1e'
  }),
  option: (provided, state) => ({
    ...provided,
    fontWeight: state.isSelected ? 'bold' : 'normal',
    color: 'white',
    backgroundColor: '#1e1e1e',
    textAlign: 'center',
    fontSize: state.selectProps.myFontSize
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: state.data.color,
    fontSize: state.selectProps.myFontSize
  })
}

// years array (label and value) [1950, 1951,..., 'current']
export const yearOptions = [
  { value: 'current', label: 'CURRENT' },
  ...Array.from({ length: new Date().getFullYear() - 1950 }, (x, i) => i + 1950)
    .reverse()
    .map((year) => ({ value: year, label: year }))
]

// championship array (label and value) ['drivers', 'constructors']
export const championshipOptions = [
  {
    label: 'DRIVERS',
    value: 'drivers'
  },
  {
    label: 'CONSTRUCTORS',
    value: 'constructors'
  }
]

// tops array (label and value) [1, 2, 3,..., 19, 20, null]
export const topOptions = [
  { value: null, label: 'ALL' },
  ...Array.from({ length: 20 }, (x, i) => i + 1).map((top) => ({
    value: top,
    label: 'TOP ' + top
  }))
]
