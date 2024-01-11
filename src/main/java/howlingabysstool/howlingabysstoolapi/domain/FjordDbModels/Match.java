package howlingabysstool.howlingabysstoolapi.domain.FjordDbModels;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name="match")
public class Match {
    @Id
    @Column(name="match_id")
    private String matchId;
    private int queueId;
    @OneToMany(targetEntity = MatchParticipant.class, cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_participant_id", referencedColumnName = "match_id")
    private List<MatchParticipant> participant;
}
