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

    public SummonerServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
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
}
