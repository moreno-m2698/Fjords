import { useState } from 'react'
import { Button } from '@mui/material'
import { useQuery } from "@tanstack/react-query";
import { getMatchTimelineByMatchId } from '../../services/backendApiCalls';
import GraphComponent from './GraphComponent';

interface GraphOrganizerProps {
    matchId: string
    puuid: string
}

function GraphOrganizer(props:GraphOrganizerProps) {

    const [dataKey, setDataKey] = useState<string>('damageDone')

    const {
        status: statusTimeline,
        error: errorTimeline,
        data: timeline
    } = useQuery({
        queryKey: ["timeline", props.matchId],
        queryFn: () => getMatchTimelineByMatchId(props.matchId)
    })

    const DATAKEYS = ['damageDone', 'damageTaken', 'gold']

    const changeDataKey = (index: number) => {
        setDataKey(DATAKEYS[index]);
    }


    if (statusTimeline ==="pending" || statusTimeline==="error" || timeline === undefined) return <h1>Trying timeline</h1>

    return (
        <>
            <div className='organizer-tabs'>
                <Button
                    variant='contained'
                    onClick={() => changeDataKey(0)}
                >
                    Attack Damage
                </Button>
                <Button
                    variant='contained'
                    onClick={() => changeDataKey(1)}
                >
                    Damage Taken
                </Button>
                <Button
                    variant='contained'
                    onClick={() => changeDataKey(2)}
                >
                    Gold Earned
                </Button>
            </div>
            <div className='graph-container'>
                <GraphComponent timeline={timeline} puuid={props.puuid} matchId={props.matchId} datakey={dataKey}/>
            </div>
        </>
    )
}

export default GraphOrganizer