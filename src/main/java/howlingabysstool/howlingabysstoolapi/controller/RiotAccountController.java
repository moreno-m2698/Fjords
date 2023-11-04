package howlingabysstool.howlingabysstoolapi.controller;

import howlingabysstool.howlingabysstoolapi.service.MatchService;
import howlingabysstool.howlingabysstoolapi.service.RiotAccountService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class RiotAccountController {
    private final RiotAccountService riotAccountService;

    public RiotAccountController(RiotAccountService riotAccountService) {
        this.riotAccountService = riotAccountService;
    }
}
