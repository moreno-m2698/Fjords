import axios from "axios";

export async function getChampionSquare( championName: string ) {
    try {
        const endpoint =  "/api/asset/champion/" + championName;
        const response = await axios.get(endpoint, { responseType: "blob" });
        const imageBlob = new Blob([response.data], { type: "image/png" });
        const imageURL = URL.createObjectURL(imageBlob)
        return imageURL;
    } catch (error) {
        console.log(error);
    }
}

export async function getItemAsset ( itemId: string ) {
    try {
        const endpoint = "/api/asset/item/" + itemId;
        const response = await axios.get(endpoint, { responseType: "blob" });
        const imageBlob = new Blob([response.data], { type: "image/png" });
        const imageURL = URL.createObjectURL(imageBlob)
        return imageURL;
    } catch (error) {
        console.log(error);
    }
}


