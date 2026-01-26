import { Router } from "express";
import validateChat from "../input-validations/chat.validation";
import chat from "../controllers/chat.controller";

const openaiRouter = Router();

openaiRouter.post("/chat", validateChat, chat);

export default openaiRouter;
