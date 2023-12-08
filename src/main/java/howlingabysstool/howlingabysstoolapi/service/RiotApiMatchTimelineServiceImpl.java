package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.configuration.YamlConfig;
import howlingabysstool.howlingabysstoolapi.domain.FjordApiMatchTimeline.FjordApiMatchTimeline;
import howlingabysstool.howlingabysstoolapi.domain.FjordApiMatchTimeline.FjordFrame;
import howlingabysstool.howlingabysstoolapi.domain.FjordApiMatchTimeline.FjordParticipant;

import howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline.RiotFrame;
import howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline.ParticipantFrame;
import howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline.RiotApiMatchTimeline;
import howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline.RiotParticipant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        return restTemplate.getForObject(apiUrl, RiotApiMatchTimeline.class);
    }

    public FjordApiMatchTimeline convertRiotTimelineToFjordTimeline (RiotApiMatchTimeline riotTimeline) {
        List<RiotParticipant> riotParticipants = riotTimeline.getInfo().getParticipants();
        List<RiotFrame> timelineFrames = riotTimeline.getInfo().getFrames();
        //Every frame uses the playergameid as a key with the data as the value => loop over these frames using riotparticipants as a map
        FjordApiMatchTimeline result = new FjordApiMatchTimeline();
        Map<String, FjordParticipant> puuidFramesMap = new HashMap<>();

        for (int i = 0; i < riotParticipants.size(); i++){
            //Going to do a double loop, but I feel like maybe making another object as a middle ground is a good idea.
            FjordParticipant fjordParticipant = new FjordParticipant();
            List<FjordFrame> playerFrames =  new ArrayList<>();
            for (RiotFrame timelineFrame : timelineFrames) {
                ParticipantFrame participantFrame = timelineFrame.getParticipantFrames().get(Integer.toString(i + 1));
                int timestamp = timelineFrame.getTimestamp();
                int damageDoneToChampions = participantFrame.getDamageStats().getTotalDamageDoneToChampions();
                int damageTaken = participantFrame.getDamageStats().getTotalDamageTaken();
                int totalGold = participantFrame.getTotalGold();

                FjordFrame frame = new FjordFrame();
                frame.setDamageDone((damageDoneToChampions));
                frame.setDamageTaken(damageTaken);
                frame.setGold(totalGold);
                frame.setTimestamp(timestamp);
                playerFrames.add(frame);

            }
            fjordParticipant.setFrames(playerFrames);
            puuidFramesMap.put(riotParticipants.get(i).getPuuid(),fjordParticipant);
        }

        result.setParticipants(puuidFramesMap);
        return result;
    }
}
