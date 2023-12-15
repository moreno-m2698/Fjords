package howlingabysstool.howlingabysstoolapi.repository;

import howlingabysstool.howlingabysstoolapi.domain.RiotAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RiotAccountRepository extends JpaRepository<RiotAccount, String> {
}
