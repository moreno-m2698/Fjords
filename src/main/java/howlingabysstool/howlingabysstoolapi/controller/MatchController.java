package howlingabysstool.howlingabysstoolapi.controller;


import howlingabysstool.howlingabysstoolapi.domain.FjordDbModels.MatchParticipant;
import howlingabysstool.howlingabysstoolapi.domain.RiotMatch.RiotMatch;
import howlingabysstool.howlingabysstoolapi.service.RiotMatchService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/match")
public class MatchController {
    private final RiotMatchService matchService;

    public MatchController(RiotMatchService matchService) {
        this.matchService = matchService;
    }

    @GetMapping("/{matchId}")
    public ResponseEntity<RiotMatch> getMatchData(@PathVariable String matchId) {
        RiotMatch match = matchService.getMatchByMatchId(matchId);
        return new ResponseEntity<>(match, HttpStatus.OK);
    }

    @GetMapping("/request/{amount}/{puuid}")
    public ResponseEntity<List<String>> getMatchIds(@PathVariable int amount, @PathVariable String puuid) {
        List<String> matches = matchService.getAramMatchIdsByPuuid(puuid, amount);
        return new ResponseEntity<>(matches, HttpStatus.OK);
    }

    @GetMapping("/test")
    public ResponseEntity<MatchParticipant> getMatchParticipant(){
        MatchParticipant participant = matchService.getMatchParticipantByAccountIdAndMatchId("O7UOyU08FLv6CqVjTpsCzpsCrLMAzkXPjhHwaGwEirNyB7nxhWXGJPHL2fqKJLZPOldv3JtHFSCxqw", "NA1_4880422007");
        return new ResponseEntity<>(participant, HttpStatus.OK);
    }


}
