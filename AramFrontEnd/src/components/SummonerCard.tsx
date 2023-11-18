import { useState, useEffect } from "react";
import { Summoner } from "../types";
import { getSummonerDataByName } from "../api/backendApiCalls";
import { AxiosResponse } from "axios";

interface summonerCardProps {
  summonerName: string
}

//This is making correct call but talk to marcel about what i can do
function SummonerCard(props: summonerCardProps) {
  
  const [summoner, setSummmoner] = useState<Summoner|null>(null)
  useEffect(
    () => {
      const fetchData = async () => {
        const response: AxiosResponse<any, any> | undefined = await getSummonerDataByName(props.summonerName);
        const data: Summoner = response?.data;
        setSummmoner(data);
      }

      fetchData()
      return () => alert('Goodbye summoner component')
    },
    []
  )

  return (
    <div className="summmoner">
      <h1>Summoner Card</h1>
      <p>{summoner?.name}</p>
      <p>{summoner?.profileIconId}, {summoner?.summonerLevel}</p>
      
    </div>
  )
}

export default SummonerCard