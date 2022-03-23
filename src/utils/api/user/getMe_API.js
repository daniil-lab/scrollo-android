import getRequest from "../request";

const getMe_API = async (
) => {
    try {
        const data = await (await getRequest()).get("user/me");

        if(data.status == 200) {
            return data.data;
        }
        
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
}

export default getMe_API;