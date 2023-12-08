package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.domain.FjordApiMatchTimeline.FjordFrame;
import howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline.RiotApiMatchTimeline;

import java.util.List;
import java.util.Map;

public interface FjordMatchTimelineService {
    public Map<String, List<FjordFrame>> convertRiotTimelineToFjordTimelineReduced(RiotApiMatchTimeline riotTimeline);
}
