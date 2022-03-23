import getRequest from "../request";
import base64 from 'base-64';

const refresh_API = async (
    refreshToken
) => {
    try {
        const data = await (await getRequest()).post("auth/refresh", {
            refreshToken
        });
    
        if(data.status == 200) {
            return data.data;
        }
        
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
}

export default refresh_API;