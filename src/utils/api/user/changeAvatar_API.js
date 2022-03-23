import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import CONFIG from "../../CONFIG";
import getRequest from "../request";
import RNFB from 'react-native-fetch-blob';

const changeAvatar_API = async (
    file
) => {
    try {
        const token = await AsyncStorage.getItem("token");

        await RNFB.fetch("PATCH", CONFIG.URL + "api/v1/user/avatar", {
            "Authorization": "Bearer " + token,
            "Content-Type": "multipart/form-data"
        }, [{ name : 'avatar', filename : 'avatar.png', data: RNFB.wrap(file)}])
    } catch (e) {
        return null;
    }
}

export default changeAvatar_API;