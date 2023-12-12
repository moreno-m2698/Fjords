import { getMatchByMatchId, getMatchTimelineByMatchId } from '../../services/backendApiCalls';
import { useQuery } from "@tanstack/react-query"
import { getAsset } from '../../services/assetApiCalls';
import InventoryComponent from './InventoryComponent';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

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
        queryFn: () => getAsset(match!.info.participants[playerIndex!].championName, "champion")
    })

    const {
        status: statusTimeline,
        error: errorTimeline,
        data: timeline
    } = useQuery({
        queryKey: ["timeline", props.matchId],
        queryFn: () => getMatchTimelineByMatchId(props.matchId)
    })

    if (statusMatch==="pending" || playerIndex === undefined || puuidList === undefined) return <h1>Loading Match... {props.matchId}</h1>
    if (statusMatch==="error") return <h1>{JSON.stringify(errorMatch)}</h1>
    if (statusTimeline ==="pending" || statusTimeline==="error") return <h1>Trying timeline</h1>
    console.log(timeline)

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

            
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        <h1>{props.matchId}</h1>
                            <p>KDA: {match?.info.participants[playerIndex].kills}/{match?.info.participants[playerIndex].deaths}/{match?.info.participants[playerIndex].assists}</p>
                            <h2>Champion:</h2>
                            <p>Name: {match?.info.participants[playerIndex!].championName}</p>
                            <img alt="Champion Image" src={championAssetUrl}/>
                            <p>Win: {match?.info.participants[playerIndex!].win ? 'true' : 'false'}</p>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <InventoryComponent inventory={items} />
                </AccordionDetails>
            </Accordion>
    </div>
  );
}

export default MatchCard;