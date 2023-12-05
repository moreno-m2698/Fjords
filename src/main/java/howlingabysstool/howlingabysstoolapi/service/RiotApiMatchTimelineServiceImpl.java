package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.configuration.YamlConfig;
import howlingabysstool.howlingabysstoolapi.domain.FjordApiMatchTimeline.FjordApiMatchTimeline;
import howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline.RiotApiMatchTimeline;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class RiotApiMatchTimelineServiceImpl implements RiotApiMatchTimelineService {
    @Autowired
    private YamlConfig myConfig;
    private final String apiString = "https://americas.api.riotgames.com/lol/match/v5/matches/";
    private final RestTemplate restTemplate;

    public RiotApiMatchTimelineServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
    @Override
    public RiotApiMatchTimeline getMatchTimeline(String matchId) {
        String apiUrl = apiString + matchId + "/timeline?api_key=" + myConfig.getRiotApi();
        System.out.println(apiUrl);
        RiotApiMatchTimeline riotApiMatchTimeline = restTemplate.getForObject(apiUrl, RiotApiMatchTimeline.class);
        return riotApiMatchTimeline;
    }

    public FjordApiMatchTimeline convertToFjordTimeline (RiotApiMatchTimeline riotTimeline) {
        List<RiotApiMatchTimeline.Info.RiotParticipant> riotParticipants = riotTimeline.getInfo().getParticipants();
        return null;
    }
}
