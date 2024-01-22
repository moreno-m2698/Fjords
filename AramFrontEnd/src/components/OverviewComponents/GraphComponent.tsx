
import { LineChart, Line, XAxis, YAxis, CartesianGrid,Tooltip, ResponsiveContainer } from 'recharts';
import { useQuery } from "@tanstack/react-query";
import { getMatchTimelineByMatchId } from '../../services/backendApiCalls';
import { FjordTimeline } from '../../types';


interface GraphComponentProps {

    matchId: string
    puuid: string
    timeline: FjordTimeline
    datakey: string
}

function GraphComponent(props: GraphComponentProps) {


    return (
            <ResponsiveContainer>
                <LineChart width={600} height={300} data={props.timeline[props.puuid]}>
                    <Line type="monotone" dataKey={props.datakey} stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="timestamp" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
    )

}

export default GraphComponent
