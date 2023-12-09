package howlingabysstool.howlingabysstoolapi.domain.RiotApiMatchTimeline;

import howlingabysstool.howlingabysstoolapi.domain.FjordApiMatchTimeline.FjordFrame;
import jakarta.servlet.http.Part;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class RiotFrame {
    private Map<String, ParticipantFrame> participantFrames;
    private int timestamp;

    public FjordFrame getFjordFrame(String participantId) {
        ParticipantFrame participantFrame = this.participantFrames.get(participantId);
        int timestamp = this.getTimestamp();
        int damageDoneToChampions = participantFrame.getDamageStats().getTotalDamageDoneToChampions();
        int damageTaken = participantFrame.getDamageStats().getTotalDamageTaken();
        int totalGold = participantFrame.getTotalGold();
        return new FjordFrame(timestamp,damageDoneToChampions,damageTaken,totalGold);
    }
}
