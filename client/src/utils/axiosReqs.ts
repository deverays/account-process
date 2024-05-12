import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

const getReq = async (endpoint: string) => {
    return axios
        .get(`${VITE_API_BASE_URL}/api${endpoint}`, {
            headers: {
                authorization: `Bearer ${JSON.parse(localStorage.getItem("user_data") ?? "{}")?.access_token ??
                    null
                    }`,
            },
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
