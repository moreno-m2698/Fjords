package howlingabysstool.howlingabysstoolapi.repository;

import howlingabysstool.howlingabysstoolapi.domain.RiotAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface RiotAccountRepository extends JpaRepository<RiotAccount, String> {
    @Query("SELECT ra FROM riot_account ra WHERE ra.gameName = :gameName AND ra.tagLine = :tagLine")
    Optional<RiotAccount> findByRiotId(@Param("gameName") String gameName, @Param("tagLine") String tagLine);


    @Query("SELECT COUNT(*) FROM riot_account ra WHERE ra.gameName = :gameName AND ra.tagLine = :tagLine")
    int RiotIdExists(
            @Param("gameName") String gameName,
            @Param("tagLine") String tagLine);
}
