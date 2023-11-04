package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.domain.Summoner;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Log4j2
public class SummonerServiceImpl implements SummonerService{

    private final String apiUrl = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/";
    private final String apiKey = "?api_key=RGAPI-02bbbd46-d396-4790-ae23-bd198677b0a6";
    private final RestTemplate restTemplate;

    public SummonerServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    @Override
    public Summoner getSummonerByName(String name) {
        String fullApiUrl = apiUrl + "by-name/"+ name + apiKey;
        System.out.println(fullApiUrl);
        return restTemplate.getForObject(fullApiUrl, Summoner.class);
    }
    @Override
    public Summoner getSummonerByPuuid(String puuid) {
        String fullApiUrl = apiUrl + "by-puuid/" + puuid + apiKey;
        return restTemplate.getForObject(fullApiUrl, Summoner.class);
    }
}
