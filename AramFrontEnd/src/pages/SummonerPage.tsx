import { useParams } from 'react-router-dom'
import Overview from '../components/OverviewComponents/Overview';
import { useQuery } from 'react-query/types/react';
import { getSummonerDataByNamePromise } from '../services/backendApiCalls';
import SummonerCard from '../components/OverviewComponents/SummonerCard';

function SummonerPage() {
  const { summonerName } = useParams();

  const summonerQuery = useQuery({
    queryKey: ["summoner", summonerName],
    queryFn: () => getSummonerDataByNamePromise(summonerName!)
  }) 

  const matchIdsQuery = useQuery({
    enabled: summonerQuery.data.puuid != null,
    queryKey: ["matchIds", summonerQuery.data.puuid]
  })

  if (summonerQuery.status === "loading") return <h1>Loading Summoner...</h1>
  if (summonerQuery.status === "error") return <h1>{JSON.stringify(summonerQuery.error)}</h1>
  return (
    <>
      <Overview summonerName={summonerQuery.data.name} />
      <SummonerCard summoner={summonerQuery.data} />
      
    </>
  );
}

export default SummonerPage;