import { Summoner } from "../../types";
import { getProfileIconAsset, getAsset } from "../../services/assetApiCalls";
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

  if (statusProfileAsset==="pending") return <h1>Loading Profile...</h1>
  if (statusProfileAsset === "error") return <h1>Error: {JSON.stringify(errorProfileAsset)}</h1>

  return (
    <div className="summmoner">
      <h1>Summoner Card</h1>
      <p>Name:{props.summoner?.name}</p>
      <p>Lvl:{props.summoner?.summonerLevel}</p>
      <img alt="Summoner Icon" src={profileAsset} />
    </div>
  );
}


export default SummonerCard;