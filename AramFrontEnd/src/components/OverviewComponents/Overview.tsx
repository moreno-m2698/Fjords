import { useOutletContext, useParams } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query"
import { getMatchIdsByPuuid, getSummonerByRiotId } from '../../services/backendApiCalls';
import SummonerCard from './SummonerCard';
import MatchDataContainer from './MatchDataContainer';

//IMPORTANT: Somthing is happening where we are making the query calls twice

//React query still causes us to download imgs to client on each call, maybe we should try hosting assets in a repo instead.

interface AccountParams {
  gameName: string,
  tagline: string
}

function Overview() {
    const params = useParams();
    console.log("Inside the SummonerPage tagline: " + params.tagLine);
    const matchLength = 5;
  
    const {
      status: statusSummoner,
      error: errorSummoner,
      data: summoner
    } = useQuery({
      queryKey: ["account", params.gameName, params.tagLine],
      queryFn: () => getSummonerByRiotId(params.gameName!, params.tagLine!)
    }); 
  
    const { 
      status: statusMatchIds,
      data: matchIds
    } = useQuery({
      enabled: summoner?.puuid != null,
      queryKey: ["matchIds", summoner?.puuid],
      queryFn: () => getMatchIdsByPuuid(summoner!.puuid, matchLength)
    });
  
    if (statusSummoner === "pending") return <h1>Loading Summoner...</h1>
    if (statusSummoner=== "error") return <h1>{JSON.stringify(errorSummoner)}</h1>
    //keep ths log here until we figure out the double render
    console.log(matchIds);
    return (
     
      <> 
        <section className = 'account__summary'>
          <SummonerCard summoner={summoner!} />
        </section>
        <section className='account__matches'>
          { statusMatchIds === "success" ? <MatchDataContainer matchIds={matchIds!} puuid={summoner!.puuid}/>: null}
        </section>
      </>
    );
}

export default Overview