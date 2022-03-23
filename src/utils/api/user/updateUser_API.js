import getRequest from "../request";

const updateUser_API = async (
    name,
    login,
    email,
    phone,
    region,
    bio,
    gender,
    website,
    accountType
) => {
    try {
        const data = await (await getRequest()).patch("user/", {
            name: name.length === 0 ? null : name,
            login: login.length === 0 ? null : login,
            email: email.length === 0 ? null : email,
            phone: phone.length === 0 ? null : phone,
            region: region.length === 0 ? null : region,
            bio: bio.length === 0 ? null : bio,
            gender: gender.length === 0 ? null : gender,
            website: website.length === 0 ? null : website,
            accountType: accountType.length === 0 ? null : accountType,
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

export default updateUser_API;