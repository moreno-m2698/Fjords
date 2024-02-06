
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import "../CSS/homePage.css"


function HomePage() {
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
      return;
    }
    window.location.href = `/#/account/${summonerName}/${tagline}`;
  }

  const textFieldInputProps = {
    style: {
      color: "#F0E6D2",
      backgroundColor: '#1E232880',
      fontFamily: 'BeaufortForLol',
      '&:focus': {
        backgroundColor: '#1E2328'
      }
    }
  }

  const textFieldInputLabelProps = {
    style: {
      color: '#F0E6D2',
      fontFamily: 'BeaufortForLol',
    }
  }

  return (
    <>
      <div className="home-background">
        <header className="introduction">
          <h1 className="title">Welcome to the
            <span>Fjords</span>
          </h1>
        </header>
        <search className="home-page-search">
          <TextField 
            id="summoner-input" 
            label="Summoner Name" 
            type="search"
            value={summonerName}
            onChange={onSummonerInputChange}
            inputProps={textFieldInputProps}
            InputLabelProps={textFieldInputLabelProps}
          />
          <TextField
            id="tagline-input"
            label="Tag Line"
            type="search"
            value={tagline}
            onChange={onTaglineInputChange}
            inputProps={textFieldInputProps}
            InputLabelProps={textFieldInputLabelProps}
          />
          <Button
            variant="contained"
            onClick={onButtonClick}
          >
            Find Summoner
          </Button>
        </search>
      </div>
      <footer>
      </footer>
    </>
  );
}

export default HomePage;