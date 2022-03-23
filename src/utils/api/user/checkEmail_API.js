import getRequest from "../request";

const checkEmail_API = async (
    email
) => {
    try {
        const data = await (await getRequest()).get("user/check-email/" + email + "/");

        if(data.status == 200) {
            return data.data;
        }
        
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
}

export default checkEmail_API;