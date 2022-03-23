import getRequest from "../request";

const getById_API = async (
    id
) => {
    try {
        const data = await (await getRequest()).get("user/" + id);

        if(data.status == 200) {
            return data.data;
        }
        
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
}

export default getById_API;