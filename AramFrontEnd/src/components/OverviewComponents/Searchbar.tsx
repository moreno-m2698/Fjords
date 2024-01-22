import { TextField, Button } from '@mui/material'
import { useState } from "react";

function Searchbar() {

  const [summonerName, setSummonerName] = useState<string>("");
  const [tagline, setTagline] = useState<string>("NA1")

  const onSummonerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSummonerName(e.target.value);
  }

  const onTaglineInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTagline(e.target.value);
  }

  const onButtonClick = () => {
 
    if (!summonerName) {
      alert("Give a name");
      return;
    }
    window.location.href = `http://localhost:8080/#/account/${summonerName}/${tagline}`;
  }


  return (
    <header> 
        <h1>Fjords</h1>
        <search className='account-page-searchbar'>
          <TextField 
            id="account-name" 
            label="Account Name" 
            variant='standard'
            className='account-pg-search-name'
            value={summonerName}
            onChange={onSummonerInputChange}
          />
          <TextField 
            id="tagline" 
            label="#Tag" 
            variant='standard' 
            className='account-pg-search-tag'
            value={tagline}
            onChange={onTaglineInputChange}
          />
          <Button
            variant="contained"
            size='small'
            disableRipple
            disableElevation
            className='account-pg-search-button'
            onClick={onButtonClick}
          >
            Search
          </Button>
        </search>
      </header>
  )
}

export default Searchbar