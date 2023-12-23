package howlingabysstool.howlingabysstoolapi.service;

import howlingabysstool.howlingabysstoolapi.domain.RiotAccount;

public interface RiotAccountService {
    public RiotAccount getRiotAccountByRiotId(String gameName, String tagLine);

    public String getRiotAccountPuuidByRiotId(String gameName, String tagLine);

    public RiotAccount test();
}
