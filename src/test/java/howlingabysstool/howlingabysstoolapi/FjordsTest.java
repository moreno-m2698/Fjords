package howlingabysstool.howlingabysstoolapi;
import howlingabysstool.howlingabysstoolapi.domain.Summoner;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)

public class FjordsTest {
    @LocalServerPort
    private int PORT;
    private String BASE_URL = "http://localhost:";
    @Autowired
    private TestRestTemplate restTemplate;
    @Test
    void contextLoads() {
    }
    @Test
    void summonerShouldReturnKeoP() throws Exception {
        Summoner summoner = this.restTemplate.getForObject(BASE_URL+PORT+"/api/summoner/by-riot-id/keoP/lfhp", Summoner.class);
        assertThat(summoner.getName())
                .isNotNull()
                .as("check %s's name" , summoner.getName())
                .isEqualTo("keoP");
    }

    @Test
    void matchListShouldReturn5() throws Exception {
        String puuid = "K9XovvvNiucJYcYu8yPv5rBXH-Gv3bp_ONYg-OKzxUsG5YUz4g1ysaYbm568OQTP4xFGMKVj-CLhRw";
        List<String> matchlist = this.restTemplate.getForObject(BASE_URL+PORT+"/api/match/request/5/"+puuid, List.class);
        assertThat(matchlist.size())
                .isNotNull()
                .isEqualTo(5);
    }

}
