package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.domain.MatchTimeline;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MatchTimelineServiceImpl implements MatchTimelineService {
    private final String apiString = "https://americas.api.riotgames.com/lol/match/v5/matches/";
    private final String apiKey= "api_key=RGAPI-d804884a-b19c-4c05-8998-8dde27fb7e4b";
    private final RestTemplate restTemplate;

    public MatchTimelineServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    @Override
    public MatchTimeline getMatchTimeline(String matchId) {
        String apiUrl = apiString + matchId + "/timeline?" + apiKey;
        MatchTimeline matchTimeline = restTemplate.getForObject(apiUrl, MatchTimeline.class);
        return matchTimeline;
    }
}
