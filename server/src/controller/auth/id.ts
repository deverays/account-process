import crypto from "crypto";

/**
 * Secret key used for generating access tokens.
 */
const secretKey: string = "id_secret";

const generateId = (user: object): string => {
    const randomKey = crypto.randomBytes(8).toString("hex");

    return randomKey;
};

export { generateId };
