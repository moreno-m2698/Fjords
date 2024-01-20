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
      <div className="matches__summary">
        <div className='win-rate-graph-container'>
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
        </div>
        <ul >
          <li>Win Rate: {winAmount/props.matches.length}</li>
          <li>Last {props.matches.length} games</li>
          <li>{((averageKills + averageAssists) / averageDeaths).toFixed(2)} KDA</li>
          <li>
            {averageKills.toFixed(1)}K
          </li>
          <li>
            {averageDeaths.toFixed(1)}D
          </li>
          <li>
            {averageAssists.toFixed(1)}A
          </li>
        </ul>
      </div>
    </>
  )
}

export default SummaryCard