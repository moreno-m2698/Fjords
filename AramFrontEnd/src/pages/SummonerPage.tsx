
import { useParams } from 'react-router-dom'
import Overview from '../components/OverviewComponents/Overview';

function SummonerPage() {
  const { summonerName } = useParams();
    console.log(summonerName);
    return (
    <Overview summonerName={summonerName!}/>
  );
}

export default SummonerPage;