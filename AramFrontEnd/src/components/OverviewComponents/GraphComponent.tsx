import { useState } from 'react'
import { Timeline } from '../../types'


interface GraphComponentProps {
    timeline: Timeline
    puuid: string
}

function GraphComponent(props: GraphComponentProps) {
  
    const [focusIndex, setFocusIndex]= useState<number|null>(null);
    const [damageArrays, setDamageArrays]=useState<number[][]>([]);


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
  

    return (
    <div>GraphComponent</div>
  )

}

export default GraphComponent
