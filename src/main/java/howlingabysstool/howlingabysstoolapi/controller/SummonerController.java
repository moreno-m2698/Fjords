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
@RequestMapping("/api/summoner")
public class SummonerController {

    private final SummonerService summonerService;
    private final RiotAccountService riotAccountService;

    SummonerController(SummonerService summonerService, RiotAccountService riotAccountService) {
        this.summonerService = summonerService;
        this.riotAccountService = riotAccountService;
    }
    @GetMapping("/by-riot-id/{gameName}/{tagLine}")
    public Summoner getSummonerByRiotId(@PathVariable String gameName, @PathVariable String tagLine) {
        RiotAccount riotAccount = riotAccountService.getRiotAccountByRiotId(gameName, tagLine);
        Summoner summoner = summonerService.getSummonerByPuuid(riotAccount.getPuuid());
        return null;
    }
}
