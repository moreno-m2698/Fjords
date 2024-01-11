import { getMatchParticipant } from '../../services/backendApiCalls'
import MatchCard from './MatchCard'
import { useQueries } from '@tanstack/react-query'
import SummaryCard from './SummaryCard'


interface MatchContainerProps {
    matchIds: string[]
    puuid: string
}

function MatchContainer(props: MatchContainerProps) {

  const matchQueries = useQueries({
    queries: props.matchIds.map((matchId) => {
      return {
        queryKey: ["match", matchId],
        queryFn: () => getMatchParticipant(props.puuid, matchId)
      }
    })
  })
  
  const matchArray = matchQueries.map(query => query.data);
  if (matchArray.includes(undefined)) return <h1>Loading Match Array</h1>

  return (
    <>
      <SummaryCard matches={matchArray} puuid={props.puuid}/>
      {props.matchIds.map((matchId: string) => (
        <MatchCard key={matchId} puuid={props.puuid} matchId={matchId} />
      ))}
    </>
  )
}

export default MatchContainer