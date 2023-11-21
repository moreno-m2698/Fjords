import { useState, useEffect } from 'react';
import { Match } from '../../types';
import { AxiosResponse } from 'axios';
import { getMatchDataById } from '../../api/backendApiCalls';
import { getChampionSquare } from '../../api/assetApiCalls';

interface MatchCardProps {
    puuid?: string
}

function MatchCard(props: MatchCardProps) {
    const matchId = "NA1_4810448339";
    const [match, setMatch] = useState<Match|null>(null);
    const [participantIndex, setParticipantIndex] =  useState<number>(0);
    const [asset, setAsset] = useState<any|null>(null);
    useEffect(
        () => {
            const fetchData = async () => {
                const response: AxiosResponse<any, any>|undefined = await getMatchDataById(matchId);
                const data: Match = response?.data;
                setMatch(data);
                const puuidList: string[] = data.metadata.participants;
                const playerIndex = puuidList.indexOf(props.puuid!);
                setParticipantIndex(playerIndex);

                const championSquareEp: string = data.info.participants[participantIndex].championName;
                const assetURL = await getChampionSquare(championSquareEp);
                setAsset(assetURL);
                
            }

            fetchData();
            return () => {
                alert("Goodbye match component");
                URL.revokeObjectURL(asset);
            }
        },
        []
    )

  return (
    <div>
        <h1>Match Card</h1>
        <p>KDA: {match?.info.participants[participantIndex].kills}/{match?.info.participants[participantIndex].deaths}/{match?.info.participants[participantIndex].assists}</p>
        <h2>Champion:</h2>
        <p>Id: {match?.info.participants[participantIndex].championId}</p>
        <p>Name: {match?.info.participants[participantIndex].championName}</p>
        <img alt="Champion Image" src={asset}/>
        {/* Fiddlesticks comes out as FiddleSticks thus we need logic to make sure that the end points are lining up for the images to show correctly | This issue will likely be same for void champions*/}
        <p>Win: {match?.info.participants[participantIndex].win ? 'true' : 'false'}</p>
        <h2>Items:</h2>
        <p>1:{match?.info.participants[participantIndex].item0}</p>

        <p>2:{match?.info.participants[participantIndex].item1}</p>
        <p>3:{match?.info.participants[participantIndex].item2}</p>
        <p>4:{match?.info.participants[participantIndex].item3}</p>
        <p>5:{match?.info.participants[participantIndex].item4}</p>
        <p>6:{match?.info.participants[participantIndex].item5}</p>
        <p>7:{match?.info.participants[participantIndex].item6}</p>
        <p>HELLO</p>
    </div>
  )
}

export default MatchCard;