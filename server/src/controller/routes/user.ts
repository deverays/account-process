import { type Response, type Request } from "express";
import { sendMail } from "../../services/mailServices";
import UserAuth, { IUserAuth } from "../../database/models/userAuth";
import { generateAccessToken } from "../auth/access";
import { generateId } from "../auth/id";
import { generateCode } from "../auth/code";

import * as config from "../../../config.json";

const userInfo_get = async (req: Request, res: Response): Promise<Response> => {
    try {
        const Authorization = req.headers.authorization as string;

        if (!Authorization || !Authorization.startsWith("Bearer ")) {
            return res.status(400).json({
                success: false,
                message: "Access token is required.",
            });
        }

        const token = Authorization.split(" ")[1];

        const existingUser = await UserAuth.findOne({
            access_token: token,
        });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "Account not found.",
            });
        }

        return res.status(200).json({
            success: true,
            user_data: existingUser.public,
            message: "User data retrieved successfully.",
        });
    } catch (error) {
        console.error("Error during user data retrieval:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
};

const login_post = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username and password are required.",
            });
        }

        const existingUser = await UserAuth.findOne({
            "public.username": username,
        });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "Account not found.",
            });
        }

        if (existingUser.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Incorrect password.",
            });
        }

        return res.status(200).json({
            success: true,
            user_data: {
                access_token: existingUser.access_token,
                ...existingUser.public,
            },
            message: "Login successful!",
        });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
};

const signup_post = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password, passwordAgain, username } = req.body;

        if (!email || !password || !passwordAgain || !username) {
            return res.status(400).json({
                success: false,
                message:
                    "Missing required fields: email, password, passwordAgain, username.",
            });
        }

        if (password !== passwordAgain) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match.",
            });
        }

        const existingUser = await UserAuth.findOne({
            $or: [{ "public.username": username }, { email }],
        });

        if (existingUser) {
            if (existingUser.public.username === username) {
                return res.status(409).json({
                    success: false,
                    message: "Username is already in use.",
                });
            }
            if (existingUser.email === email) {
                return res.status(409).json({
                    success: false,
                    message: "Email is already in use.",
                });
            }
        }

        const id = generateId({ username });
        const access_token = generateAccessToken({ email });

        const newUser = new UserAuth({
            email,
            password,
            public: {
                username,
                id,
                avatar_url: config.default_avatar_url,
            },
            access_token,
        });

        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "Registration successful!",
        });
    } catch (error) {
        console.error("Error during registration:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
};

const forgotPassword_post = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { username, ref } = req.body;

        if (!username || !ref) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: username, ref.",
            });
        }

        const existingUser: IUserAuth | null = await UserAuth.findOne({
            "public.username": username,
        });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const code: string = generateCode({ username }, "180s");
        const expiresAt = new Date(Date.now() + 180 * 1000);

        await UserAuth.findOneAndUpdate(
            { "public.username": username },
            {
                $push: {
                    requests: { code, type: "passwordReset", expiresAt },
                },
            }
        );

        const resetLink: string = ref.replace(":code", code);

        sendMail({
            to: existingUser.email,
            subject: "Password Reset Request",
            text: `Click on the link to reset your password: ${resetLink}`,
        });

        return res.status(200).json({
            success: true,
            message: "Password reset request successful. Please check your email.",
        });
    } catch (error) {
        console.error("Error during password reset:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
};

const passwordReset_post = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { resetCode, resetType, password } = req.body;

        if (!resetCode || !resetType) {
            return res.status(400).json({
                success: false,
                message: "Reset code and reset type are required.",
            });
        }

        const existingUser: IUserAuth | null = await UserAuth.findOne({
            "requests.code": resetCode,
        });

        const request = existingUser?.requests?.find(
            (request) => request.code === resetCode
        );

        if (!existingUser || !request) {
            return res.status(404).json({
                success: false,
                message: "Reset code not found.",
            });
        }

        if (resetType === "check") {
            if (
                request.expiresAt &&
                request.expiresAt > new Date() &&
                request.type === "passwordReset"
            ) {
                return res.status(200).json({
                    success: true,
                    reset_data: request,
                    message: "Reset code is valid. You can proceed with the reset.",
                });
            } else {
                return res.status(400).json({
                    success: false,
                    message: "Reset code is expired.",
                });
            }
        } else if (resetType === "password-reset") {
            if (!password) {
                return res.status(400).json({
                    success: false,
                    message: "Password is required for password reset.",
                });
            }

            if (existingUser!.password === password) {
                return res.status(400).json({
                    success: false,
                    message:
                        "The new password cannot be the same as the current password.",
                });
            }

            await UserAuth.findOneAndUpdate(
                { access_token: existingUser!.access_token },
                { $set: { password } }
            );

            return res.status(200).json({
                success: true,
                message: "Password has been reset successfully.",
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid reset type.",
            });
        }
    } catch (error) {
        console.error("Error during password reset:", error);
        return res.status(500).json({
            success: false,
            message: "An internal server error occurred. Please try again later.",
        });
    }
};
const forgotUsername_post = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Missing required field: email.",
            });
        }

        const existingUser = await UserAuth.findOne({ email });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        sendMail({
            to: existingUser.email,
            subject: "Username Retrieval",
            text: `Your username is: ${existingUser.public.username}`,
        });

        return res.status(200).json({
            success: true,
            message: "Username retrieval email sent. Please check your email.",
        });
    } catch (error) {
        console.error("Error during username retrieval:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error. Please try again later.",
        });
    }
};

export {
    userInfo_get,
    login_post,
    signup_post,
    forgotPassword_post,
    passwordReset_post,
    forgotUsername_post,
};
