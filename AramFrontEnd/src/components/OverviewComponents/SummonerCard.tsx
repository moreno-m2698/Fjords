import { Summoner } from "../../types";
import { getAsset } from "../../services/assetApiCalls";
import { useQuery } from "@tanstack/react-query";


interface summonerCardProps {
  summoner: Summoner
}

function SummonerCard(props: summonerCardProps) {

  const {
    status: statusProfileAsset,
    error: errorProfileAsset,
    data: profileAsset
  } = useQuery({
    queryKey: ["profileAsset", props.summoner.profileIconId],
    queryFn: () => getAsset(props.summoner.profileIconId.toString(), "profileicon")
  })

  if (statusProfileAsset === "pending") return <h1>Loading Profile...</h1>
  if (statusProfileAsset === "error") return <h1>Error: {JSON.stringify(errorProfileAsset)}</h1>

  return (
    <>
      <h1>Name: {props.summoner?.name}</h1>
      <h2>Tagline: #{props.summoner?.tagline}</h2>
      <h3>Lvl:{props.summoner?.summonerLevel}</h3>
      <img alt="Riot account icon" src={profileAsset} />
    </>
  );
}


export default SummonerCard;