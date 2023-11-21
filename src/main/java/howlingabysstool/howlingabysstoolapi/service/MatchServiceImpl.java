package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.configuration.YamlConfig;
import howlingabysstool.howlingabysstoolapi.domain.Match;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class MatchServiceImpl implements MatchService{

    @Autowired
    private YamlConfig myConfig;
    private final String apiUrl = "https://americas.api.riotgames.com/lol/match/v5/matches/";
    private final RestTemplate restTemplate;

    public MatchServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    @Override
    public Match getMatchByMatchId(String matchId) {
        String fullApiUrl = apiUrl + matchId + "/?api_key=" + myConfig.getRiotApi();
        Match match = restTemplate.getForObject(fullApiUrl, Match.class);
        System.out.println(match);
        return match;
    }
    @Override
    public List<String> getAramMatchIdsByPuuid(String puuid, int amount) {
        String fullApiString = apiUrl + "by-puuid/" + puuid + "/ids?queue=" + MatchQueueEnum.ARAM.queueId + "&" + "&start=0&count=" + amount + "/?api_key=" + myConfig.getRiotApi();
        return restTemplate.getForObject(fullApiString, List.class);
    }
}
