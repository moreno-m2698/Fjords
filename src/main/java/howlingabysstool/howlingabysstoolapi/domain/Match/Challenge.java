package howlingabysstool.howlingabysstoolapi.domain.Match;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Challenge {
    private float kda;
    private int poroExplosions;
    private int snowballsHit;
}
