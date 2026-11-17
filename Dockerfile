FROM amazoncorretto:17-al2023-headless
WORKDIR /app
COPY target/fjords-application-1.jar /app/app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-Xmx384m", "-XX:MaxMetaspaceSize=160m", "-XX:+UseSerialGC", "-Xss512k", "-jar", "/app/app.jar"]
