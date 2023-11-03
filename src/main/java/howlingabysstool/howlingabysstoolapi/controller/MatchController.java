package howlingabysstool.howlingabysstoolapi.controller;


import howlingabysstool.howlingabysstoolapi.domain.Match;
import howlingabysstool.howlingabysstoolapi.service.MatchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MatchController {
    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/match/{matchId}")
    public Match getData(@PathVariable String matchId) {
        return matchService.getMatchById(matchId);
    }

}
