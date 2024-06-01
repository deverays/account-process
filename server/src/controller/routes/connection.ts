import { Request, Response } from "express";
import UserAuth, { IConnection } from "../../utils/database/models/userAuth";
import { getAccessToken_discord, getUserInfo_discord } from "../../utils/services/apiServices";
import { generateAccessToken } from "../auth/access";
import { generateId } from "../auth/id";

export const connectionDiscord_get = async (req: Request, res: Response) => {
    const { code } = req.query;

    if (!code) return res.status(400).json({ success: false, message: "Code is not found" });

    const accessTokenResponse = await getAccessToken_discord(code as string).catch(() => { });

    if (!accessTokenResponse || !accessTokenResponse.data?.access_token)
        return res.status(500).json({ success: false, message: "Internal server error" });

    const userInfoResponse = await getUserInfo_discord(accessTokenResponse.data.access_token).catch(() => { });

    if (!userInfoResponse || userInfoResponse.status !== 200)
        return res.status(401).json({ success: false, message: "Unauthorized" });

    const userInfo = userInfoResponse.data;
    const userData = await UserAuth.findOne({ email: userInfo.email });

    if (!userData) {
        const id = generateId({ username: userInfo.global_name });
        const access_token = generateAccessToken({ email: userInfo.email });
        let username = userInfo.username.split(".")[0].split("-")[0];
        if (await UserAuth.findOne({ username })) username += userInfo.id.slice(0, 4);

        await UserAuth.updateOne({ email: userInfo.email }, {
            $set: { password: null, username, id, connections: [{ type: "discord", expiresAt: new Date() }], access_token }
        }, { upsert: true }).catch(() => { });

        return res.status(201).json({ success: true, message: "New user created and Discord connection added", access_token });
    }

    const hasDiscordConnection = userData.connections.some((connection: IConnection) => connection.type === "discord");

    if (!hasDiscordConnection) {
        await UserAuth.updateOne({ email: userInfo.email }, {
            $push: { connections: [{ type: "discord", expiresAt: new Date() }] }
        }).catch(() => { });
        return res.status(201).json({ success: true, message: "Discord connection added", access_token: userData.access_token });
    }

    res.status(201).json({ success: true, message: "User already exists with Discord connection", access_token: userData.access_token });
};
