import { useParams } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query"
import { getSummonerDataByNamePromise, getMatchIdsByPuuidPromise } from '../services/backendApiCalls';
import SummonerCard from '../components/OverviewComponents/SummonerCard';
import MatchCard from '../components/OverviewComponents/MatchCard';

function SummonerPage() {
  const { summonerName } = useParams();

  const {
    status: statusSummoner,
    error: errorSummoner,
    data: summoner
  } = useQuery({
    queryKey: ["summoner", summonerName],
    queryFn: () => getSummonerDataByNamePromise(summonerName!)
  }) 

  const { 
    status: statusMatchIds,
    data: matchIds
  } = useQuery({
    enabled: summoner?.puuid != null,
    queryKey: ["matchIds", summoner?.puuid],
    queryFn: () => getMatchIdsByPuuidPromise(summoner!.puuid, 20)
  })

  if (statusSummoner === "pending") return <h1>Loading Summoner...</h1>
  if (statusSummoner=== "error") return <h1>{JSON.stringify(errorSummoner)}</h1>

  return (
    <>
      <SummonerCard summoner={summoner} />

      { statusMatchIds === "success" ? matchIds.map((matchId: string) => (
        <MatchCard key={matchId} puuid={summoner.puuid} matchId={matchId} />
      )): null}
    </>
  );
}

export default SummonerPage;