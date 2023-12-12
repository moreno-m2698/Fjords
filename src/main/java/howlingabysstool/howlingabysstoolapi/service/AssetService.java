package howlingabysstool.howlingabysstoolapi.service;

import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface AssetService {
    public Optional<byte[]> getAsset(String assetName, String subDir);
}
