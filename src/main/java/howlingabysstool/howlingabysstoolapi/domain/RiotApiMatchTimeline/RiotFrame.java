package howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class RiotFrame {
    private Map<String, ParticipantFrame> participantFrames;
    private int timestamp;
}
