import { getMatchParticipant ,getMatchTimelineByMatchId } from '../../services/backendApiCalls';
import { useQuery } from "@tanstack/react-query"
import { getAsset } from '../../services/assetApiCalls';
import InventoryComponent from './InventoryComponent';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import GraphComponent from './GraphComponent';
import { MatchParticipant } from '../../types';


interface MatchCardProps {
    puuid: string,
    matchId: string
    matchParticipant: MatchParticipant
}

function MatchCard(props: MatchCardProps) {

    const {
        status: statusMatch,
        error: errorMatch,
        data: matchParticipant 
    } = useQuery({
        queryKey: ["match", props.matchId],
        queryFn: () => getMatchParticipant(props.puuid, props.matchId)

    })


    const {
        status: statusChampionAssetUrl,
        error: errorChampionAssetUrl,
        data: championAssetUrl
    } = useQuery({
        enabled: matchParticipant?.championName !== undefined,
        queryKey: ["championAsset", matchParticipant?.championName],
        queryFn: () => getAsset(matchParticipant!.championName, "champion")
    })

    

    if (statusMatch==="pending") return <h1>Loading Match... {props.matchId}</h1>
    if (statusMatch==="error") return <h1>{JSON.stringify(errorMatch)}</h1>
    

    const items = [
        props.matchParticipant?.item0!,
        props.matchParticipant?.item1!,
        props.matchParticipant?.item2!,
        props.matchParticipant?.item3!,
        props.matchParticipant?.item4!,
        props.matchParticipant?.item5!,
        props.matchParticipant?.item6!,
    ].filter((itemId) => itemId !== 0);
    console.log(items);


  return (
    <div>

            
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>
                        <h1>{props.matchId}</h1>
                            <p>KDA: {matchParticipant?.kills}/{matchParticipant?.deaths}/{matchParticipant?.assists}</p>
                            <h2>Champion:</h2>
                            <p>Name: {matchParticipant?.championName}</p>
                            <img alt="Champion Image" src={championAssetUrl}/>
                            <p>Win: {matchParticipant?.win ? 'true' : 'false'}</p>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <InventoryComponent inventory={items} />
                    <GraphComponent puuid={props.puuid} matchId={props.matchId} />
                </AccordionDetails>
            </Accordion>
    </div>
  );
}

export default MatchCard;