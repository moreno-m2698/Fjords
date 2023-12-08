import { useState } from 'react'
import { Timeline } from '../../types'
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';


interface GraphComponentProps {
    timeline: Timeline //Need to add null eventually
    puuid: string
}

function GraphComponent(props: GraphComponentProps) {
  
    const [focusIndex, setFocusIndex]= useState<number|null>(null);
    const [damageArrays, setDamageArrays]=useState<number[][]>([]);

    //Need to do some kind of null check for when component exists before timeline query
    //Probably solved by using lazy loading

  const findMainParticipantIndex = () => {
    const partipants = props.timeline.participants;
    let i = 0;
    let mainPlayerIndex = null;
    while ( i < partipants.length || mainPlayerIndex == null) {
        if ( partipants[i].puuid == props.puuid) {
            mainPlayerIndex = partipants[i].participantId;
        }
        i++;
    }

    if (mainPlayerIndex == null) {
        console.log("Could not identify player in timeline")
    } else {
        setFocusIndex(mainPlayerIndex);
    }

  }

  //TODO: turn all of these into mapping functions and maybe try a more generic approach

  const findTimestamps = () => {
    const frames = props.timeline.frames;
    const timestamps = frames.map( frame => {
        return frame.timestamp;
    })
    return timestamps;
  }

  const findDamageDoneStats = (index: number) => {
    const frames = props.timeline.frames;
    const damageDoneOverTime = frames.map((frame)=>{
        const particpantFrame = frame.participantFrames.get(index.toString());
        const damage = particpantFrame?.damageStats.totalDamageDoneToChampions;
        return damage;
    })
    return damageDoneOverTime;
  }

  const findDamageTakenStats = (index: number) => {
    const frames = props.timeline.frames;
    const damageTakenOverTime = frames.map((frame)=>{
        const particpantFrame = frame.participantFrames.get(index.toString());
        const damage = particpantFrame?.damageStats.totalDamageTaken;
        return damage;
    })
    return damageTakenOverTime;
  }

  const findGoldStats = (index: number) => {
    const frames = props.timeline.frames;
    const goldOverTime = frames.map((frame)=>{
        const particpantFrame = frame.participantFrames.get(index.toString());
        const gold = particpantFrame?.totalGold;
        return gold;
    })
    return goldOverTime;
  }
  

  //data = {puuid: [{name/timestamp: ,damagedone: , damagetaken: , gold: }, ... ], ... }

    return (
        <>
            <div>GraphComponent</div>
            <LineChart width={600} height={600} >
                <Line type="monotone" dataKey="damagedDone" stroke="#8884d8" />
                <CartesianGrid stroke = "#ccc" />
                <XAxis dataKey="timestamp" />
                <YAxis />
            </LineChart>
        </>
    )

}

export default GraphComponent
