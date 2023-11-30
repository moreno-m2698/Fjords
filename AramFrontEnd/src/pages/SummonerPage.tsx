import { useParams } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query"
import { getSummonerByName, getMatchIdsByPuuid } from '../services/backendApiCalls';
import SummonerCard from '../components/OverviewComponents/SummonerCard';
import MatchCard from '../components/OverviewComponents/MatchCard';

//IMPORTANT: Somthing is happening where we are making the query calls twice

//React query still causes us to download imgs to client on each call, maybe we should try hosting assets in a repo instead.


function SummonerPage() {
  const { summonerName } = useParams();

  const matchLength = 2;

  const {
    status: statusSummoner,
    error: errorSummoner,
    data: summoner
  } = useQuery({
    queryKey: ["summoner", summonerName],
    queryFn: () => getSummonerByName(summonerName!)
  }) 

  const { 
    status: statusMatchIds,
    data: matchIds
  } = useQuery({
    enabled: summoner?.puuid != null,
    queryKey: ["matchIds", summoner?.puuid],
    queryFn: () => getMatchIdsByPuuid(summoner!.puuid, matchLength)
  })

  if (statusSummoner === "pending") return <h1>Loading Summoner...</h1>
  if (statusSummoner=== "error") return <h1>{JSON.stringify(errorSummoner)}</h1>
  //keep ths log here until we figure out the double render
  console.log(matchIds);
  return (
    <>
      <SummonerCard summoner={summoner!} />

      { statusMatchIds === "success" ? matchIds!.map((matchId: string) => (
        <MatchCard key={matchId} puuid={summoner!.puuid} matchId={matchId} />
      )): null}
    </>
  );
}

export default SummonerPage;