export const customStyles = {
  valueContainer: (provided, state) => ({
    ...provided,
    border: 'none',
    outline: 'none',
    padding: `2.25rem 1rem 1rem ${children ? '3.5rem' : '1rem'}`,
  }),
  container: (provided, state) => ({
    ...provided,
    width: '100%',
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: disabled ? 'transparent' : 'white',
    border: disabled ? '1px solid #E5E5E5' : '1px solid #c4c4c4',
    boxShadow: error ? '0 0 0 1px #D44D5C' : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    "&:hover": {
      border: disabled ? '1px solid #E5E5E5' : "1px solid #082735"
    },
    "&:focus-within": {
      outline: disabled ? 'none' : '2px solid #00BFB2'
    }
  }),
  placeholder: (provided, state) => ({
    ...provided,
    top: 'calc(50% + .25rem)',
    paddingLeft: '0',
    marginLeft: '0',
    fontSize: '14px',
    fontFamily: 'Montserrat',
    fontWeight: '500',
    pointerEvents: 'none',
    color: disabled ? '#E5E5E5' : '#A8B7BE'
  }),
  input: (provided, state) => ({
    ...provided,
    margin: 0,
    paddingBottom: 0,
    paddingTop: '0',
    top: 'calc(50% + 2px)',
    paddingLeft: '2rem',
    fontSize: '14px',
    fontWeight: '400',
    color: disabled ? '#ADBCC2' : '#082735',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    padding: '0 1rem 0 1.5rem',
    color: disabled ? 'transparent' : '#c4c4c4',
    "&:hover": {
      color: disabled ? 'transparent' : "#c4c4c4",
    },
  }),
  indicatorSeparator: (provided, state) => ({
    ...provided,
    background: 'none'
  }),
  singleValue: (provided, state) => ({
    ...provided,
    top: 'calc(50% + 2px)',
    left: '3.5rem',
    marginLeft: '0',
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: '14px',
    color: disabled ? '#E5E5E5' : '#082735'
  })
}
