# Fjords

Fjords is a data visualization web application created to present data from the game League of Legends for its ARAM gamemode. This project was started in November 2023 as a challenge to help myself learn about Java, the Spring Boot framework, GitHub Actions, and Test Driven Design.

If you are interested in seeing the product the link can be found [here](http://3.133.159.219:8080/) (If the EC2 is running try using "Umbrall" as the Summoner Name and "NA1" for the tagline or try your own id if available).

## Hosting your own instance

If you are unable to see the application and would like to use it for reference you can do so as follows:
First clone the repository using 
```
git clone https://github.com/moreno-m2698/Fjords.git
```
You will then need to go the the [Riot Developer Portal](https://developer.riotgames.com/) to create an account and get a developer key. You can then do create a new txt file at the same location as `exampleProductionKey.txt` named  `productionKey.txt` using your developer key.

Optionally:

You can access the public Docker image using 
```
docker pull morenom2698/fjords-application:latest```
