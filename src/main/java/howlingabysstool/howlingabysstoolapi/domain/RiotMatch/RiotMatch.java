package howlingabysstool.howlingabysstoolapi.domain.RiotMatch;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@NoArgsConstructor
@ToString
public class RiotMatch {
    private Metadata metadata;
    private Info info;
}
