import { useState } from 'react'
import { Button } from '@mui/material'
import GraphComponent from './GraphComponent';

interface GraphOrganizerProps {
    matchId: string
    puuid: string
    timeline: any
}

function GraphOrganizer(props:GraphOrganizerProps) {

    const [dataKey, setDataKey] = useState<string>('damageDone')


    const DATAKEYS = ['damageDone', 'damageTaken', 'gold']

    const changeDataKey = (index: number) => {
        setDataKey(DATAKEYS[index]);
    }

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
                <GraphComponent timeline={props.timeline} puuid={props.puuid} matchId={props.matchId} datakey={dataKey}/>
            </div>
        </>
    )
}

export default GraphOrganizer