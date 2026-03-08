import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service";

dotenv.config();
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        username: string;
      };
    }
  }
}

export const validateAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      message: "Invalid configuration",
    });
  }

  if (!authHeader) {
    //To trigger the native browser pop up
    res.setHeader("WWW-Authenticate", 'Basic realm="Book API"');
    return res.status(401).json({ message: "Authentication Required" });
  }

  const [scheme, encodedCredentials] = authHeader.split(" ");

  if (scheme === "Bearer") {
    try {
      const decoded = jwt.verify(encodedCredentials, secret) as {
        id: string;
        username: string;
      };
      if (!decoded.id || !decoded.username) {
        return res.status(401).json({ message: "Authentication failed" });
      }
      //Attached id and username to request, so it can be use as needed
      req.user = decoded;
      return next();
    } catch (error) {
      if ((error as Error).name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired" });
      }

      return res.status(401).json({
        message: "Authentication failed",
      });
    }
  }

  if (scheme === "Basic") {
    try {
      const decoded = Buffer.from(encodedCredentials, "base64").toString();
      const separtorIndex = decoded.indexOf(":");
      if (separtorIndex <= 0) {
        return res.status(401).json({
          message: "Invalid authorization payload",
        });
      }
      const user = decoded.slice(0, separtorIndex);
      const password = decoded.slice(separtorIndex + 1);

      const authenticatedUser = await UserService.login(user, password);

      const token = jwt.sign(authenticatedUser, secret, { expiresIn: "1h" });

      //This is only used for this assisngment, in real world, the header insertion is handle by FE
      res.setHeader("X-Access-Token", token);
      req.user = authenticatedUser;

      return next();
    } catch (error) {
      console.error(error);
      if ((error as Error).message === "INVALID_CREDENTIAL") {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }
      return res.status(401).json({
        message: "Authentication failed",
      });
    }
  }
};
