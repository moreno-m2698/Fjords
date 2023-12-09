package howlingabysstool.howlingabysstoolapi.controller;

import howlingabysstool.howlingabysstoolapi.domain.RiotAccount;
import howlingabysstool.howlingabysstoolapi.domain.Summoner;
import howlingabysstool.howlingabysstoolapi.service.RiotAccountService;
import howlingabysstool.howlingabysstoolapi.service.SummonerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/account")
public class RiotAccountController {
    private final RiotAccountService riotAccountService;
    private final SummonerService summonerService;

    public RiotAccountController(RiotAccountService riotAccountService, SummonerService summonerService) {
        this.riotAccountService = riotAccountService;
        this.summonerService = summonerService;
    }
    @GetMapping("/by-puuid/{puuid}")
    public RiotAccount getRiotAccountByPuuid(@PathVariable String puuid) {
        return riotAccountService.getRiotAccountByPuuid(puuid);
    }
    @GetMapping("/by-riot-id/{gameName}/{tagLine}")
    public Summoner getSummonerByRiotId(@PathVariable String gameName, @PathVariable String tagLine) {
        RiotAccount riotAccount = riotAccountService.getRiotAccountByRiotId(gameName, tagLine);
        Summoner summoner = summonerService.getSummonerByPuuid(riotAccount.getPuuid());
        return summoner;
    }
}
