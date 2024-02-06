package howlingabysstool.howlingabysstoolapi.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

@Configuration
@ConfigurationProperties(prefix = "riot.api")
@Getter
@Setter
public class RiotAPIConfig {
    private String key;
}
