package howlingabysstool.howlingabysstoolapi.domain.FjordDbModels;

import howlingabysstool.howlingabysstoolapi.domain.RiotMatch.RiotParticipant;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Entity(name = "match_participant")
@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name="match_participant")
public class MatchParticipant {
    @Id
    @Column(name = "match_participant_id")
    private String matchParticipantId;
    @Column(name = "match_id")
    private String matchId;
    @Column(name = "riot_account_id")
    private String riotAccountId;
    @Column(name = "match_index")
    private int matchIndex;
    private int assists;
    @Column(name = "champ_level")
    private int champLevel;
    @Column(name = "champion_id")
    private int championId;
    @Column(name = "champion_name")
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
    @Column(name = "riot_id_name")
    private String riotIdName;
    @Column(name = "riot_id_tagline")
    private String riotIdTagline;
    @Column(name = "summoner_name")
    private String summonerName;
    @Column(name = "summoner_1_id)")
    private int summoner1Id;
    @Column(name = "summoner_2_id")
    private int summoner2Id;
    private boolean win;

    public MatchParticipant(RiotParticipant participant) {
        assists = participant.getAssists();
        championId = participant.getChampionId();
        champLevel = participant.getChampLevel();
        championName = participant.getChampionName();
        deaths = participant.getDeaths();
        item0 = participant.getItem0();
        item1 = participant.getItem1();
        item2 = participant.getItem2();
        item3 = participant.getItem3();
        item4 = participant.getItem4();
        item5 = participant.getItem5();
        item6 = participant.getItem6();
        kills = participant.getKills();
        riotIdName = participant.getRiotIdName();
        riotIdTagline = participant.getRiotIdTagline();
        summonerName = participant.getSummonerName();
        summoner1Id = participant.getSummoner1Id();
        summoner2Id = participant.getSummoner2Id();
        win = participant.isWin();
    }
}
