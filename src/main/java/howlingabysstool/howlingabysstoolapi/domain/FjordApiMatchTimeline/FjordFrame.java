package howlingabysstool.howlingabysstoolapi.domain.FjordApiMatchTimeline;

import lombok.*;


@NoArgsConstructor
@AllArgsConstructor
@Data
public class FjordFrame {
    private int timestamp;
    private int damageDone;
    private int damageTaken;
    private int gold;
}
