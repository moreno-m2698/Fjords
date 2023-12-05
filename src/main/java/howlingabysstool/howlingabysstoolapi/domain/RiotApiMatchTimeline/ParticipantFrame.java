package howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class ParticipantFrame {
    private DamageStats damageStats;
    private int totalGold;
}
