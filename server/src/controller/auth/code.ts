import crypto from "crypto";

/**
 * Secret key used for generating access tokens.
 */
const generateCode = (expiresIn: string): string => {
    const randomKey = crypto.randomBytes(18).toString("hex");

    return randomKey;
};

export { generateCode };
