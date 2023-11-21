package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.domain.Match;

import java.util.List;

public interface MatchService {
    public Match getMatchByMatchId(String matchId);
    public List<String> getAramMatchIdsByPuuid(String puuid, int amount);
}
