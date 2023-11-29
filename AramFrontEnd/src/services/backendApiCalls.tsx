import axios from "axios";
import { AxiosResponse } from "axios";
import { Summoner, Match, Timeline } from "../types";
//Have redirects for all functions that map me to users if they do not exist
// export async function getRiotAccountByRiotId( gameName: string, tagLine: string ){
//     try {
//         const endpoint = "/api/account/by-riot-id/" + gameName + "/" + tagLine;
//         const response = await axios.get(endpoint, { responseType: "json" });
//         return response;
//     } catch (error) {

//         console.log(error);
//     }

// }

export async function getSummonerByName( summonerName: string) {
    const endpoint = "/api/summoner/by-name/" + summonerName;
    try {
        const response: AxiosResponse<Summoner, any> = await axios.get(endpoint, {responseEncoding: "json"});
        return response.data;
    } catch (error) {
        console.log("Error grabbing summoner data:" + error)
    }
}

// export async function getSummonerDataByPuuid( puuid: string ) {
//     try {
//         const endpoint = "/api/summoner/by-puuid/" + puuid;
//         const response = await axios.get(endpoint, {responseType: "json"});
//         return response
//     } catch (error) {
//         return error;
//     }
// }

export async function getMatchIdsByPuuid( puuid: string, amount: number ) {
    try {
        const endpoint = "/api/match/request/" + amount + "/" + puuid;
        const response: AxiosResponse<string[], any> = await axios.get(endpoint, {responseType: "json"});
        return response.data;
    } catch (error) {
        console.log("There was an error grabbing match id list: " + error);
    }
}


export async function getMatchByMatchId( matchId: string ) {
    const endpoint = "/api/match/" + matchId;
    try {
        const response: AxiosResponse<Match,any> = await axios.get(endpoint, { responseType: "json" });
        return response.data;
    } catch (error) {
        console.log("There was an error grabbing this match: " + matchId + " : " + error);
    }
}

export async function getMatchTimelineByMatchId( matchId: string ) {
    try {
        const endpoint = "/api/timeline/" + matchId;
        const response: AxiosResponse<Timeline, any> = await axios.get(endpoint, { responseType: "json" });
        return response.data;
    } catch ( error ) { 
        console.log("There was an error grabbing timeline for this match: " + matchId + " : " + error);
    }
}