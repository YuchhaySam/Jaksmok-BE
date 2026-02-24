import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import bookRoute from "./route/route";
import { parse } from "node:path";

const app = express();
dotenv.config();

//allows cross-origin requests from both web and mobile
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400, //24 hours
  }),
);

//Shrink the json payload
app.use(compression());
app.use(express.json());

//Set global Content-Type to application/json
app.use((_req, res, next) => {
  (res.setHeader("Content-Type", "application/json"), next());
});

app.use("/api/v1", bookRoute);

const port = parseInt(process.env.PORT || "3000");
app.listen(port, () => {
  console.log("Server is running");
});
