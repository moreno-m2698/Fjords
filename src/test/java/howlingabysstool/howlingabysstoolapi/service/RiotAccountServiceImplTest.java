package howlingabysstool.howlingabysstoolapi.service;
import howlingabysstool.howlingabysstoolapi.domain.RiotAccount;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
    class RiotAccountServiceImplTest {

    @Autowired
    RiotAccountService riotAccountService;

    @Test
    @DisplayName("One plus One")
    void oneplusone() {

        assertEquals(2, 1+1);
    }
    @Test
    @DisplayName("Puuid test grab")
    void puuidTest() {
        //given:
        String tagName = "lfhp";
        String gameName = "keoP";
        //Test
        String test = riotAccountService.getRiotAccountPuuidByRiotId(gameName, tagName);
        assertEquals("O7UOyU08FLv6CqVjTpsCzpsCrLMAzkXPjhHwaGwEirNyB7nxhWXGJPHL2fqKJLZPOldv3JtHFSCxqw", test);
    }
}