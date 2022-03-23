import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const getRequest = async () => {
    const request = axios.create({
        baseURL: 'http://10.55.153.25:8080/api/v1/'
    });
    
    const token = await AsyncStorage.getItem("token");
    
    if(token != null)
        request.defaults.headers.common["Authorization"] = "Bearer " + token;

    return request;
}

export default getRequest;
