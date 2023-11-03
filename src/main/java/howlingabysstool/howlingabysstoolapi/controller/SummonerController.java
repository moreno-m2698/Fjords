package howlingabysstool.howlingabysstoolapi.controller;

import howlingabysstool.howlingabysstoolapi.domain.Summoner;
import howlingabysstool.howlingabysstoolapi.service.SummonerService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class SummonerController {
    private final SummonerService summonerService;
    public SummonerController(SummonerService summonerService) {
        this.summonerService = summonerService;
    }
    @GetMapping("/summoner/{summonerName}")
    public Summoner getData(@PathVariable String summonerName) {

        return summonerService.getSummonerByName(summonerName);
    }

    @GetMapping("/summoner/level/{summonerName}")
    public Integer getLevel(@PathVariable String summonerName) {
        return summonerService.getSummonerByName(summonerName).getSummonerLevel();
    }

}
