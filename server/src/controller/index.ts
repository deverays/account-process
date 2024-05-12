import { type Router } from "express";
import {
    userInfo_get,
    login_post,
    signup_post,
    forgotPassword_post,
    passwordReset_post,
    forgotUsername_post,
} from "./routes/user";

export default (router: Router) => {
    router.get("/user", userInfo_get);
    router.post("/users/login", login_post);
    router.post("/users/signup", signup_post);
    router.post("/users/password-reset", passwordReset_post);
    router.post("/users/forgot-password", forgotPassword_post);
    router.post("/users/forgot-username", forgotUsername_post);
};
