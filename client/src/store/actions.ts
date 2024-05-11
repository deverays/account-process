import { getReq } from "../utils/axiosReqs";
import { useRouter } from "vue-router";

interface UserData {
    access_token?: string;
}

export default {
    async initUser() {
        const userData: UserData = JSON.parse(
            localStorage.getItem("user_data") ?? "{}"
        );

        if (!userData.access_token) {
            (this as any)._isLoading = false;
            return;
        }

        (this as any).isLoading = true;

        const getUser = async () => {
            return await getReq("/user");
        };

        try {
            const response = await this.makeRequest(getUser);
            if (response.data.success) {
                (this as any)._isLogin = true;
                (this as any).getters._getUser = response.data.user_data;
            }
        } finally {
            (this as any)._isLoading = false;
        }
    },

    async makeRequest(this: any, requestFunc: () => Promise<any>) {
        try {
            const response = await requestFunc();
            return response;
        } catch (err: any) {
            await this.handleRateLimit(err, () => this.makeRequest(requestFunc));
            if (err?.response?.status === 401) {
                console.log(err.response.data)
                //this.handleUnauthorized();
            }
            throw err;
        }
    },

    async handleRateLimit(
        this: any,
        err: any,
        retryCallback: () => Promise<any>
    ) {
        if (err?.response?.data?.message === "You are being rate limited.") {
            const retryAfter = err.response.data.retry_after || 1;
            setTimeout(retryCallback, retryAfter * 1300);
        }
    },

    handleUnauthorized() {
        const router = useRouter();
        router.push("/logout");
    },
};
