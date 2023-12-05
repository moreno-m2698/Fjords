package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline.RiotApiMatchTimeline;

public interface RiotApiMatchTimelineService {
    public RiotApiMatchTimeline getMatchTimeline(String matchId);
}
