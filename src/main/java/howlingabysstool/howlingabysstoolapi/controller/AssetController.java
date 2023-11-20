package howlingabysstool.howlingabysstoolapi.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/asset")
public class AssetController {

    private static final String IMAGE_DIR = "../../../resources/ddragon/13.22.1.img/champion/";

    @GetMapping("/{championName}")
    public ResponseEntity<byte[]> getChampionSquare(@PathVariable String championName) throws IOException {
        Path imagePath = Paths.get(IMAGE_DIR, championName);
        if (Files.exists(imagePath)) {
            byte[] imageBytes = Files.readAllBytes(imagePath);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);

            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
