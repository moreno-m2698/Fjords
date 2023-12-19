package howlingabysstool.howlingabysstoolapi.repository;

import howlingabysstool.howlingabysstoolapi.domain.RiotAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface RiotAccountRepository extends JpaRepository<RiotAccount, String> {
    @Query("SELECT ra FROM riot_account ra WHERE ra.gameName = :gameName")
    List<RiotAccount> findByRiotId(@Param("gameName") String gameName);


//    @Query("SELECT COUNT(1) from riot_account ra WHERE r.game_name := game_name AND r.tag_line := tag_line")
//    int RiotIdExists(
//            @Param("game_name") String game_name,
//            @Param("tag_line") String tagLine);
}
