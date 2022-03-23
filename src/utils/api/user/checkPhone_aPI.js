import getRequest from "../request";

const checkEmail_API = async (
    phone
) => {
    try {
        const data = await (await getRequest()).get("user/check-phone/" + phone + "/");

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