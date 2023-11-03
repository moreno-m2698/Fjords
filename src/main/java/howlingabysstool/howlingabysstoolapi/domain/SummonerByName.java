package howlingabysstool.howlingabysstoolapi.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class SummonerByName {
    private String puuid;
    private String name;
    private Integer profileIconId;
    private Integer summonerLevel;
}
