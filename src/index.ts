import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import compression from "compression";
import bookRouter from "./route/book.route";
import { MysqlDataSource } from "./database/data-source";

const app = express();
dotenv.config();

//allows cross-origin requests from both web and mobile
app.use(
  cors({
    origin: "*",
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400, //This allow client to not have the need to ask again and again in every request for 24 hours. Good for slow connection from client side.
  }),
);

//Shrink the json payload
app.use(compression());
app.use(express.json());

//Set global Content-Type to application/json
app.use((_req, res, next) => {
  (res.setHeader("Content-Type", "application/json"), next());
});

app.use("/api/v1", bookRouter);

const port = parseInt(process.env.PORT || "3000");
MysqlDataSource.initialize()
  .then(() => {
    console.log("📡 Database connected!");

    app.listen(port, () => {
      console.log(`Server running on port: ${port}`);
    });
  })
  .catch((err) => console.error("Database connection error:", err));
