import { TextField, Button } from '@mui/material'

function Searchbar() {
  return (
    <header> 
        <h1>Fjords</h1>
        <search className='account-page-searchbar'>
          <TextField 
            id="account-name" 
            label="Account Name" 
            variant='standard'
            className='account-pg-search-name'
          />
          <TextField 
            id="tagline" 
            label="#Tag" 
            variant='standard' 
            className='account-pg-search-tag'
          />
          <Button
            variant="contained"
            size='small'
            disableRipple
            disableElevation
            className='account-pg-search-button'
          >
            Search
          </Button>
        </search>
      </header>
  )
}

export default Searchbar