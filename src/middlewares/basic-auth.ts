import { Request, Response, NextFunction } from "express";

export const basicAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    //To trigger the native browser pop up
    res.setHeader("WWW-Authenticate", 'Basic realm="Book API"');
    return res.status(401).json({ message: "Authentication Required" });
  }
  const encodedCredentials = authHeader.split(" ")[1];
  if (!encodedCredentials) {
    return res.status(401).json({
      message: "Invalid authorization header format",
    });
  }

  const auth = Buffer.from(encodedCredentials, "base64").toString().split(":");
  const user = auth[0];
  const password = auth[1];

  if (user === "sampleId" && password === "Secret") {
    next();
  } else {
    return res.status(401).json({
      message: "Invalid credential",
    });
  }
};
