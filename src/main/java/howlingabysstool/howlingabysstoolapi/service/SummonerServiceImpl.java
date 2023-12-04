package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.configuration.YamlConfig;
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

    private final String apiUrl = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/";
    private final RestTemplate restTemplate;
    private final RiotAccountService riotAccountService;

    public SummonerServiceImpl(RestTemplate restTemplate, RiotAccountService riotAccountService) {
        this.restTemplate = restTemplate;
        this.riotAccountService = riotAccountService;
    }
    @Override
    public Summoner getSummonerByName(String name) {
        String fullApiUrl = apiUrl + "by-name/"+ name + "?api_key=" + myConfig.getRiotApi();

        System.out.println(fullApiUrl);

        return restTemplate.getForObject(fullApiUrl, Summoner.class);
    }
    @Override
    public Summoner getSummonerByPuuid(String puuid) {
        String fullApiUrl = apiUrl + "by-puuid/" + puuid + "?api_key="+ myConfig.getRiotApi();
        return restTemplate.getForObject(fullApiUrl, Summoner.class);
    }

    @Override
    public Summoner getSummonerByRiotId(String gameName, String tagLine) {
        String accountPuuid = riotAccountService.getRiotAccountPuuidByRiotId(gameName, tagLine);
        String fullApiUrl = apiUrl + "by-puuid/" + accountPuuid + "?api_key="+ myConfig.getRiotApi();
        return restTemplate.getForObject(fullApiUrl, Summoner.class);
    }
}
