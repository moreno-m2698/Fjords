package howlingabysstool.howlingabysstoolapi.service;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.Optional;

@Service
public class AssetServiceImpl implements AssetService {

    //TODO: CTRL+SHIFT+T for tests

    private final String PATCH_VERSION = "14.1.1";
    private final String ASSET_DIR = "ddragon/" + PATCH_VERSION + "/img/";

    public AssetServiceImpl() {
    }

    @Override
    public Optional<byte[]> getAsset(String subDir, String asset) {
        String dir = ASSET_DIR + subDir;
        String assetPng = asset + ".png";

        try {
            ClassPathResource resource = new ClassPathResource(dir + "/" + assetPng);
            InputStream inputStream = resource.getInputStream();
            byte[] imageBytes = inputStream.readAllBytes();
            System.out.println("Retrieving asset at: " + resource.getPath());
            return Optional.of(imageBytes);
        } catch (IOException error) {
            System.out.println("Asset not found at: " + dir + "/" + assetPng);
            return Optional.empty();
        }
    }
}