package howlingabysstool.howlingabysstoolapi.controller;

import howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline.RiotApiMatchTimeline;
import howlingabysstool.howlingabysstoolapi.service.RiotApiMatchTimelineService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/timeline")
public class MatchTimelineController {
    private final RiotApiMatchTimelineService riotApiMatchTimelineService;

    public MatchTimelineController(RiotApiMatchTimelineService riotApiMatchTimelineService) {
        this.riotApiMatchTimelineService = riotApiMatchTimelineService;
    }
    @GetMapping("/{matchId}")
    public RiotApiMatchTimeline getMatchTimeline(@PathVariable String matchId) {
        return riotApiMatchTimelineService.getMatchTimeline(matchId);
    }


}
