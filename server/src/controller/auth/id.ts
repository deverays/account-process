import jwt from "jsonwebtoken"

/**
 * Secret key used for generating access tokens.
 */
const secretKey: string = "id_secret";

const generateId = (user: object): string => {
    const id: string = String.fromCharCode(...jwt.sign(user, secretKey, { expiresIn: "15m" }).split('').map(c => c.charCodeAt(0)));

    return id;
};

const verifyId = (token: string): any => {
    try {
        const decoded: any = jwt.verify(token, secretKey);

        return decoded;
    } catch (error) {
        return false;
    }
};

export { generateId, verifyId };
