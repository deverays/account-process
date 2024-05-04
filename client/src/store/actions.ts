import { getReq } from "../utils/axiosReqs";

export default {
    async initUser() {
        const userData = localStorage.user_data;
        const accessToken = userData ? JSON.parse(userData)?.access_token : false
        if (!accessToken) return;

        const makeRequest = async () => {
            return getReq("/user")
                .then((res) => {
                    (this as any).getters._getUser = res.data.user_data;
                    (this as any)._isLogin = true;
                })
                .catch(async (err) => {
                    if (err.response.data.message == "You are being rate limited.")
                        setTimeout(makeRequest, err.response.data.retry_after * 1300);
                    if (err.response.status == 401) {
                        localStorage.removeItem("access_token");
                        window.location.href = "/";
                    }
                });
        };

        return makeRequest();
    },
};
