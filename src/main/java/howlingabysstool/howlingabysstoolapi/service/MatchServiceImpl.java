package howlingabysstool.howlingabysstoolapi.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import howlingabysstool.howlingabysstoolapi.domain.Match;
import howlingabysstool.howlingabysstoolapi.domain.SummonerByName;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

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
