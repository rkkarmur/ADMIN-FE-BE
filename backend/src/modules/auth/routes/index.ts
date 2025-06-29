import { Router } from "express";
import * as AuthController from "../controller/index";
import { loginSchema, updateProfileSchema, changePasswordSchema } from "../validator";
import { validateBody } from "../../../helper/validator";
import { sessionMiddleware } from "../../../middleware/session";
import { jwtAuthSession } from "../../../middleware/auth";

const router = Router();
console.log("Initializing authRouter for authentication routes...");

router.post("/login", validateBody(loginSchema), AuthController.login);
router.get("/profile", jwtAuthSession("common"), AuthController.getProfile);
router.put("/profile", jwtAuthSession("common"), validateBody(updateProfileSchema), AuthController.updateProfile);
router.put("/change-password", jwtAuthSession("common"), validateBody(changePasswordSchema), AuthController.changePassword);
router.post("/logout", jwtAuthSession("common"), AuthController.logout);

export const authRouter = router;
