package howlingabysstool.howlingabysstoolapi.domain.Match;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Participant {
    private int assists;
    private Challenge challenges;
    private int championId;
    private String championName;
    private int deaths;
    private int item0;
    private int item1;
    private int item2;
    private int item3;
    private int item4;
    private int item5;
    private int item6;
    private int kills;
    private String riotIdName;
    private String riotIdTagline;
    private String summonerName;
    private boolean win;
}
