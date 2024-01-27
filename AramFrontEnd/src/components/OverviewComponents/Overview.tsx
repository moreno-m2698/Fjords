import { useOutletContext, useParams } from 'react-router-dom'
import { useQuery } from "@tanstack/react-query"
import { getMatchIdsByPuuid, getSummonerByRiotId } from '../../services/backendApiCalls';
import SummonerCard from './SummonerCard';
import MatchDataContainer from './MatchDataContainer';
import { Button } from '@mui/material';
import '../../CSS/accountSummary.css'
//IMPORTANT: Somthing is happening where we are making the query calls twice

//React query still causes us to download imgs to client on each call, maybe we should try hosting assets in a repo instead.

interface AccountParams {
  gameName: string,
  tagline: string
}

function Overview() {
    const params = useParams();
    console.log("Inside the SummonerPage tagline: " + params.tagLine);
    const matchLength = 20;
  
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
      isLoading: matchIdsIsLoading,
      data: matchIds,
      refetch: matchIdsRefetch
    } = useQuery({
      enabled: summoner?.puuid != null,
      queryKey: ["matchIds", summoner?.puuid],
      queryFn: () => getMatchIdsByPuuid(summoner!.puuid, matchLength)
    });
  
    const handleMatchIdsRefresh = () => {
      if (!matchIdsIsLoading) {
        console.log("refetching matches")
        matchIdsRefetch();
      }
    }
    

    if (statusSummoner === "pending") return <h1>Loading Summoner...</h1>
    if (statusSummoner=== "error") return <h1>There was an Error Grabbing Summoner</h1>

    return ( 
      <> 
        <section className = 'account__summary'>
          <SummonerCard summoner={summoner!} />
          <Button
            variant="contained"
            disabled={ matchIdsIsLoading}
            onClick={() => handleMatchIdsRefresh()}
          >
            Update
          </Button>
        </section>
        <section className='account__matches'>
          { statusMatchIds === "success" ? <MatchDataContainer matchIds={matchIds!} puuid={summoner!.puuid}/>: null}
        </section>
      </>
    );
}

export default Overview