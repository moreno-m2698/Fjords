package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.configuration.YamlConfig;
import howlingabysstool.howlingabysstoolapi.controller.RiotAccountController;
import howlingabysstool.howlingabysstoolapi.domain.RiotAccount;
import howlingabysstool.howlingabysstoolapi.repository.RiotAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
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

        String gameName = "keoP", tagLine = "lfhp";
        Optional<RiotAccount> accountOptional = riotAccountRepository.findByRiotId(gameName,tagLine);

        if (accountOptional.isEmpty()) {

            String riotUrl = BASE_URL + "by-riot-id/" + gameName + "/" + tagLine + "?api_key=" + myConfig.getRiotApi();
            RiotAccount newAccount = restTemplate.getForObject(riotUrl, RiotAccount.class);
            newAccount.setAddDate(LocalDate.now());
            riotAccountRepository.save(newAccount);

            return newAccount;
        }

        return accountOptional.get();
    }

}
