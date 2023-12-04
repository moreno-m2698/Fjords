package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.domain.RiotAccount;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.jupiter.api.Assertions.*;

class RiotAccountServiceImplTest {

    @Autowired
    private RiotAccountService underTest;
    @Test
    void itShouldGetRiotAccountByRiotId() {
        //This test should grab my account and return a RiotAccount object: can't specify return values due to making
        //direct calls to the riot API

        //given
        String gameName = "keoP";
        String tagLine = "lfhp";
        //when
        RiotAccount account = underTest.getRiotAccountByRiotId(gameName, tagLine);
        //then
        assertNotNull(account);

    }
}