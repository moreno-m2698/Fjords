import { getMatchByMatchId } from '../../services/backendApiCalls';
import { useQuery } from "@tanstack/react-query"
import { getChampionAsset } from '../../services/assetApiCalls';

interface MatchCardProps {
    puuid: string,
    matchId: string
}

function MatchCard(props: MatchCardProps) {

    // const [championAssetUrl, setChampionAssetUrl] = useState<string>("");
    // const [itemAssetUrls, setItemAssetUrls] = useState<string[]>([]);

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
    //I think i need to make a query for each item....

    // useEffect(
    //     () => {
    //         const fetchData = async () => {
    //             const participant: matchParticipant = match!.info.participants[playerIndex!];
    //             const championSquareEp: string = participant.championName;
    //             const championAssetUrl = await getChampionAsset(championSquareEp);
    //             setChampionAssetUrl(championAssetUrl);
    //             let itemIds: number[] = [
    //                 participant.item0,
    //                 participant.item1,
    //                 participant.item2,
    //                 participant.item3,
    //                 participant.item4,
    //                 participant.item5,
    //                 participant.item6,
    //             ].filter(element => element != 0);
    //             const itemUrls = await Promise.all(itemIds.map(itemId => getItemAssetPromise(itemId)));
    //             setItemAssetUrls(itemUrls);
    //         }
    //         fetchData();
    //     },
    //     [playerIndex]
    // );

    if (statusMatch==="pending" || playerIndex === undefined || puuidList === undefined) return <h1>Loading Match... {props.matchId}</h1>
    if (statusMatch==="error") return <h1>{JSON.stringify(errorMatch)}</h1>


  return (
    <div>
            <h1>{props.matchId}</h1>
            <p>KDA: {match?.info.participants[playerIndex].kills}/{match?.info.participants[playerIndex].deaths}/{match?.info.participants[playerIndex].assists}</p>
            <h2>Champion:</h2>
            <p>Id: {match?.info.participants[playerIndex!].championId}</p>
            <p>Name: {match?.info.participants[playerIndex!].championName}</p>
            <img alt="Champion Image" src={championAssetUrl}/>
            <p>Win: {match?.info.participants[playerIndex!].win ? 'true' : 'false'}</p>
            {/* <h2>Items:</h2>
            <ol>
                { itemAssetUrls.map(assetURl => <img src={assetURl}/>) }
            </ol> */}
    </div>
  );
}

export default MatchCard;