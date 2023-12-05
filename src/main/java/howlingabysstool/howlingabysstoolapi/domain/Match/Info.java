package howlingabysstool.howlingabysstoolapi.domain.Match;

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
    private List<Participant> participants;
    private int queueId;
}
