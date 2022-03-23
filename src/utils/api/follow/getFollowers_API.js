import getRequest from "../request";

const getFollowers_API = async (
    page,
    pageSize
) => {
    try {
        const params = new URLSearchParams();

        params.append("page", page);
        params.append("pageSize", pageSize);

        const data = await (await getRequest()).get("follow/followers/me?" + params.toString());

        if(data.status == 200) {
            return data.data;
        }
        
        return null;
    } catch(e) {
        console.log(e);
        return null;
    }
}

export default getFollowers_API;