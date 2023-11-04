package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.domain.RiotAccount;
import howlingabysstool.howlingabysstoolapi.domain.Summoner;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RiotAccountServiceImpl implements RiotAccountService{
    private final String apiUrl = "https://americas.api.riotgames.com/riot/account/v1/accounts/";
    private final String apiKey = "?api_key=RGAPI-02bbbd46-d396-4790-ae23-bd198677b0a6";
    private final RestTemplate restTemplate;
    public RiotAccountServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public RiotAccount getRiotAccountByPuuid(String puuid) {
        String fullApiUrl = apiUrl + "by-puuid/"+ puuid + apiKey;
        System.out.println(fullApiUrl);
        return restTemplate.getForObject(fullApiUrl, RiotAccount.class);
    }
    @Override
    public RiotAccount getRiotAccountByRiotId(String gameName, String tagLine) {
        String fullApiUrl = apiUrl + "by-riot-id/" + gameName + '/' + tagLine + apiKey;
        return restTemplate.getForObject(fullApiUrl, RiotAccount.class);
    }
}
