package howlingabysstool.howlingabysstoolapi.controller;

import howlingabysstool.howlingabysstoolapi.domain.Summoner;
import howlingabysstool.howlingabysstoolapi.service.SummonerService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/summoner")
public class SummonerController {
    private final SummonerService summonerService;
    public SummonerController(SummonerService summonerService) {
        this.summonerService = summonerService;
    }
    @GetMapping("/by-name/{summonerName}") //This will be deprecated in favor of riot id's in the future
    public Summoner getSummonerByName(@PathVariable String summonerName) {

        return summonerService.getSummonerByName(summonerName);
    }
    @GetMapping("/by-puuid/{puuid}")
    public Summoner getSummonerByPuuid(@PathVariable String puuid){
        return summonerService.getSummonerByPuuid(puuid);
    }
    @GetMapping("/level/by-name/{summonerName}")
    public Integer getLevel(@PathVariable String summonerName) {
        return summonerService.getSummonerByName(summonerName).getSummonerLevel();
    }


}
