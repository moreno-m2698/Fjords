package howlingabysstool.howlingabysstoolapi.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class Match {
    private Metadata metadata;
    private Info info;
    @Getter
    @Setter
    @NoArgsConstructor
    @ToString
    public static class Metadata {
        private List<String> participants;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @ToString
    public static class Info {
        private List<Participant> participants;
        private int queueId; //450 means ARAM

        @Getter
        @Setter
        @NoArgsConstructor
        @ToString
        public static class Participant {
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
            private boolean win;

            @Getter
            @Setter
            @NoArgsConstructor
            @ToString
            public static class Challenge{
                private float kda;
                private int poroExplosions;
                private int snowballsHit;
            }

        }
    }
}
