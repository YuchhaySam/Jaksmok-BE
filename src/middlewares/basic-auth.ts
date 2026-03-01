import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    //To trigger the native browser pop up
    res.setHeader("WWW-Authenticate", 'Basic realm="Book API"');
    return res.status(401).json({ message: "Authentication Required" });
  }

  // Enforce exact format: Authorization: Basic <base64(username:password)>
  const [scheme, encodedCredentials] = authHeader.split(" ");
  if (scheme !== "Basic" || !encodedCredentials) {
    return res.status(401).json({
      message: "Invalid authorization header format",
    });
  }

  const decoded = Buffer.from(encodedCredentials, "base64").toString();
  const separtorIndex = decoded.indexOf(":");
  if (separtorIndex <= 0) {
    return res.status(401).json({
      message: "Invalid authorization payload",
    });
  }
  const user = decoded.slice(0, separtorIndex);
  const password = decoded.slice(separtorIndex + 1);

  const expectedUser = process.env.BASIC_AUTH_USER;
  const expectedPassword = process.env.BASIC_AUTH_PASSWORD;

  if (!expectedPassword || !expectedUser) {
    return res.status(500).json({
      message: "Authentication is not configured",
    });
  }

  if (user === expectedUser && password === expectedPassword) {
    next();
  } else {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
};
