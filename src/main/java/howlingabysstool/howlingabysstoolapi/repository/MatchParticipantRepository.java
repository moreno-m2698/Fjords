package howlingabysstool.howlingabysstoolapi.repository;


import howlingabysstool.howlingabysstoolapi.domain.FjordDbModels.MatchParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MatchParticipantRepository extends JpaRepository<MatchParticipant, String> {
    @Query("SELECT COUNT(*) FROM match_participant mp WHERE mp.matchParticipantId = :matchParticipantId")
    int matchParticipantIsInById(@Param("matchParticipantId") String matchParticipantId);

    @Query("SELECT mp FROM match_participant mp WHERE mp.matchParticipantId = :matchParticipantId")
    Optional<MatchParticipant> getMatchParticipant(@Param("matchParticipantId") String matchParticipantId);

//    @Query()
}
    