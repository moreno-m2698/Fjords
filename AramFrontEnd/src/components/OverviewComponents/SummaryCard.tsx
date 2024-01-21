import { useState, useEffect } from 'react'
import { Pie, PieChart, ResponsiveContainer, Cell } from 'recharts';

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
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



  return (
    <>
    {/* responsive container needs to be set first for graph to render */}
      <ul className="matches__summary">
        <li className='win-rate-graph-container grid-column-start-1'>
          <ResponsiveContainer>
            <PieChart width={500} height={400}>
              <Pie 
                data={data} 
                dataKey="value"
                cx="50%"
                cy='50%'
                innerRadius={40}
                outerRadius={50} 
                fill="#8884d8" 
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </li>
        <li className='grid-column-start-1'>Win Rate: {winAmount/props.matches.length}</li>
        <li className='grid-column-start-2'>{((averageKills + averageAssists) / averageDeaths).toFixed(2)} KDA</li>
        <li className='grid-column-start-1'>Last {props.matches.length} games</li>
        <li className='grid-column-start-2'>
          <span>{averageKills.toFixed(1)}</span>/
          <span>{averageDeaths.toFixed(1)}</span>/
          <span>{averageAssists.toFixed(1)}</span>
        </li>
      </ul>
    </>
  )
}

export default SummaryCard