import getRequest from "../request";

const checkLogin_API = async (
    email
) => {
    try {
        const data = await (await getRequest()).get("user/check-login/" + email + "/");

        if(data.status == 200) {
            return data.data;
        }
        
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
}

export default checkLogin_API;