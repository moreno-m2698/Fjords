package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.domain.FjordDbModels.MatchParticipant;
import howlingabysstool.howlingabysstoolapi.domain.RiotMatch.RiotMatch;

import java.util.List;

public interface RiotMatchService {
    public RiotMatch getMatchByMatchId(String matchId);
    public List<String> getAramMatchIdsByPuuid(String puuid, int amount);
    public MatchParticipant getMatchParticipantByAccountIdAndMatchId(String riotAccountId, String matchId);
}
