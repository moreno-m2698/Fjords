package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.configuration.RiotAPIConfig;
import howlingabysstool.howlingabysstoolapi.domain.FjordDbModels.Match;
import howlingabysstool.howlingabysstoolapi.domain.FjordDbModels.MatchParticipant;
import howlingabysstool.howlingabysstoolapi.domain.RiotMatch.RiotMatch;
import howlingabysstool.howlingabysstoolapi.domain.RiotMatch.RiotParticipant;
import howlingabysstool.howlingabysstoolapi.repository.MatchParticipantRepository;
import howlingabysstool.howlingabysstoolapi.repository.MatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RiotMatchServiceImpl implements RiotMatchService {

    @Autowired
    private RiotAPIConfig myConfig;
    private final String apiUrl = "https://americas.api.riotgames.com/lol/match/v5/matches/";
    private final RestTemplate restTemplate;
    @Autowired
    private final MatchParticipantRepository matchParticipantRepository;

    @Autowired
    private final MatchRepository matchRepository;

    public RiotMatchServiceImpl(RestTemplate restTemplate, MatchParticipantRepository matchParticipantRepository, MatchRepository matchRepository) {
        this.restTemplate = restTemplate;
        this.matchParticipantRepository = matchParticipantRepository;
        this.matchRepository = matchRepository;
    }

    @Override
    public RiotMatch getMatchByMatchId(String matchId) {
        String fullApiUrl = apiUrl + matchId + "/?api_key=" + myConfig.getKey();
        RiotMatch match = restTemplate.getForObject(fullApiUrl, RiotMatch.class);
        return match;
    }

    @Override
    public List<String> getAramMatchIdsByPuuid(String puuid, int amount) {
        String fullApiString = apiUrl + "by-puuid/" + puuid + "/ids?queue=" + MatchQueueEnum.ARAM.queueId + "&" + "start=0&count=" + amount + "&api_key=" + myConfig.getKey();
        return restTemplate.getForObject(fullApiString, List.class);
    }


    public List<MatchParticipant> convertRiotMatchToMatchParticipants(RiotMatch riotMatch, String matchId) {
        List<String> riotParticipantIds = riotMatch.getMetadata().getParticipants();
        List<RiotParticipant> riotMatchParticipants = riotMatch.getInfo().getParticipants();
        List<MatchParticipant> matchParticipants = new ArrayList<>();
        for (int i = 0; i < riotMatchParticipants.size(); i++) {
            MatchParticipant matchParticipant = new MatchParticipant(riotMatchParticipants.get(i));
            matchParticipant.setMatchParticipantId(matchId + "-" + riotParticipantIds.get(i));
            matchParticipant.setMatchIndex(i);
            matchParticipant.setMatchId(matchId);
            matchParticipant.setRiotAccountId(riotParticipantIds.get(i));
            matchParticipants.add(matchParticipant);
        }
        return matchParticipants;

    }

    @Override
    public MatchParticipant getMatchParticipantByAccountIdAndMatchId(String riotAccountId, String matchId) {
        String pk = matchId + "-" + riotAccountId;

        //Need to check if in database first
        if (matchParticipantRepository.matchParticipantIsInById(pk) == 1) {
            Optional<MatchParticipant> cacheResult = matchParticipantRepository.getMatchParticipant(pk);
            return cacheResult.get();
        }

        RiotMatch riotMatch = getMatchByMatchId(matchId);
        Match match = new Match();
        match.setMatchId(matchId);
        match.setQueueId(riotMatch.getInfo().getQueueId());
        matchRepository.save(match);

        List<String> riotParticipants= riotMatch.getMetadata().getParticipants();
        List<MatchParticipant> matchParticipants = convertRiotMatchToMatchParticipants(riotMatch, matchId); //Maybe we can use a tree to store

        for (MatchParticipant matchParticipant: matchParticipants) {
            matchParticipantRepository.save(matchParticipant);
        }
        int index = riotParticipants.indexOf(riotAccountId);
        return matchParticipants.get(index);

    }
}
