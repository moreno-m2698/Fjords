package howlingabysstool.howlingabysstoolapi.service;

public enum MatchQueueEnum {
    ARAM(450);

    final int queueId;
    MatchQueueEnum ( int queueId ) {
        this.queueId = queueId;
    }
}
