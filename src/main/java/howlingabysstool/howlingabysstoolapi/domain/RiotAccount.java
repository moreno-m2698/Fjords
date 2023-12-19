package howlingabysstool.howlingabysstoolapi.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity(name = "riot_account")
@Table(name = "riot_account")
public class RiotAccount {

    @Id
    private String puuid;

    @Column(
            name = "game_name",
            nullable = false
    )
    private String gameName;
    @Column(
            name = "tag_line",
            nullable = false
    )
    private String tagLine;

    public RiotAccount (String puuid, String gameName, String tagLine) {
        this.puuid = puuid;
        this.gameName = gameName;
        this.tagLine = tagLine;
    }
}
