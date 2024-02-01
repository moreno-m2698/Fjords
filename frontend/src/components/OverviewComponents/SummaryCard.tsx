import { useState, useEffect } from 'react'
import { Pie, PieChart, ResponsiveContainer, Cell } from 'recharts';
import '../../CSS/summaryCard.css'
interface SummaryCardProps{
    matches: any[],
    puuid: string
}

function SummaryCard(props: SummaryCardProps) {

  const [winAmount, setWinAmount] = useState<number>(0);
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

    setWinAmount(totalWins);
    const kdaSum = props.matches.reduce((totalKda, match) => {
      return {kills: totalKda.kills + match.kills, deaths: totalKda.deaths + match.deaths, assists: totalKda.assists + match.assists};
    }, {kills: 0, deaths: 0, assists: 0})

    setAverageAssists(kdaSum.assists/props.matches.length);
    setAverageDeaths(kdaSum.deaths/props.matches.length);
    setAverageKills(kdaSum.kills/props.matches.length);

  }, [])

  console.log("In summary card")

  const data = [
    {name: 'win', value: winAmount}, 
    {name: 'loss', value: props.matches.length - winAmount}
  ]
  const COLORS = ['#3385ff', '#ca4444'];



  return (
    <>
    {/* responsive container needs to be set first for graph to render */}
      <ul className="matches__summary">
        <li className='win-rate-graph-container grid-column-start-1'>
          <ResponsiveContainer>
            <PieChart width={400} height={400}>
              <Pie 
                data={data} 
                dataKey="value"
                cx="50%"
                cy='50%'
                innerRadius={32}
                outerRadius={50} 
                fill="#8884d8"
                paddingAngle={5}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke='rgb(1, 10, 19)'
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </li>
        <li className='grid-column-start-1'>Win Rate: {(winAmount/props.matches.length )* 100}%</li>
        <li className='grid-column-start-2'>{((averageKills + averageAssists) / averageDeaths).toFixed(2)} KDA</li>
        <li className='grid-column-start-1'>Last {props.matches.length} games</li>
        <li className='grid-column-start-2'>
          <span className='kda-bold'>{averageKills.toFixed(1)}&nbsp;</span>
          <span>/&nbsp;</span>
          <span className='kda-bold'>{averageDeaths.toFixed(1)}&nbsp;</span>
          <span>/&nbsp;</span>
          <span className='kda-bold'>{averageAssists.toFixed(1)}&nbsp;</span>
        </li>
      </ul>
    </>
  )
}

export default SummaryCard