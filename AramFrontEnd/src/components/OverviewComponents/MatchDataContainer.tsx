import { getMatchParticipant } from '../../services/backendApiCalls'
import MatchCard from './MatchCard'
import { useQueries } from '@tanstack/react-query'
import SummaryCard from './SummaryCard'
import { MatchParticipant } from '../../types'


interface MatchContainerProps {
    matchIds: string[]
    puuid: string
}

function MatchDataContainer(props: MatchContainerProps) {

  const matchDataQueries = useQueries({
    queries: props.matchIds.map((matchId) => {
      return {
        queryKey: ["matchParticipant", matchId, props.puuid],
        queryFn: () => getMatchParticipant(props.puuid, matchId)
      }
    })
  })
  
  const matchDataArray = matchDataQueries.map(query => query.data);
  if (matchDataArray.includes(undefined)) return <h1>Loading Match Array</h1>

  return (
    <> 
      <div>
        <SummaryCard matches={matchDataArray} puuid={props.puuid}/>  
      </div>
      <ul>
        {matchDataArray.map((matchParticipant: MatchParticipant | undefined) => (
          <MatchCard key={matchParticipant!.matchId} puuid={props.puuid} matchId={matchParticipant!.matchId} matchParticipant={matchParticipant!} />
        ))}
      </ul>
    </>
  )
}

export default MatchDataContainer