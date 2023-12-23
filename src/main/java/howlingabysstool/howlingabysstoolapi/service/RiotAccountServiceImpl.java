package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.configuration.YamlConfig;
import howlingabysstool.howlingabysstoolapi.controller.RiotAccountController;
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
    private final String BASE_URL = "https://americas.api.riotgames.com/riot/account/v1/accounts/";
    private final RestTemplate restTemplate;
    @Autowired
    private final RiotAccountRepository riotAccountRepository;
    public RiotAccountServiceImpl(RestTemplate restTemplate, RiotAccountRepository riotAccountRepository) {
        this.restTemplate = restTemplate;
        this.riotAccountRepository = riotAccountRepository;
    }

    @Override
    public RiotAccount getRiotAccountByRiotId(String gameName, String tagLine) {
        String fullApiUrl = BASE_URL + "by-riot-id/" + gameName + '/' + tagLine + "?api_key=" + myConfig.getRiotApi();
        return restTemplate.getForObject(fullApiUrl, RiotAccount.class);
    }


    @Override
    public String getRiotAccountPuuidByRiotId(String gameName, String tagLine) {
        String riotUrl = BASE_URL + "by-riot-id/" + gameName + "/" + tagLine + "?api_key=" + myConfig.getRiotApi();
        RiotAccount newAccount = restTemplate.getForObject(riotUrl, RiotAccount.class);

        return newAccount.getPuuid();


    }

    @Override //always line up this method in the interface aand controller
    public RiotAccount test() {
        boolean notriotIdExistsInCache = 1 == riotAccountRepository.RiotIdExists("keoP", "lfhp");
        System.out.println("This should be false: " + notriotIdExistsInCache);
        RiotAccount myAccount = new RiotAccount();
        myAccount.setGameName("keoP");
        myAccount.setTagLine("lfhp");
        myAccount.setPuuid("puuid");
        riotAccountRepository.save(myAccount);
        boolean riotIdExistsInCache = 1 == riotAccountRepository.RiotIdExists("keoP", "lfhp");
        System.out.println("This should be true: " + riotIdExistsInCache);
        Optional<RiotAccount> thing = riotAccountRepository.findByRiotId("keoP", "lfhp");
        RiotAccount account = thing.get();
        return account;
    }


    private RiotAccount idk(String gameName, String tagLine) {
        //Check to see if account is in cache.
        boolean riotIdExistsInCache = 1 == riotAccountRepository.RiotIdExists(gameName, tagLine);

        //Grab account
        Optional<RiotAccount> riotAccountOptional = riotAccountRepository.findByRiotId(gameName, tagLine);
        RiotAccount riotAccount = ProcessRiotAccountOptional(riotAccountOptional, gameName, tagLine);

        //Place in Cache if it doesn't exist
        if (!riotIdExistsInCache) {

            cacheRiotAccount(riotAccount);

        }
        //Always cache

        return riotAccount;
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
                    String riotUrl = BASE_URL + "by-riot-id/" + gameName + "/" + tagLine + "?api_key=" + myConfig.getRiotApi();
                    RiotAccount newAccount = restTemplate.getForObject(riotUrl, RiotAccount.class);

                    return newAccount;
                });

    }

}
