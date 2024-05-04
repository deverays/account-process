import { sign } from "jsonwebtoken";
import UserAuth, { UserAuthTypes } from "../../models/userAuth";
import { type Response, type Request } from "express";
import { sendMail } from "../../services/nodemailerServices";

const user_get = async (req: Request, res: Response): Promise<Response> => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization || !authorization.startsWith("Bearer ")) {
            return res.status(400).json({
                success: false,
                message: "Access token is required.",
            });
        }

        const token = authorization.split(" ")[1];

        const existingUser: UserAuthTypes = await UserAuth.findOne({
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

        const existingUser: UserAuthTypes = await UserAuth.findOne({
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

        const existingUser: UserAuthTypes = await UserAuth.findOne({
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

        const id = sign(username, email).toLowerCase();
        const access_token = sign(username, email);

        const newUser = new UserAuth({
            email,
            password,
            "public.username": username,
            "public.id": id,
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
        const { username, redirectUrl } = req.body;

        if (!username || !redirectUrl) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields: username, redirectUrl.",
            });
        }

        const existingUser: UserAuthTypes = await UserAuth.findOne({ "public.username": username });

        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        const resetCode = sign(username, username);
        const expiresAt = new Date(Date.now() + 180 * 1000);

        await UserAuth.findOneAndUpdate(
            { "public.username": username },
            {
                $set: {
                    "password_reset.resetCode": resetCode,
                    "password_reset.expiresAt": expiresAt,
                },
            }
        );

        setTimeout(async () => {
            await UserAuth.findOneAndUpdate(
                { "public.username": username },
                {
                    $set: {
                        "password_reset.resetCode": null,
                        "password_reset.expiresAt": null,
                    },
                }
            );
        }, 180 * 1000);

        const resetLink = redirectUrl.replace(":code", resetCode);

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

        const existingUser: UserAuthTypes = await UserAuth.findOne({
            "password_reset.resetCode": resetCode,
        });

        if (!existingUser || !existingUser.password_reset.resetCode) {
            return res.status(404).json({
                success: false,
                message: "Reset code not found.",
            });
        }

        if (resetType === "check") {
            if (existingUser.password_reset.resetCode === resetCode) {
                return res.status(200).json({
                    success: true,
                    reset_data: existingUser.password_reset,
                    message: "Reset code is valid. You can proceed with the reset.",
                });
            }
        } else if (resetType === "password-reset") {
            if (!password) {
                return res.status(400).json({
                    success: false,
                    message: "Password is required for password reset.",
                });
            }

            if (existingUser.password == password) {
                return res.status(400).json({
                    success: false,
                    message:
                        "The new password cannot be the same as the current password.",
                });
            }

            await UserAuth.findOneAndUpdate(
                { "password_reset.resetCode": resetCode },
                {
                    $set: {
                        password,
                    },
                }
            );

            return res.status(200).json({
                success: true,
                message: "Password has been reset successfully.",
            });
        }

        return res.status(400).json({
            success: false,
            message: "Invalid reset type.",
        });
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

        const existingUser: UserAuthTypes = await UserAuth.findOne({ email });

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
    user_get,
    login_post,
    signup_post,
    forgotPassword_post,
    passwordReset_post,
    forgotUsername_post,
};
