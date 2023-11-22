import { useState, useEffect } from 'react';
import { Match, matchParticipant } from '../../types';
import { AxiosResponse } from 'axios';
import { getMatchDataById } from '../../api/backendApiCalls';
import { getChampionAsset, getItemAssetPromise } from '../../api/assetApiCalls';

interface MatchCardProps {
    puuid?: string
}

function MatchCard(props: MatchCardProps) {
    const matchId = "NA1_4810448339";
    const [match, setMatch] = useState<Match|null>(null);
    const [participantIndex, setParticipantIndex] =  useState<number>(0);
    const [championAssetUrl, setChampionAssetUrl] = useState<string>("");
    const [itemAssetUrls, setItemAssetUrls] = useState<string[]>([]);
    useEffect(
        () => {
            const fetchData = async () => {
                const response: AxiosResponse<any, any>|undefined = await getMatchDataById(matchId);
                const data: Match = response?.data;
                setMatch(data);
                const puuidList: string[] = data.metadata.participants;
                const playerIndex: number = puuidList.indexOf(props.puuid!);
                setParticipantIndex(playerIndex);

                
                
            }

            fetchData();
            return () => {
                alert("Goodbye match component");
                URL.revokeObjectURL(championAssetUrl);
                itemAssetUrls.map(itemUrl => URL.revokeObjectURL(itemUrl));
            }
        },
        []
    )
    useEffect(
        () => {
            const fetchData = async () => {
                const participant: matchParticipant = match!.info.participants[participantIndex];
                const championSquareEp: string = participant.championName;
                const championAssetUrl = await getChampionAsset(championSquareEp);
                setChampionAssetUrl(championAssetUrl);
                let itemIds: number[] = [
                    participant.item0,
                    participant.item1,
                    participant.item2,
                    participant.item3,
                    participant.item4,
                    participant.item5,
                    participant.item6,
                ];
                itemIds = itemIds.filter(element => element != 0);
                const itemUrls = await Promise.all(itemIds.map(itemId => getItemAssetPromise(itemId)));
                setItemAssetUrls(itemUrls);
            }
            fetchData();
        },
        [participantIndex]
    )

  return (
    <div>
        <h1>Match Card</h1>
        <p>KDA: {match?.info.participants[participantIndex].kills}/{match?.info.participants[participantIndex].deaths}/{match?.info.participants[participantIndex].assists}</p>
        <h2>Champion:</h2>
        <p>Id: {match?.info.participants[participantIndex].championId}</p>
        <p>Name: {match?.info.participants[participantIndex].championName}</p>
        <img alt="Champion Image" src={championAssetUrl}/>
        {/* Fiddlesticks comes out as FiddleSticks thus we need logic to make sure that the end points are lining up for the images to show correctly | This issue will likely be same for void champions*/}
        <p>Win: {match?.info.participants[participantIndex].win ? 'true' : 'false'}</p>
        <h2>Items:</h2>
        <ol>
            {itemAssetUrls.map(assetURl => <img src={assetURl}/>)}
        </ol>
    </div>
  )
}

export default MatchCard;