import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

const getReq = async (endpoint: string) => {
    const userData = localStorage.user_data;
    const accessToken = userData ? JSON.parse(userData)?.access_token : null

    return axios
        .get(`${VITE_API_BASE_URL}/api${endpoint}`, {
            headers: { Authorization: `Bearer ${accessToken}` }
        })
        .then((response) => {
            return response;
        });
};

const postReq = async (endpoint: string, data: object) => {
    return axios
        .post(`${VITE_API_BASE_URL}/api${endpoint}`, {
            ...data,
        })
        .then((response) => {
            return response;
        });
};

export { getReq, postReq };
