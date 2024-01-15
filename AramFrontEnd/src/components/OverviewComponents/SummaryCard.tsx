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

    const totalWins = props.matches.reduce((currentWins, match) => {
      if (match.win === true) {
        return currentWins += 1;
      }
      return currentWins;
    }, 0)

    setWinRate(totalWins/props.matches.length);
    const kdaSum = props.matches.reduce((totalKda, match) => {
      return {kills: totalKda.kills + match.kills, deaths: totalKda.deaths + match.deaths, assists: totalKda.assists + match.assists};
    }, {kills: 0, deaths: 0, assists: 0})

    setAverageAssists(kdaSum.assists/props.matches.length);
    setAverageDeaths(kdaSum.deaths/props.matches.length);
    setAverageKills(kdaSum.kills/props.matches.length);

  }, [])

  console.log("In summary card")
  console.log("wr: " + winRate)

  return (
    <>
    <div>SummaryCard</div>
    <h2>Win Rate: {winRate}</h2>
    <h3>Sample Size: {props.matches.length}</h3>
    <h3>Average KDA: {((averageKills + averageAssists) / averageDeaths).toFixed(2)}</h3>
    </>
  )
}

export default SummaryCard