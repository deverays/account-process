import { type Router } from "express";
import {
    user_get,
    login_post,
    signup_post,
    forgotPassword_post,
    passwordReset_post,
    forgotUsername_post,
} from "./routes/user";

export default (router: Router) => {
    router.get("/user", user_get);
    router.post("/login", login_post);
    router.post("/signup", signup_post);
    router.post("/password-reset", passwordReset_post);
    router.post("/forgot-password", forgotPassword_post);
    router.post("/forgot-username", forgotUsername_post);
};
