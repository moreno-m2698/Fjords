import axios from "axios";
import { AxiosResponse } from "axios";
import { Summoner, FjordFrame, FjordTimeline, MatchParticipant } from "../types";
//Have redirects for all functions that map me to users if they do not exist

//TODO: add enumerations to the timeline and the match calls to help distinguish between the two in
// network tab.

export async function getSummonerByRiotId( gameName: string, tagLine: string) {
    const endpoint = "/api/summoner/by-riot-id/" + gameName + "/" + tagLine;
    try {
        const response: AxiosResponse<Summoner, any> = await axios.get(endpoint, { responseEncoding: "json" });
        return response.data;
    } catch (error) {
        console.log("Error grabbing summoner data: " + error);
    }
}


export async function getMatchIdsByPuuid( puuid: string, amount: number ) {
    try {
        const endpoint = "/api/match/request/" + amount + "/" + puuid;
        const response: AxiosResponse<string[], any> = await axios.get(endpoint, {responseType: "json"});
        return response.data;
    } catch (error) {
        console.log("There was an error grabbing match id list: " + error);
    }
}

export async function getMatchParticipant( puuid: string, matchId: string ) {
    const endpoint = "/api/match/matchParticipant/" + puuid + "/" + matchId;
    try {
    const response: AxiosResponse<MatchParticipant, any> = await axios.get(endpoint, { responseType: "json" });
    return response.data;
    } catch (error) {
        console.log("There was an error grabbing this match participant: " + puuid + "-" + matchId);
    }
}

export async function getMatchTimelineByMatchId( matchId: string ) {
    try {
        const endpoint = "/api/timeline/" + matchId;
        const response: AxiosResponse<FjordTimeline, any> = await axios.get(endpoint, { responseType: "json" });
        return response.data;
    } catch ( error ) { 
        console.log("There was an error grabbing timeline for this match: " + matchId + " : " + error);
    }
}