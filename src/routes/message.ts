import express from "express";
import MessageController from "../controllers/messageController";

const router = express.Router();

router.post("/", MessageController.postMessage);

export default router;
