package howlingabysstool.howlingabysstoolapi.controller;

import howlingabysstool.howlingabysstoolapi.domain.RiotAccount;
import howlingabysstool.howlingabysstoolapi.service.RiotAccountService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/account")
public class RiotAccountController {
    private final RiotAccountService riotAccountService;

    public RiotAccountController(RiotAccountService riotAccountService) {
        this.riotAccountService = riotAccountService;
    }
    @GetMapping("/by-puuid/{puuid}")
    public RiotAccount getRiotAccountByPuuid(@PathVariable String puuid) {
        return riotAccountService.getRiotAccountByPuuid(puuid);
    }
    @GetMapping("/by-riot-id/{gameName}/{tagLine}")
    public RiotAccount getRiotAccountByRiotId(@PathVariable String gameName, @PathVariable String tagLine) {
        return riotAccountService.getRiotAccountByRiotId(gameName, tagLine);
    }
}
