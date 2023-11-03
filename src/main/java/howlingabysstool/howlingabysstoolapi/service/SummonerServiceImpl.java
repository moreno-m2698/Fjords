package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.domain.SummonerByName;
import lombok.extern.log4j.Log4j2;
import org.apache.logging.log4j.LogManager;
import org.slf4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@Log4j2
public class SummonerServiceImpl implements SummonerService{

    private final String apiUrl = "https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
    private final String apiKey = "?api_key=RGAPI-dc4c4608-c6ec-415c-9b08-b270eee4f402";
    private final RestTemplate restTemplate;

    public SummonerServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    @Override
    public SummonerByName getSummonerByName(String name) {
        String fullApiUrl = apiUrl + name + apiKey;
        System.out.println(fullApiUrl);
        return restTemplate.getForObject(fullApiUrl, SummonerByName.class);
    }
}
