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
      const puuidList = match?.metadata.participants;
      const playerIndex = puuidList?.indexOf(props.puuid!);
      if (props.matches[i]?.info.participants[playerIndex].win === true) {
        wins +=1;
      }
      

    }
    setWinRate(wins/props.matches.length);

  }, [])

  console.log("In summary card")
  console.log("wr: " + winRate)

  return (
    <div>SummaryCard</div>
  )
}

export default SummaryCard