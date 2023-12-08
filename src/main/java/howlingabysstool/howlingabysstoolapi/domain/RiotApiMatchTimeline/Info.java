package howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Info {
    private List<RiotFrame> frames;
    private List<RiotParticipant> participants;
}
