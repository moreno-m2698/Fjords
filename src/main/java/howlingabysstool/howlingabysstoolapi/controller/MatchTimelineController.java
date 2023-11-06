package howlingabysstool.howlingabysstoolapi.controller;

import howlingabysstool.howlingabysstoolapi.service.MatchTimelineService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping
public class MatchTimelineController {
    private final MatchTimelineService matchTimelineService;

    public MatchTimelineController(MatchTimelineService matchTimelineService) {
        this.matchTimelineService = matchTimelineService;
    }

}
