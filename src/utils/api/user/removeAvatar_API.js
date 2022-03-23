import getRequest from "../request";

const removeAvatar_API = async (
) => {
    try {
        const data = await (await getRequest()).delete("user/avatar");

        if(data.status == 200) {
            return data.data;
        }
        
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
}

export default removeAvatar_API;