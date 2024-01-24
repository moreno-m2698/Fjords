import { getMatchTimelineByMatchId } from '../../services/backendApiCalls';
import { useQuery } from "@tanstack/react-query"
import { getAsset } from '../../services/assetApiCalls';
import InventoryComponent from './InventoryComponent';
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { MatchParticipant } from '../../types';
import GraphOrganizer from './GraphOrganizer';
import { useState } from 'react';


interface MatchCardProps {
    puuid: string,
    matchId: string
    matchParticipant: MatchParticipant
}

function MatchCard(props: MatchCardProps) {

    const [hasBeenClicked, setHasBeenClicked] = useState<boolean>(false);
    

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


    const {
        status: statusTimeline,
        error: errorTimeline,
        data: timeline,
        refetch: refetchTimeline,
        isLoading: isTimelineLoading
    } = useQuery({
        enabled: false,
        queryKey: ["timeline", props.matchId],
        queryFn: () => getMatchTimelineByMatchId(props.matchId)
    })

    const accordionOnClick = () => {
        if (!hasBeenClicked) {
            setHasBeenClicked(true);    
            refetchTimeline();
            console.log("fetching timeline")
        }
    }


  return (
    <li>
        <article>
            <Accordion
                onChange={accordionOnClick}
            >
                <AccordionSummary expandIcon={<ExpandMoreIcon />} className="domain-expansion">   
                    <img className="champion__asset"alt="Champion Image" src={championAssetUrl}/>
                    <p>Level: {props.matchParticipant.champLevel}</p>
                    <p>KDA: {props.matchParticipant?.kills}/{props.matchParticipant?.deaths}/{props.matchParticipant?.assists}</p>
                    <InventoryComponent inventory={items} />
                </AccordionSummary>
                <AccordionDetails>
                    
                    {(statusTimeline ==="pending" || statusTimeline==="error" || timeline === undefined) ? <h1>Trying timeline</h1> :
                    
                    (isTimelineLoading ? (
                        <p>Timeline is Loading</p>
                    ) : (
                        <GraphOrganizer timeline={timeline} puuid={props.puuid} matchId={props.matchId} />
                    ))}
                    
                </AccordionDetails>
            </Accordion>
        </article>
    </li>
  );
}

export default MatchCard;