import { useState, useEffect } from 'react'
import { MatchParticipant } from '../../types';

interface SummaryCardProps{
    matches: any[],
    puuid: string
}

function SummaryCard(props: SummaryCardProps) {

  const [winRate, setWinRate] = useState<number>(0);
  const [averageKills, setAverageKills] = useState<number>(0);
  const [averageDeaths, setAverageDeaths] = useState<number>(0);
  const [averageAssists, setAverageAssists] = useState<number>(0);

  useEffect(() => {
    let wins = 0;
    for (let i = 0; i < props.matches.length; i++) {

      const match = props.matches[i];
      if (props.matches[i]?.win === true) {
        wins +=1;
      }
      
    }
    setWinRate(wins/props.matches.length);
    const kdaSum = props.matches.reduce((totalKda, match) => {
      return {kills: totalKda.kills + match.kills, deaths: totalKda.deaths + match.deaths, assists: totalKda.assists + match.assists};
    }, {kills: 0, deaths: 0, assists: 0})

    setAverageAssists(kdaSum.assists);
    setAverageDeaths(kdaSum.deaths);
    setAverageKills(kdaSum.kills);

  }, [])

  console.log("In summary card")
  console.log("wr: " + winRate)

  return (
    <>
    <div>SummaryCard</div>
    <h2>Win Rate: {winRate}</h2>
    <h3>Sample Size: {props.matches.length}</h3>
    <h3>Total KDA: {averageKills}/{averageDeaths}/{averageAssists}</h3>
    </>
  )
}

export default SummaryCard