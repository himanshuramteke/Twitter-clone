import jwt from "jsonwebtoken";
import { JWT_TOKEN, NODE_ENV } from "../config/serverConfig.js";

export const generateJwtToken = (userId, res) => {
  const token = jwt.sign({ userId }, JWT_TOKEN, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "strict",
    secure: NODE_ENV !== "development",
  });
};
