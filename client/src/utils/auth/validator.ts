import { emailRegex, usernameRegex } from "./regexDefinitions";

export const validateEmail = (email: string) => {
    const isValid =
        emailRegex.test(email) && email.length >= 6 && email.length <= 60;

    return isValid;
};

export const validateUsername = (username: string) => {
    const isValid =
        usernameRegex.test(username) && username.length > 2 && username.length < 16;

    return isValid;
};

export const validatePassword = (password: string) => {
    const isValid = password.length >= 6 && password.length <= 26;

    return isValid;
};
