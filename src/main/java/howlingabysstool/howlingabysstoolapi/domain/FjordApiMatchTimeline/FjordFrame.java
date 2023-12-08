package howlingabysstool.howlingabysstoolapi.domain.FjordApiMatchTimeline;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class FjordFrame {
    private int timestamp;
    private int damageDone;
    private int damageTaken;
    private int gold;
}
