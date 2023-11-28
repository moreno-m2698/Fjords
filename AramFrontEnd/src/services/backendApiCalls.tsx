import axios from "axios"
// Can probably try some promise chaining in the future to get better at it

//Have redirects for all functions that map me to users if they do not exist


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

export async function getSummonerDataByNamePromise( summonerName: string ) {
    const endpoint = "/api/summoner/by-name/" + summonerName;
    return axios
        .get(endpoint, { responseType: "json" })
        .then( response => response.data )
        .catch((error) => console.log("Error grabbing summoner data:" + error))
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

export async function getMatchIdsByPuuid( puuid: string, amount: number ) {
    try {
        const endpoint = "/api/match/request/" + amount + "/" + puuid;
        const response = await axios.get(endpoint, {responseType: "json"});
        return response;
    } catch (error) {
        console.log(error);
    }
}


export async function getMatchIdsByPuuidPromise( puuid: string, amount: number ) {
    const endpoint = "/api/match/request/" + amount + "/" + puuid;
    return axios
        .get(endpoint,  { responseType: "json" })
        .then( response => response.data )
        .catch(error => console.log("Error grabbing match ids" + error));
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



export async function getMatchTimelineByMatchId( matchId: string ) {
    try {
        const endpoint = "/api/timeline" + matchId;
        const response = await axios.get(endpoint, { responseType: "json" });
        return response;
    } catch ( error ) { 
        console.log(error);
    }
}