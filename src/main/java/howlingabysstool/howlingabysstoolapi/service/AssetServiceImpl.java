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

    private final String ASSET_DIR = ".\\src\\main\\resources\\ddragon\\13.22.1\\img\\";
    public AssetServiceImpl() {
    }
    @Override
    public Optional<byte[]> getAsset(String subDir, String asset) {
        String dir = ASSET_DIR + subDir;
        String assetPng = asset + ".png";
        Path imagePath = Paths.get(dir, assetPng);
        System.out.println(imagePath);
        try {
            byte[] imageBytes = Files.readAllBytes(imagePath);
            Optional<byte[]> result = Optional.of(imageBytes);
            return result;
        } catch (Exception error) {
            Optional<byte[]> result =  Optional.empty();
            return result;
        }

    }
}
