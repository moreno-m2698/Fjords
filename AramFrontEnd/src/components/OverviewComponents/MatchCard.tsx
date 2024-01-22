import { getMatchParticipant ,getMatchTimelineByMatchId } from '../../services/backendApiCalls';
import { useQuery } from "@tanstack/react-query"
import { getAsset } from '../../services/assetApiCalls';
import InventoryComponent from './InventoryComponent';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import GraphComponent from './GraphComponent';
import { MatchParticipant } from '../../types';
import GraphOrganizer from './GraphOrganizer';


interface MatchCardProps {
    puuid: string,
    matchId: string
    matchParticipant: MatchParticipant
}

function MatchCard(props: MatchCardProps) {


    const {
        status: statusChampionAssetUrl,
        error: errorChampionAssetUrl,
        data: championAssetUrl
    } = useQuery({
        enabled: props.matchParticipant?.championName !== undefined,
        queryKey: ["championAsset", props.matchParticipant?.championName],
        queryFn: () => getAsset(props.matchParticipant!.championName, "champion")
    })

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
    <li>
        <article>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} className="domain-expansion">   
                    <img className="champion__asset"alt="Champion Image" src={championAssetUrl}/>
                    <p>KDA: {props.matchParticipant?.kills}/{props.matchParticipant?.deaths}/{props.matchParticipant?.assists}</p>
                    <InventoryComponent inventory={items} />
                </AccordionSummary>
                <AccordionDetails>
                    <GraphOrganizer puuid={props.puuid} matchId={props.matchId} />
                </AccordionDetails>
            </Accordion>
        </article>
    </li>
  );
}

export default MatchCard;