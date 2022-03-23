import getRequest from "../request";
import base64 from 'base-64';

const signIn_API = async (
    login,
    name,
    email,
    password
) => {
    try {
        const data = await (await getRequest()).post("auth/signin", {
            login,
            name,
            email,
            password: base64.encode(password)
        });
    
        if(data.status == 201) {
            return data.data;
        }
        
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
}

export default signIn_API;