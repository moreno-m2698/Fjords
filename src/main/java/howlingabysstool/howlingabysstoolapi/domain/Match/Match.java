package howlingabysstool.howlingabysstoolapi.domain.Match;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Setter
@NoArgsConstructor
@ToString
public class Match {
    private Metadata metadata;
    private Info info;
}
