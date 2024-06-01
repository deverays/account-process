import axios from "axios";
import { discord } from "../../../config.json";

const { client_id, client_secret, redirect_uri, token } = discord;

const baseConfig = {
    headers: { authorization: `Bearer ${token}` },
};

const axiosConfig = (token: string) => ({
    headers: { authorization: `Bearer ${token}` },
});

const getAxiosPostConfig = (data: URLSearchParams) => ({
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
});

export const getUserInfo_discord = async (token: string) => {
    return await axios.get("https://discord.com/api/users/@me", axiosConfig(token));
};

export const getAccessToken_discord = async (code: string) => {
    const data = new URLSearchParams({
        client_id,
        client_secret,
        grant_type: "authorization_code",
        redirect_uri,
        code,
    });

    return await axios.post("https://discord.com/api/oauth2/token", data, getAxiosPostConfig(data));
};

export const getUserGuilds_discord = async (token: string) => {
    return await axios.get("https://discord.com/api/users/@me/guilds", axiosConfig(token));
};

export const getdiscordGuilds_discord = async () => {
    return axios.get("https://discord.com/api/users/@me/guilds", baseConfig);
};
