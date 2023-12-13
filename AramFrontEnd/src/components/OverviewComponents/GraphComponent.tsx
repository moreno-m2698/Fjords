import { useState } from 'react'
import { FjordFrame } from '../../types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { getMatchTimelineByMatchId } from '../../services/backendApiCalls';
import { time } from 'console';


interface GraphComponentProps {

    matchId: string
    puuid: string
}

function GraphComponent(props: GraphComponentProps) {

    const {
        status: statusTimeline,
        error: errorTimeline,
        data: timeline
    } = useQuery({
        queryKey: ["timeline", props.matchId],
        queryFn: () => getMatchTimelineByMatchId(props.matchId)
    })

    
    if (statusTimeline ==="pending" || statusTimeline==="error" || timeline === undefined) return <h1>Trying timeline</h1>
    

    console.log("Within Graph Component");
    console.log("Timeline call" + timeline); //object Object
    console.log(timeline[props.puuid]);
    



    return (
        <>
            <div>GraphComponent</div>
        </>
    )

}

export default GraphComponent
