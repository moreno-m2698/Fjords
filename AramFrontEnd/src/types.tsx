
export interface Summoner {
    puuid: string,
    name: string,
    profileIconId: number,
    summonerLevel: number
}
export interface Match {
    metadata: matchMetadata,
    info: matchInfo
}
export interface matchMetadata {
    participants: string[]
}
interface matchInfo {
    participants: matchParticipant[],
    queueId: number
}
export interface matchParticipant {
    assists: number,
    challenges: Challenges,
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
    win: boolean
}
interface Challenges {
    kda: number,
    poroExplosions: number,
    snowballsHit: number
}

export interface Timeline {
    frames: timelineFrame[],
    participants: timelineParticipant[]
}

interface timelineFrame {
    participantFrames: Map<string, timelineParticipantFrame>,
    timestamp: number
}

interface timelineParticipantFrame {
    damageStats: timelineDamageStats,
    totalGold: number
}

interface timelineDamageStats {
    totalDamageDoneToChampions: number,
    totalDamageTaken: number
}
interface timelineParticipant {
    participantId: number,
    puuid: string
}