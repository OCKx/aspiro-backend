import { Router } from "express";

const apiRouter = Router();

apiRouter.get('/', (req, res) => {
    res.status(200).json({
        name: "OCKX Express Temp"
    })
});

apiRouter.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});


export default apiRouter;