import { type Router } from "express";
import {
    userInfo_get,
    login_post,
    signup_post,
    forgotPassword_post,
    passwordReset_post,
    forgotUsername_post,
} from "./routes/user";
import { Multer } from "multer";

export default (router: Router) => {
    router.get("/user", userInfo_get);
    router.post("/login", login_post);
    router.post("/signup", signup_post);
    router.post("/password-reset", passwordReset_post);
    router.post("/forgot-password", forgotPassword_post);
    router.post("/forgot-username", forgotUsername_post);
};

import { upload_post } from "./routes/cdn";

export const cdnController = (router: Router, multerParse: Multer) => {
    router.post(
        "/upload",
        multerParse.fields([{ name: "attachment" }]),
        upload_post
    );

    router.get("/", (req, res) => {
        res.send("test");
    });
};
