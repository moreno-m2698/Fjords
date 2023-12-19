package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.configuration.YamlConfig;
import howlingabysstool.howlingabysstoolapi.domain.RiotAccount;
import howlingabysstool.howlingabysstoolapi.repository.RiotAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class RiotAccountServiceImpl implements RiotAccountService{
    @Autowired
    private YamlConfig myConfig;
    private final String apiUrl = "https://americas.api.riotgames.com/riot/account/v1/accounts/";
    private final RestTemplate restTemplate;
    @Autowired
    private final RiotAccountRepository riotAccountRepository;
    public RiotAccountServiceImpl(RestTemplate restTemplate, RiotAccountRepository riotAccountRepository) {
        this.restTemplate = restTemplate;
        this.riotAccountRepository = riotAccountRepository;
    }

    @Override
    public RiotAccount getRiotAccountByRiotId(String gameName, String tagLine) {
        String fullApiUrl = apiUrl + "by-riot-id/" + gameName + '/' + tagLine + "?api_key=" + myConfig.getRiotApi();
        return restTemplate.getForObject(fullApiUrl, RiotAccount.class);
    }

    @Override
    public String getRiotAccountPuuidByRiotId(String gameName, String tagLine) {
//
//        //Check to see if account is in cache.
//        boolean riotIdExistsInCache = 1 == riotAccountRepository.RiotIdExists(gameName, tagLine);
//
//        //Grab account
//        Optional<RiotAccount> riotAccountOptional = riotAccountRepository.findByRiotId(gameName, tagLine);
//        RiotAccount riotAccount = ProcessRiotAccountOptional(riotAccountOptional, gameName, tagLine);
//
//        //Place in Cache if it doesn't exist
//        if (!riotIdExistsInCache) {
//
//            cacheRiotAccount(riotAccount);
//
//        }
//        //Always cache

        return "test";
        //riotAccount.getPuuid();
    }

    private void cacheRiotAccount(RiotAccount riotAccount) {
        riotAccountRepository.save(riotAccount);
    }

    private RiotAccount ProcessRiotAccountOptional(
            Optional<RiotAccount> accountOptional,
            String gameName,
            String tagLine) {
        return accountOptional
                .orElseGet(() -> {
                    String riotUrl = apiUrl + "by-riot-id/" + gameName + "/" + tagLine + "?api_key=" + myConfig.getRiotApi();
                    RiotAccount newAccount = restTemplate.getForObject(riotUrl, RiotAccount.class);

                    return newAccount;
                });

    }

}
