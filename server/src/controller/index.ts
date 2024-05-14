import { type Router } from "express";
import { userInfo_get } from "./routes/user";
import {
    login_post,
    signup_post,
    forgotPassword_post,
    passwordReset_post,
    forgotUsername_post,
} from "./routes/auth";

export default (router: Router) => {
    /**User */
    router.get("/user", userInfo_get);

    /**Auth */
    router.post("/auth/login", login_post);
    router.post("/auth/signup", signup_post);
    router.post("/auth/password-reset", passwordReset_post);
    router.post("/auth/forgot-password", forgotPassword_post);
    router.post("/auth/forgot-username", forgotUsername_post);
};
