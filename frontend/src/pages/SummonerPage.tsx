import Searchbar from '../components/OverviewComponents/Searchbar';
import Overview from '../components/OverviewComponents/Overview';


//IMPORTANT: Somthing is happening where we are making the query calls twice

//React query still causes us to download imgs to client on each call, maybe we should try hosting assets in a repo instead.

function SummonerPage() {
  return (
    <> 
      <Searchbar />
      <Overview />
    </>
  );
}

export default SummonerPage;