package howlingabysstool.howlingabysstoolapi.controller;

import howlingabysstool.howlingabysstoolapi.domain.MatchTimeline;
import howlingabysstool.howlingabysstoolapi.service.MatchTimelineService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/timeline")
public class MatchTimelineController {
    private final MatchTimelineService matchTimelineService;

    public MatchTimelineController(MatchTimelineService matchTimelineService) {
        this.matchTimelineService = matchTimelineService;
    }
    @GetMapping("/{matchId}")
    public MatchTimeline getMatchTimeline(@PathVariable String matchId) {
        return matchTimelineService.getMatchTimeline(matchId);
    }


}
