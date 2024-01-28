package howlingabysstool.howlingabysstoolapi.integration.controller;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertArrayEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
public class AssetControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetImage() throws Exception {
        String PATCH_VERSION = "14.1.1";
        byte[] responseBytes = mockMvc.perform(MockMvcRequestBuilders.get("/api/asset/item/1001")
                .contentType(MediaType.IMAGE_PNG))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsByteArray();

        Path expectedImagePath = Paths.get("src\\main\\resources\\ddragon\\" + PATCH_VERSION + "\\img\\item\\1001.png");
        byte[] expectedBytes = Files.readAllBytes(expectedImagePath);

        assertArrayEquals(expectedBytes, responseBytes);
    }
}
