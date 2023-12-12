

export async function getAsset( identifier: string, folder: string) {
    try {
        return "/api/asset/" + folder + "/" + identifier;
    } catch (error) {
        console.log("There was an error grabbing this asset: " + folder + ": " + identifier)
    }
}

export async function getChampionAsset( championName: string ) {
    try {
        const endpoint =  "/api/asset/champion/" + championName;
        return endpoint;
    } catch (error) {
        console.log("There was an error grabbing asset for: " + championName + " : " + error);
        
    }
}

export async function getItemAssetFromItemId( itemId: number ){
    const endpoint = "/api/asset/item/" + itemId;
    try {

        return endpoint
    } catch (error) {
        console.log("There was an error grabbing asset for: " + itemId + " : " + error);
    }
}

export async function getProfileIconAsset( profileId: number ) {
    try {
        const endpoint = "/api/asset/profileicon/" + profileId;

         return endpoint;
    } catch (error) {
        console.log(error);
    }
}
