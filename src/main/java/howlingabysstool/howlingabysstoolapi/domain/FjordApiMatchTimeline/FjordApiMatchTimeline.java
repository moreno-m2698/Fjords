package howlingabysstool.howlingabysstoolapi.domain.FjordApiMatchTimeline;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class FjordApiMatchTimeline {

    private Map<String, Participant> participants; //puuid is key
}
