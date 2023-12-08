package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.domain.FjordApiMatchTimeline.FjordFrame;
import howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline.RiotApiMatchTimeline;
import howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline.RiotFrame;
import howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline.RiotParticipant;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class FjordMatchTimelineServiceImpl implements FjordMatchTimelineService{

    private final RestTemplate restTemplate;
    public FjordMatchTimelineServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }
//    private FjordApiMatchTimeline convertRiotTimelineToFjordTimeline(RiotApiMatchTimeline riotTimeline) {
//
//        List<RiotParticipant> riotParticipants = riotTimeline.getInfo().getParticipants();
//        //{participants: {puuid: , participantId: }
//
//        List<RiotFrame> timelineFrames = riotTimeline.getInfo().getFrames();
//        //[frames:{"1": {data}, "2: {data},...} timestamp:}]
//
//        FjordApiMatchTimeline result = new FjordApiMatchTimeline();
//        Map<String, FjordParticipant> puuidFramesMap = new HashMap<>();
//
//        //puuid -> participantId -> participantFrame
//
//
//        for (RiotParticipant riotParticipant : riotParticipants) {
//            final String participantId = Integer.toString(riotParticipant.getParticipantId());
//            FjordParticipant fjordParticipant = new FjordParticipant();
//            List<FjordFrame> playerFrames = timelineFrames.stream().map((timelineFrame) -> timelineFrame.getFjordFrame(participantId)).collect(Collectors.toList());
//            fjordParticipant.setFrames(playerFrames);
//            puuidFramesMap.put(riotParticipant.getPuuid(), fjordParticipant);
//        }
//        result.setParticipants(puuidFramesMap);
//        return result;
//    }

    @Override
    public Map<String, List<FjordFrame>> convertRiotTimelineToFjordTimelineReduced(RiotApiMatchTimeline riotTimeline) {
        List<RiotParticipant> riotParticipants = riotTimeline.getInfo().getParticipants();
        List<RiotFrame> timelineFrames = riotTimeline.getInfo().getFrames();



        Map<String, List<FjordFrame>> puuidFramesMap = riotParticipants.stream()
                .collect(Collectors.toMap(
                        RiotParticipant::getPuuid,
                        riotParticipant -> {
                            String participantId = Integer.toString(riotParticipant.getParticipantId());

                            List<FjordFrame> playerFrames = timelineFrames.stream()
                                    .map(timelineFrame -> timelineFrame.getFjordFrame(participantId))
                                    .collect(Collectors.toList());

                            return playerFrames;
                        },
                        (existing, replacement) -> existing,
                        HashMap::new
                ));


        return puuidFramesMap;
    }
}
