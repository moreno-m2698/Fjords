import axios from "axios"
// Can probably try some promise chaining in the future to get better at it


export async function getRiotAccountByRiotId( gameName: string, tagLine: string ){
    try {
        const endpoint = "/api/account/by-riot-id/" + gameName + "/" + tagLine;
        const response = await axios.get(endpoint, { responseType: "json" });
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }

}

export async function getSummonerDataByName( summonerName: string ) {
    try {
        const endpoint = "/api/summoner/by-name/" + summonerName;
        const response = await axios.get(endpoint, { responseType: "json" });
        return response
    } catch (error) { 
        console.log(error);
    }
}

export async function getSummonerDataByPuuid( puuid: string ) {
    try {
        const endpoint = "/api/summoner/by-puuid/" + puuid;
        const response = await axios.get(endpoint, {responseType: "json"});
        return response
    } catch (error) {
        return error;
    }
}

export async function getMatchDataById( matchId: string ) {
    try {
        const endpoint = "/api/match/" + matchId;
        const response = await axios.get(endpoint, {responseType: "json"});
        return response;
    } catch (error) {
        console.log(error);
    }
}
