import { Router } from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger-output.json';
import apiRouter from "./features/welcome/api";
import userRouter from "./features/users/routes/user.route";
import openaiRouter from "./features/openAi/routes/openai.routes";

const router = Router();

router.use('/', apiRouter);
router.use('/api', apiRouter);
router.use('/api/v1/user', userRouter);
router.use("/api/v1/openai", openaiRouter);
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


export default router;