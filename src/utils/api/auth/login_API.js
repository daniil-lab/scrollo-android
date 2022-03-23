import getRequest from "../request";
import base64 from 'base-64';

const login_API = async (
    login,
    password
) => {
    try {
        const data = await (await getRequest()).post("auth/login", {
            login,
            password: base64.encode(password)
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

export default login_API;