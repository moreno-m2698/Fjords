
export interface Summoner {
    puuid: string,
    name: string,
    tagline: string,
    profileIconId: number,
    summonerLevel: number
}
export interface MatchParticipant {
    matchId: string,
    matchIndex: number,
    assists: number,
    champLevel: number,
    championId: number,
    championName: string,
    deaths: number,
    item0: number,
    item1: number,
    item2: number,
    item3: number,
    item4: number,
    item5: number,
    item6: number,
    kills: number,
    riotIdName: string,
    riotIdTagline: string,
    summonerName:string,
    summoner1Id: number,
    summoner2Id: number,
    win: boolean

}
export interface FjordFrame {
    timestamp: number,
    damageDone: number,
    damageTaken: number,
    gold: number
}

export type FjordTimeline = {
    [key: string]: FjordFrame[];
}
