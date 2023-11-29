import axios from "axios";

export async function getChampionAsset( championName: string ) {
    try {
        const endpoint =  "/api/asset/champion/" + championName;
        const response = await axios.get(endpoint, { responseType: "blob" });
        const imageBlob = new Blob([response.data], { type: "image/png" });
        const imageURL = URL.createObjectURL(imageBlob);
        return imageURL;
    } catch (error) {
        console.log("There was an error grabbing asset for: " + championName + " : " + error);
        
    }
}

export const getItemAssetPromise = async ( itemId: number ) => {
    const endpoint = "/api/asset/item/" + itemId;
    return axios.get(endpoint, { responseType: "blob" }
    ).then( (response) => {
        const imageBlob = new Blob([response.data], { type: "image/png" });
        const imageURL = URL.createObjectURL(imageBlob);
        return imageURL;
    }).catch( (error) => {
        console.log("There was an error grabbing asset for: " + itemId + " : " + error);
    });
}

export async function getProfileIconAsset( profileId: number ) {
    try {
        const endpoint = "/api/asset/profileicon/" + profileId;
        const response = await axios.get(endpoint, { responseType: "blob" });
        const imageBlob = new Blob([response.data], { type: "image/png" });
        const imageUrl = URL.createObjectURL(imageBlob);
        return imageUrl;
    } catch (error) {
        console.log(error);
        return "";
    }
}


