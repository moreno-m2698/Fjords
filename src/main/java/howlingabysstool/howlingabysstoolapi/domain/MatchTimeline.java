package howlingabysstool.howlingabysstoolapi.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class MatchTimeline {
    private Info info;
    @Getter
    @Setter
    @NoArgsConstructor
    @ToString
    public static class Info {
        private List<Frame> frames;
        private List<Participant> participants;

        @Getter
        @Setter
        @NoArgsConstructor
        @ToString
        public static class Frame {
            private Map<String,ParticipantFrame> participantFrames;
            private int timestamp;

            @Getter
            @Setter
            @NoArgsConstructor
            @ToString
            public static class ParticipantFrame {
                private DamageStats damageStats;
                private int totalGold;

                @Getter
                @Setter
                @NoArgsConstructor
                @ToString
                public static class DamageStats {
                    private int totalDamageDoneToChampions;
                    private int totalDamageTaken;
                }
            }
        }
        @Getter
        @Setter
        @NoArgsConstructor
        @ToString
        public static class Participant {
            private int participantId;
            private String puuid;
        }
    }

}
