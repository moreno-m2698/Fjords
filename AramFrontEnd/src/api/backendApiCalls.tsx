import axios from "axios"
const isTest = true;
const root = isTest ? process.env.VITE_TEST_ENDPOINT : process.env.VITE_DEV_ENDPOINT


export async function getSummonerDataByPuuid( puuid: string ) {
    try {
        let endpoint = root + "/api/summoner/by-puuid/" + puuid;
        const response = await axios.get(endpoint, {responseType: "json"});
        return response
    } catch (error) {
        return error;
    }
}
async function getSummonerPuuid( byRiotId: boolean) {
    try {
        
    }
}