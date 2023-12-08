package howlingabysstool.howlingabysstoolapi.domain.FjordApiMatchTimeline;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class FjordParticipant {
    private List<FjordFrame> frames;
}
