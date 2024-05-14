import UserAuth, { UserAuthTypes } from "../../database/models/userAuth";
import { type Response, type Request } from "express";

const userInfo_get = async (req: Request, res: Response): Promise<Response> => {
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

export {
    userInfo_get,
};
