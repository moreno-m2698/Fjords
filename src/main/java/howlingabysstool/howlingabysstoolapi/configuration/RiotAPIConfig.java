package howlingabysstool.howlingabysstoolapi.configuration;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.annotation.Configuration;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

@Configuration
@Getter
@Setter
public class RiotAPIConfig {
    private String key;
    public RiotAPIConfig() throws IOException {
        String file ="src/main/resources/productionKey.txt";
        BufferedReader reader = new BufferedReader(new FileReader(file));
        String key = reader.readLine();
        reader.close();
        this.key = key;
        System.out.println(key);
    }
}
