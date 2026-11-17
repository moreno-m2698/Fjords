package howlingabysstool.howlingabysstoolapi;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource(value = "classpath:productionKey.txt", ignoreResourceNotFound = true)
public class FjordsApplication {

	public static void main(String[] args) {
		SpringApplication.run(FjordsApplication.class, args);
	}

    }

