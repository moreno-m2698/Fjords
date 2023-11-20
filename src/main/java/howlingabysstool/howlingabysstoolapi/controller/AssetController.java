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

    private static final String ASSET_DIR   = ".\\src\\main\\resources\\ddragon\\13.22.1\\img";

    @GetMapping("/square/{championName}")
    public ResponseEntity<byte[]> getChampionSquare(@PathVariable String championName) throws IOException {
        String championDir = ASSET_DIR + "\\champion";
        Path imagePath = Paths.get(championDir, championName);
        System.out.println(imagePath);
        if (Files.exists(imagePath)) {
            byte[] imageBytes = Files.readAllBytes(imagePath);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_PNG);
            return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/item/{itemId}")
    public ResponseEntity<byte[]> getItemAsset(@PathVariable String itemId) throws IOException {
        String itemDir = ASSET_DIR + "\\item";
        Path imagePath = Paths.get(itemDir, itemId);
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
