FROM amazoncorretto:17
WORKDIR /app
COPY target/howling-abyss-tool-api-0.0.1-SNAPSHOT.jar howling-abyss-tool-api-0.0.1-SNAHPSHOT.jar
EXPOSE 8080
cmd ["java", "-jar", "howling-abyss-tool-api-0.0.1-SNAHPSHOT.jar"]