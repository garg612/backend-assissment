import express from "express";
import createIntake from "../controllers/intake.controller.js";
import verifyWebhook from "../middlewares/webhookAuth.middlewares.js";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post("/intake", upload.none(), createIntake);

export default router;