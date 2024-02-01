import { getMatchTimelineByMatchId } from '../../services/backendApiCalls';
import { useQuery } from "@tanstack/react-query"
import { getAsset } from '../../services/assetApiCalls';
import InventoryComponent from './InventoryComponent';
import { Accordion, AccordionSummary, AccordionDetails, createTheme, ThemeProvider } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { MatchParticipant } from '../../types';
import GraphOrganizer from './GraphOrganizer';
import { useState } from 'react';
import "../../CSS/matchCard.css"


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

    const blueTheme = createTheme({
        components: {
            MuiAccordion:{
                styleOverrides: {
                    root: {
                        backgroundColor: "#17172e",
                        color: "rgb(240, 230, 210)"

                    }
                }
            },
            MuiAccordionDetails: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#1E282D"
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    text: "rgb(240, 230, 210)"
                }

            }
        }
    })

    const redTheme = createTheme({
        components: {
            MuiAccordion:{
                styleOverrides: {
                    root: {
                        backgroundColor: "#45192b",
                        color: "rgb(240, 230, 210)"
                    }
                }
            },
            MuiAccordionDetails: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#1E282D"
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    text: "rgb(240, 230, 210)"
                }

            }
        }
    })


  return (
    <li>
        <article>
            <ThemeProvider theme={props.matchParticipant.win ? blueTheme: redTheme} >
                <Accordion
                    onChange={accordionOnClick}
                >
                    <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: 'white'}}/>} className="domain-expansion">  
                        <div className='champion__asset'>
                            <div className="champion__asset__img">
                                <img alt="Champion Image" src={championAssetUrl}/>
                            </div>
                            <div className="match-level-container">
                                <p>{props.matchParticipant.champLevel}</p>
                            </div>
                        </div> 
                        <p>KDA:&nbsp;
                            <span>
                                {props.matchParticipant?.kills}&nbsp;
                            </span>/&nbsp;
                            <span>
                                {props.matchParticipant?.deaths}&nbsp;
                            </span>/&nbsp;
                            <span>
                                {props.matchParticipant?.assists}&nbsp;
                            </span></p>
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
            </ThemeProvider>
        </article>
    </li>
  );
}

export default MatchCard;