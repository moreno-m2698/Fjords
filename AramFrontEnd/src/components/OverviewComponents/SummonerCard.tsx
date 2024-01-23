import { Summoner } from "../../types";
import { getAsset } from "../../services/assetApiCalls";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@mui/material";


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
      <div className="account-profile-icon grid-row-span-3" >
        <img alt="Riot account icon" src={profileAsset} />
      </div>
      <div className="account-name">
        <h2 className="text-align-left">
          <span className="visually-hidden aria-only">
            Account Name:&nbsp;
          </span>
          <span>
            {props.summoner?.name}&nbsp;
          </span>
          <span>
            #{props.summoner?.tagline}
          </span>
        </h2>
      </div>
      <div className="account-level">
        <p className="text-align-left">
          <span aria-label="Level">
            Lvl: 
          </span>{props.summoner?.summonerLevel}
        </p>
      </div>
    </>
  );
}


export default SummonerCard;