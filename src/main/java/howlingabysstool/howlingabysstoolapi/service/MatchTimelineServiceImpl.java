package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.configuration.YamlConfig;
import howlingabysstool.howlingabysstoolapi.domain.MatchTimeline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MatchTimelineServiceImpl implements MatchTimelineService {
    @Autowired
    private YamlConfig myConfig;
    private final String apiString = "https://americas.api.riotgames.com/lol/match/v5/matches/";
    private final RestTemplate restTemplate;

    public MatchTimelineServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    @Override
    public MatchTimeline getMatchTimeline(String matchId) {
        String apiUrl = apiString + matchId + "/timeline?api_key=" + myConfig.getRiotApi();
        MatchTimeline matchTimeline = restTemplate.getForObject(apiUrl, MatchTimeline.class);
        return matchTimeline;
    }
}
