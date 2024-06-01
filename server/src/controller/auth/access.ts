import crypto from "crypto";

/**
 * Secret key used for generating access tokens.
 */
const generateAccessToken = (user: object) => {
    const randomKey = crypto.randomBytes(32).toString("hex");

    return randomKey;
};

export { generateAccessToken };
