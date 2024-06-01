import { Request, Response } from "express";
import UserAuth from "../../utils/database/models/userAuth";
import { sendEmail } from "../../utils/services/emailServices";
import { generateAccessToken } from "../auth/access";
import { generateCode } from "../auth/code";
import { generateId } from "../auth/id"

export const usersSelf_get = async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(400).json({ success: false, message: "Access token is required." });

    const userData = await UserAuth.findOne({ access_token: token }).catch(() => { });

    if (!userData) return res.status(404).json({ success: false, message: "Account not found." });

    return res.status(200).json({ success: true, message: "User data retrieved successfully.", ...userData.toObject({ virtuals: true }) });
};

export const signin_post = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    if (!username || !password) return res.status(400).json({ success: false, message: "Username and password are required." });

    const userData = await UserAuth.findOne({ username }).catch(() => { });

    if (!userData) return res.status(404).json({ success: false, message: "Account not found." });
    if (userData.password !== password) return res.status(401).json({ success: false, message: "Incorrect password." });

    const verificationCode = Math.floor(1000 + Math.random() * 9000);
    await sendEmail({ to: userData.email, subject: "Signin Code", text: `Your sigin code: ${verificationCode}` }).catch(() => { });
    await UserAuth.updateOne({ access_token: userData.access_token }, { $push: { requests: { type: "signin", expiresAt: new Date(Date.now() + 180 * 1000), code: verificationCode } } });

    return res.status(200).json({ success: true, access_token: userData.access_token, verification_code: verificationCode, message: "Login successful!" });
};

export const signup_post = async (req: Request, res: Response) => {
    const { email, password, username } = req.body;

    if (!email || !password || !username) return res.status(400).json({ success: false, message: "Missing required fields: email, password, username." });

    const existingUser = await UserAuth.findOne({ $or: [{ username }, { email }] });
    if (existingUser?.username === username) return res.status(422).json({ success: false, message: "Username is already in use." });
    if (existingUser?.email === email) return res.status(409).json({ success: false, message: "Email is already in use." });

    const id = generateId({ username });
    const access_token = generateAccessToken({ email });

    await UserAuth.updateOne({ access_token }, { $set: { email, password, username, id } }, { upsert: true }).catch(() => { });

    return res.status(201).json({ success: true, message: "Registration successful!" });
};

export const forgotUsername_post = async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ success: false, message: "Email is required." });

    const userData = await UserAuth.findOne({ email }).catch(() => { });
    if (!userData) return res.status(404).json({ success: false, message: "User not found." });

    const expiresAt = new Date(Date.now() + 180 * 1000);

    await UserAuth.findOneAndUpdate({ email }, { $push: { requests: { type: "forgot-username", expiresAt } } }).catch(() => { });
    await sendEmail({ to: userData.email, subject: "Username Retrieval", text: `Your username is: ${userData.username}` }).catch(() => { });

    return res.status(200).json({ success: true, message: "Username retrieval email sent. Please check your email." });
};

export const forgotPassword_post = async (req: Request, res: Response) => {
    const { username, ref } = req.body;

    if (!username || !ref) return res.status(400).json({ success: false, message: "Username and ref are required." });

    const userData = await UserAuth.findOne({ username }).catch(() => { });
    if (!userData) return res.status(404).json({ success: false, message: "User not found." });

    const code = generateCode("180s");
    const expiresAt = new Date(Date.now() + 180 * 1000);
    const resetLink = ref.replace(":code", code);

    await UserAuth.findOneAndUpdate({ username }, { $push: { requests: { code, type: "refresh-password", expiresAt, link: resetLink } } }).catch(() => { });
    await sendEmail({ to: userData.email, subject: "Forgot Password Request", text: `Click on the link to reset your password: ${resetLink}` }).catch(() => { });

    return res.status(200).json({ success: true, message: "Password reset request successful. Please check your email." });
};

export const refreshPassword_post = async (req: Request, res: Response) => {
    const { code, password } = req.body;

    if (!code || !password) return res.status(400).json({ success: false, message: "Password and code are required." });

    const userData = await UserAuth.findOne({ "requests.code": code });
    if (!userData) return res.status(404).json({ success: false, message: "User not found." });

    if (userData.password === password) return res.status(400).json({ success: false, message: "The new password cannot be the same as the current password." });

    await UserAuth.findOneAndUpdate({ access_token: userData.access_token }, { $set: { password } }).catch(() => { });

    return res.status(200).json({ success: true, message: "Password has been reset successfully." });
};
