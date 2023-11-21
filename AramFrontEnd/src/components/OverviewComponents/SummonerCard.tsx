import { Summoner } from "../../types";

interface summonerCardProps {
  summoner: Summoner
}

//This is making correct call but talk to marcel about what i can do
function SummonerCard(props: summonerCardProps) {
  
  

  return (
    <div className="summmoner">
      <h1>Summoner Card</h1>
      <p>Name:{props.summoner?.name}</p>
      <p>Lvl:{props.summoner?.summonerLevel}</p>
      <h2>Icon info:</h2>
      <p>Id:{props.summoner?.profileIconId}</p>
      <img alt="Summoner Icon" src={`https://ddragon.leagueoflegends.com/cdn/13.22.1/img/profileicon/${props.summoner?.profileIconId}.png`} />
    </div>
  )
}


export default SummonerCard