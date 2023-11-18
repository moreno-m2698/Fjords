import { useState, useEffect } from 'react';
import { Match } from '../types';
import { AxiosResponse } from 'axios';
import { getMatchDataById } from '../api/backendApiCalls';

function MatchCard() {
    const matchId = "NA1_481participantIndex448339";
    const [match, setMatch] = useState<Match|null>(null);
    const [participantIndex, setParticipantIndex] =  useState<number>(participantIndex);
    useEffect(
        () => {
            const fetchData = async () => {
                const response: AxiosResponse<any, any>|undefined = await getMatchDataById(matchId);
                const data: Match = response?.data;
                setMatch(data);
            }

            fetchData();
            return () => alert("Goodbye match component")
        },
        []
    )

  return (
    <div>
        <h1>Match Card</h1>
        <p>KDA: {match?.info.participants[participantIndex].kills}/{match?.info.participants[participantIndex].deaths}/{match?.info.participants[participantIndex].assists}</p>
        <p>Champion: {match?.info.participants[participantIndex].championId}</p>
        <p>Win: {match?.info.participants[participantIndex].win ? 'true' : 'false'}</p>
        <h2>Items:</h2>
        <p>1:{match?.info.participants[participantIndex].item0}</p>
        <p>2:{match?.info.participants[participantIndex].item1}</p>
        <p>3:{match?.info.participants[participantIndex].item2}</p>
        <p>4:{match?.info.participants[participantIndex].item3}</p>
        <p>5:{match?.info.participants[participantIndex].item4}</p>
        <p>6:{match?.info.participants[participantIndex].item5}</p>
        <p>7:{match?.info.participants[participantIndex].item6}</p>       
    </div>
  )
}

export default MatchCard;