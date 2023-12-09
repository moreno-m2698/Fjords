package howlingabysstool.howlingabysstoolapi.controller;

import howlingabysstool.howlingabysstoolapi.domain.FjordApiMatchTimeline.FjordFrame;
import howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline.RiotApiMatchTimeline;
import howlingabysstool.howlingabysstoolapi.service.FjordMatchTimelineService;
import howlingabysstool.howlingabysstoolapi.service.RiotApiMatchTimelineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/timeline")
public class MatchTimelineController {
    private final RiotApiMatchTimelineService riotApiMatchTimelineService;
    private final FjordMatchTimelineService fjordMatchTimelineService;

    public MatchTimelineController(RiotApiMatchTimelineService riotApiMatchTimelineService, FjordMatchTimelineService fjordMatchTimelineService) {
        this.riotApiMatchTimelineService = riotApiMatchTimelineService;
        this.fjordMatchTimelineService = fjordMatchTimelineService;
    }
    @GetMapping("/{matchId}")
    public ResponseEntity<Map<String, List<FjordFrame>>> getMatchTimeline(@PathVariable String matchId) {
        RiotApiMatchTimeline riotTimeline = riotApiMatchTimelineService.getMatchTimeline(matchId);
        Map<String, List<FjordFrame>> fjordTimeline = fjordMatchTimelineService.convertRiotTimelineToFjordTimelineReduced(riotTimeline);
        return new ResponseEntity<>(fjordTimeline, HttpStatus.OK);
    }

}
