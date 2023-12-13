package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.configuration.YamlConfig;
import howlingabysstool.howlingabysstoolapi.domain.RiotAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class RiotAccountServiceImpl implements RiotAccountService{
    @Autowired
    private YamlConfig myConfig;
    private final String apiUrl = "https://americas.api.riotgames.com/riot/account/v1/accounts/";
    private final RestTemplate restTemplate;
    public RiotAccountServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public RiotAccount getRiotAccountByRiotId(String gameName, String tagLine) {
        String fullApiUrl = apiUrl + "by-riot-id/" + gameName + '/' + tagLine + "?api_key=" + myConfig.getRiotApi();
        return restTemplate.getForObject(fullApiUrl, RiotAccount.class);
    }

    @Override
    public String getRiotAccountPuuidByRiotId(String gameName, String tagLine) {
        String riotUrl = apiUrl + "by-riot-id/" + gameName + "/" + tagLine + "?api_key=" + myConfig.getRiotApi();
        RiotAccount account  = restTemplate.getForObject(riotUrl, RiotAccount.class);
        return account.getPuuid();
    }
}
