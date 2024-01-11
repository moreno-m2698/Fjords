package howlingabysstool.howlingabysstoolapi.domain.RiotMatch;

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
    private List<RiotParticipant> participants;
    private int queueId;
}
