package howlingabysstool.howlingabysstoolapi.repository;

import howlingabysstool.howlingabysstoolapi.domain.FjordDbModels.Match;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatchRepository extends JpaRepository<Match, String> {
}
