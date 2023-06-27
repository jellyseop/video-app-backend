import express from "express";
import logger from "../config/morgan";
import session from "express-session";
import sessionConfig from "../config/session";
import router from "./routes";

const app = express();

app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig));

app.use("/api", router);
app.use("/uploads", express.static("uploads"));

export default app;
