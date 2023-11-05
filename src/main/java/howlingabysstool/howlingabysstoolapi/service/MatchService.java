package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.domain.Match;

import java.util.List;

public interface MatchService {
    public Match getMatchById(String matchId);
    public List<String> getMatchIdsByPuuid(String puuid, int amount);
}
