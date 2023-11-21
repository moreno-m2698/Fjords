import { useState, useEffect } from 'react';
import { Summoner } from '../../types';
import { AxiosResponse } from 'axios';
import { getSummonerDataByName } from '../../api/backendApiCalls';
import SummonerCard from './SummonerCard';
import MatchCard from './MatchCard';

interface OverviewProps {
  summonerName: string
}

function Overview(props:OverviewProps) {

  const [summoner, setSummmoner] = useState<Summoner|null>(null)
  useEffect(
    () => {
      const fetchData = async () => {
        const response: AxiosResponse<any, any> | undefined = await getSummonerDataByName(props.summonerName);
        const data: Summoner = response?.data;
        setSummmoner(data);
      }

      fetchData()
      return () => alert('Goodbye summoner component')
    },
    []
  )

  return (
    <>
      <div>OverviewContextComponents</div>
      <SummonerCard summoner={summoner!} />
      <MatchCard puuid={summoner?.puuid}/>
    </>
  )
}

export default Overview