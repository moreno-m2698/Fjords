import { useState, useEffect } from "react";
import { Summoner } from "../../types";
import { getProfileIconAsset } from "../../api/assetApiCalls";

interface summonerCardProps {
  summoner: Summoner
}

//This is making correct call but talk to marcel about what i can do
function SummonerCard(props: summonerCardProps) {
  
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const profileIconId = props.summoner.profileIconId;
      const profileIconAssetUrl = await getProfileIconAsset(profileIconId);
      setProfileImageUrl(profileIconAssetUrl);
    }
    fetchData();
    return () => {
      //alert("Goodbye summoner card")
      URL.revokeObjectURL(profileImageUrl);
    };
  }, []
  );
  

  return (
    <div className="summmoner">
      <h1>Summoner Card</h1>
      <p>Name:{props.summoner?.name}</p>
      <p>Lvl:{props.summoner?.summonerLevel}</p>
      <h2>Icon info:</h2>
      <p>Id:{props.summoner?.profileIconId}</p>
      <img alt="Summoner Icon" src={profileImageUrl} />
    </div>
  );
}


export default SummonerCard;