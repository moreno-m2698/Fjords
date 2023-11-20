import axios from "axios";

export async function getChampionSquare( championPng: string ) {
    try {
        const endpoint =  "/api/asset/square/" + championPng;
        const response = await axios.get(endpoint, { responseType: "blob" });
        const imageBlob = new Blob([response.data], { type: "image/png" });
        const imageURL = URL.createObjectURL(imageBlob)
        return imageURL;
    } catch (error) {
        console.log(error);
    }
}

export async function getItemAsset ( itemPng: string ) {
    try {
        const endpoint = "/api/asset/item/" + itemPng;
        const response = await axios.get(endpoint, { responseType: "blob" });
        const imageBlob = new Blob([response.data], { type: "image/png" });
        const imageURL = URL.createObjectURL(imageBlob)
        return imageURL;
    } catch (error) {
        console.log(error);
    }
}


