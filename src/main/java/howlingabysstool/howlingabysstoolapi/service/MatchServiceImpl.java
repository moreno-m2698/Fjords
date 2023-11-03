package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.domain.Match;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class MatchServiceImpl implements MatchService{

    private final String apiUrl = "https://americas.api.riotgames.com/lol/match/v5/matches/";
    private final String apiKey = "?api_key=RGAPI-02bbbd46-d396-4790-ae23-bd198677b0a6";
    private final RestTemplate restTemplate;


    public MatchServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    @Override
    public Match getMatchById(String matchId) {
        String fullApiUrl = apiUrl + matchId + apiKey;
        Match match = restTemplate.getForObject(fullApiUrl, Match.class);
        System.out.println(match);
        return match;
    }
}
