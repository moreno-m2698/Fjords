package howlingabysstool.howlingabysstoolapi.integration.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class MatchControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGet5MatchList() throws Exception {
        String testPuuid = "O7UOyU08FLv6CqVjTpsCzpsCrLMAzkXPjhHwaGwEirNyB7nxhWXGJPHL2fqKJLZPOldv3JtHFSCxqw";
        mockMvc.perform(MockMvcRequestBuilders.get("/api/match/request/5/"+testPuuid))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testGetMatch() throws Exception {
        String matchId = "NA1_4880422007";
        mockMvc.perform(MockMvcRequestBuilders.get("/api/match/"+matchId))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void testGetMatchParticipant() throws Exception {
        String matchId = "NA1_4880422007";
        String testPuuid = "O7UOyU08FLv6CqVjTpsCzpsCrLMAzkXPjhHwaGwEirNyB7nxhWXGJPHL2fqKJLZPOldv3JtHFSCxqw";
        mockMvc.perform(MockMvcRequestBuilders.get("/api/match/matchParticipant/" + testPuuid + "/" + matchId))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
