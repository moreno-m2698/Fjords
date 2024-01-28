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

import javax.swing.*;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class MatchTimelineControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetTimeline() throws Exception {
        String testMatchId = "NA1_4880422007";
        mockMvc.perform(MockMvcRequestBuilders.get("/api/timeline/"+testMatchId))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

}
