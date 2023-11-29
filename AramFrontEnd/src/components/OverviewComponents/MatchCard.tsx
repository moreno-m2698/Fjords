import { getMatchByMatchId } from '../../services/backendApiCalls';
import { useQuery } from "@tanstack/react-query"
import { getChampionAsset, getItemAssetFromItemId } from '../../services/assetApiCalls';
import InventoryComponent from './InventoryComponent';

interface MatchCardProps {
    puuid: string,
    matchId: string
}

function MatchCard(props: MatchCardProps) {

    const {
        status: statusMatch,
        error: errorMatch,
        data: match 
    } = useQuery({
        queryKey: ["match", props.matchId],
        queryFn: () => getMatchByMatchId(props.matchId)

    })

    const puuidList = match?.metadata.participants;
    const playerIndex = puuidList?.indexOf(props.puuid!);
    const {
        status: statusChampionAssetUrl,
        error: errorChampionAssetUrl,
        data: championAssetUrl
    } = useQuery({
        enabled: playerIndex !== undefined && puuidList !== undefined && match?.info.participants[playerIndex].championName !== undefined,
        queryKey: ["championAsset", match?.info.participants[playerIndex!].championName],
        queryFn: () => getChampionAsset(match!.info.participants[playerIndex!].championName)
    })

    if (statusMatch==="pending" || playerIndex === undefined || puuidList === undefined) return <h1>Loading Match... {props.matchId}</h1>
    if (statusMatch==="error") return <h1>{JSON.stringify(errorMatch)}</h1>

    const items = [
        match?.info.participants[playerIndex].item0!,
        match?.info.participants[playerIndex].item1!,
        match?.info.participants[playerIndex].item2!,
        match?.info.participants[playerIndex].item3!,
        match?.info.participants[playerIndex].item4!,
        match?.info.participants[playerIndex].item5!,
        match?.info.participants[playerIndex].item6!,
    ].filter((itemId) => itemId !== 0);
    console.log(items);

  return (
    <div>
            <h1>{props.matchId}</h1>
            <p>KDA: {match?.info.participants[playerIndex].kills}/{match?.info.participants[playerIndex].deaths}/{match?.info.participants[playerIndex].assists}</p>
            <h2>Champion:</h2>
            <p>Name: {match?.info.participants[playerIndex!].championName}</p>
            <img alt="Champion Image" src={championAssetUrl}/>
            <p>Win: {match?.info.participants[playerIndex!].win ? 'true' : 'false'}</p>
            <InventoryComponent inventory={items} />
            {/* <h2>Items:</h2>
            <ol>
                { itemAssetUrls.map(assetURl => <img src={assetURl}/>) }
            </ol> */}
    </div>
  );
}

export default MatchCard;