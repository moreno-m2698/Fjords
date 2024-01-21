
import { LineChart, Line, XAxis, YAxis, CartesianGrid,Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { getMatchTimelineByMatchId } from '../../services/backendApiCalls';


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

    //We will need to look at these graphs later

    return (
        <div>
            <LineChart width={600} height={300} data={timeline[props.puuid]}>
                <Line type="monotone" dataKey="damageDone" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
            </LineChart>
            <LineChart width={600} height={300} data={timeline[props.puuid]}>
                <Line type="monotone" dataKey="damageTaken" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
            </LineChart>
            <LineChart width={600} height={300} data={timeline[props.puuid]}>
                <Line type="monotone" dataKey="gold" stroke="#8884d8" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
            </LineChart>
        </div>
    )

}

export default GraphComponent
