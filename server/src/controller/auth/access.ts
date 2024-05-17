import jwt from "jsonwebtoken";

/**
 * Secret key used for generating access tokens.
 */
const secretKey = "access_token_secret";

const generateAccessToken = (user: object) => {
    const accessToken = jwt.sign(user, secretKey, { expiresIn: "15m" });

    return accessToken;
};

const verifyAccessToken = (token: string) => {
    try {
        const decoded = jwt.verify(token, secretKey);

        return decoded;
    } catch (error) {
        return false;
    }
};

export { generateAccessToken, verifyAccessToken };