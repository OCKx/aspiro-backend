import { RequestHandler } from "express";
import joi from "joi";

const chatSchema = joi.object({
  message: joi.string().min(1).max(2000).required(),
});

const validateChat: RequestHandler = async (req, res, next) => {
  try {
    await chatSchema.validateAsync(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({
      status: "FAIL",
      message: error?.details?.[0]?.message ?? "Invalid request",
    });
    return;
  }
};

export default validateChat;
