import axios from "axios";
import config from "./config";

const fetchSettings  = async() => {
    try {
        const response = await axios.get(`${config.API_URL}/api/settings`);
        return response.data.settings[0];
    } catch (err) {
        console.error("error:", err);
        return null;
    }
}

export default fetchSettings ;