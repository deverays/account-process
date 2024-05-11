import { getReq, postReq } from "../utils/axiosReqs";
import { useRouter } from "vue-router";

type UserData = {
    access_token?: string;
};

const ActionTypes = {
    SAVE_GUILD_STATE: "saveGuildState",
};

export default {
    async initUser() {
        const userData: UserData = JSON.parse(
            localStorage.getItem("user_data") ?? "{}"
        );

        if (!userData.access_token) {
            (this as any)._isLoading = false;
            return;
        }

        (this as any)._isLoading = true;

        const getUser = async () => {
            return await getReq("/user");
        };

        try {
            const response = await this.makeRequest(getUser);
            if (response.data.success) {
                (this as any).getters._getUser = response.data;
                (this as any)._isLogin = true;
            }
        } finally {
            (this as any)._isLoading = false;
        }
    },

    async initGuild() {
        const userData: UserData = JSON.parse(
            localStorage.getItem("user_data") ?? "{}"
        );

        if (!userData.access_token) {
            return false;
        }

        const getGuilds = async () => {
            return await getReq("/guilds");
        };

        const response = await this.makeRequest(getGuilds);
        if (response.data.success) {
            (this as any).getters._getGuilds = response.data;
        }

        return response;
    },

    async dispatch(
        actionType: keyof typeof ActionTypes,
        { guild_id, data }: { guild_id?: string; data: object }
    ) {
        switch (actionType) {
            case ActionTypes.SAVE_GUILD_STATE:
                return await postReq(`/guilds/${guild_id}`, data);
            default:
                throw new Error(`Unknown action type: ${actionType as string}`);
        }
    },

    async makeRequest(this: any, requestFunc: () => Promise<any>) {
        try {
            const response = await requestFunc();
            return response;
        } catch (err: any) {
            await this.handleRateLimit(err, () => this.makeRequest(requestFunc));
            if (err?.response?.status === 401) {
                console.log(err.response.data);
                this.handleUnauthorized();
            }
            throw err;
        }
    },

    handleRateLimit(err: any, retryCallback: () => Promise<any>) {
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
