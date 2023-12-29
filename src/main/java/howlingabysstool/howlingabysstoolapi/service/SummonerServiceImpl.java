package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.configuration.YamlConfig;
import howlingabysstool.howlingabysstoolapi.domain.RiotAccount;
import howlingabysstool.howlingabysstoolapi.domain.Summoner;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Log4j2
public class SummonerServiceImpl implements SummonerService{
    @Autowired
    private YamlConfig myConfig;

    private final String SUMMONER_URL = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/";
    private final RiotAccountService riotAccountService;
    private final RestTemplate restTemplate;

    public SummonerServiceImpl(RestTemplate restTemplate, RiotAccountService riotAccountService) {
        this.restTemplate = restTemplate;
        this.riotAccountService = riotAccountService;

    }
    @Override
    public Summoner getSummonerByPuuid(String puuid) {
        String fullApiUrl = SUMMONER_URL + "by-puuid/" + puuid + "?api_key="+ myConfig.getRiotApi();
        return restTemplate.getForObject(fullApiUrl, Summoner.class);
    }
    @Override
    public Summoner getSummonerByRiotId(String gameName, String tagLine) {
        RiotAccount riotAccount = riotAccountService.getRiotAccountByRiotId(gameName, tagLine);
        String accountPuuid = riotAccount.getPuuid();
        return getSummonerByPuuid(accountPuuid);

    }

}
