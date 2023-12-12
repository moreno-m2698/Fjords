package howlingabysstool.howlingabysstoolapi.domain.Match;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@ToString
public class Match {
    private Metadata metadata;
    private Info info;
}
