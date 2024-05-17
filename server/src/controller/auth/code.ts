import jwt from "jsonwebtoken";

/**
 * Secret key used for generating access tokens.
 */
const secretKey: string = "code_secret";

const generateCode = (user: object,expiresIn:string): string => {
    const encodedToken: string = jwt.sign(user, secretKey, { expiresIn });
    const charCodes: number[] = encodedToken.split('').map(c => c.charCodeAt(0));
    const code: string = String.fromCharCode(...charCodes);

    return code;
};

const verifyCode = (token: string): any => {
    try {
        const decoded: any = jwt.verify(token, secretKey);

        return decoded;
    } catch (error) {
        return false;
    }
};

export { generateCode, verifyCode };
