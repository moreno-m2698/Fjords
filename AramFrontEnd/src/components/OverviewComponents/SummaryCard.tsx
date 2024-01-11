import { useState, useEffect } from 'react'

interface SummaryCardProps{
    matches: any[],
    puuid: string
}

function SummaryCard(props: SummaryCardProps) {

  const [winRate, setWinRate] = useState<number>(0);

  useEffect(() => {
    let wins = 0;
    for (let i = 0; i < props.matches.length; i++) {

      const match = props.matches[i];
      if (props.matches[i]?.win === true) {
        wins +=1;
      }
      
    }
    setWinRate(wins/props.matches.length);

  }, [])

  console.log("In summary card")
  console.log("wr: " + winRate)

  return (
    <>
    <div>SummaryCard</div>
    <h2>Win Rate: {winRate}</h2>
    </>
  )
}

export default SummaryCard