import getRequest from "../request";

const followedOnUser_API = async (
    id
) => {
    try {
        const data = await (await getRequest()).get("follow/followed-on-him/" + id);

        if(data.status == 200) {
            return data.data;
        }
        
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
}

export default followedOnUser_API;