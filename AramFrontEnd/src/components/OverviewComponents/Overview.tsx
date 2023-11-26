import { useState, useEffect } from 'react';
import { Summoner } from '../../types';
import { AxiosResponse } from 'axios';
import { getMatchIdsByPuuid, getSummonerDataByName } from '../../api/backendApiCalls';
import SummonerCard from './SummonerCard';
import MatchCard from './MatchCard';

interface OverviewProps {
  summonerName: string
}

function Overview(props:OverviewProps) {
  const [summoner, setSummmoner] = useState<Summoner|null>(null);
  const [matchIdList, setMatchIdList] = useState<string[]>([]);
  useEffect(
    () => {
      const fetchData = async () => {
        const response: AxiosResponse<any, any> | undefined = await getSummonerDataByName(props.summonerName);
        const data: Summoner = response?.data;
        setSummmoner(data);
        const matchIds: AxiosResponse<any,any> | undefined = await getMatchIdsByPuuid(data.puuid, 5);
        const idData: string[] = matchIds?.data;
        setMatchIdList(idData);
      }

      fetchData();
      return () => alert('Goodbye summoner overview');
    },
    []
  );

  return (
    <>
      <div>OverviewContextComponents</div>
      {/* These ternaries are safeguarding our ability to grab assets so there must be a solution that i need to implement in the useEffect, likely need to return a skeleton object in my calls*/}
      { summoner ? <SummonerCard summoner={summoner} /> : null }
      { summoner ? matchIdList.map((matchId) => <MatchCard key={matchId} puuid={summoner.puuid} matchId={matchId}/>) : null}
    </>
  );
}

export default Overview;