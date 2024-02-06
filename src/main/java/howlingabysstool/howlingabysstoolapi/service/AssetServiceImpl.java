package howlingabysstool.howlingabysstoolapi.service;

import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

@Service
public class AssetServiceImpl implements AssetService{

    //TODO: CTRL+SHIFT+T for tests

    private final String PATCH_VERSION = "14.1.1";
    private final String ASSET_DIR = "classpath:ddragon/" + PATCH_VERSION + "/img/";
    public AssetServiceImpl() {
    }
    @Override
    public Optional<byte[]> getAsset(String subDir, String asset) {
        String dir = ASSET_DIR + subDir;
        String assetPng = asset + ".png";
        Path imagePath = Paths.get(dir, assetPng);
        try {
            System.out.println("Retrieving asset at: " + imagePath);
            byte[] imageBytes = Files.readAllBytes(imagePath);
            Optional<byte[]> result = Optional.of(imageBytes);
            return result;
        } catch (Exception error) {

            //I dont think i need to return anything if there is an error
            System.out.println("Asset not found at: " + imagePath);
            Optional<byte[]> result =  Optional.empty();
            return result;
        }

    }


}
