import express from "express";
import messageRoute from "./message";

const router = express.Router();

router.use("/api/message", messageRoute);

export default router;
