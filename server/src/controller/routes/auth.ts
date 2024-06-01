import { Request, Response } from "express";
import UserAuth, { IRequest } from "../../utils/database/models/userAuth";

export const requestVerification_post = async (req: Request, res: Response) => {
    const { code, type } = req.body;

    if (!code || !type) return res.status(400).json({ success: false, message: "Code and type are required." });

    const userData = await UserAuth.findOne({ "requests.code": code }).catch(() => { });

    if (!userData) return res.status(404).json({ success: false, message: "Request code not found." });

    const requestData: IRequest | undefined = userData.toObject({ virtuals: true }).requests?.find((request: IRequest) => request.code === code);

    if (!requestData) return res.status(404).json({ success: false, message: "Reset code not found." });

    if (requestData.expiresAt && requestData.expiresAt > new Date() && requestData.type === type) {
        return res.status(200).json({ success: true, message: "Code is valid. You can proceed with the reset." });
    } else {
        return res.status(400).json({ success: false, message: "Code is expired." });
    }
};
