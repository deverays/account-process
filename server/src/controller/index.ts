import { Router } from "express";
import multer from "multer";
import {
  usersSelf_get,
  signin_post,
  signup_post,
  forgotUsername_post,
  forgotPassword_post,
  refreshPassword_post,
} from "./routes/users";
import { requestVerification_post } from "./routes/auth";
import { connectionDiscord_get } from "./routes/connection";
import { uploadFile_post } from "./routes/upload";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.get("/users/self", usersSelf_get);
router.post("/users/signin", signin_post);
router.post("/users/signup", signup_post);
router.post("/users/forgot-username", forgotUsername_post);
router.post("/users/forgot-password", forgotPassword_post);
router.post("/users/refresh-password", refreshPassword_post);

router.post("/auth/request-verification", requestVerification_post);

router.get("/connection/discord", connectionDiscord_get);

router.post("/cdn/upload-file", upload.single("attachment"), uploadFile_post);

export default router;
