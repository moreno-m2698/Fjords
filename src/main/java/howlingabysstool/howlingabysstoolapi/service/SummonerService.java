package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.domain.Summoner;

public interface SummonerService {
    public Summoner getSummonerByName(String name);
    public Summoner getSummonerByPuuid(String puuid);
    public Summoner getSummonerByRiotId(String gameName, String tagLine);


}
