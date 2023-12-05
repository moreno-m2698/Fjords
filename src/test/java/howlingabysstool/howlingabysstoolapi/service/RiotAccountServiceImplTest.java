package howlingabysstool.howlingabysstoolapi.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class RiotAccountServiceImplTest {

    private RiotAccountService riotAccountService;
    //I keep getting null pointer exceptions!

    @Test
    void testGetRiotAccountPuuidByRiotId() {
        // Given
        String gameName = "keoP";
        String tagLine = "lfhp";

        // When
        String actualPuuid = riotAccountService.getRiotAccountPuuidByRiotId(gameName, tagLine);

        // Then
        assertNotNull(actualPuuid);
        // You may want to add more assertions based on your specific requirements
    }
}