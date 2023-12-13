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


    public FjordMatchTimelineServiceImpl() {
    }

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
