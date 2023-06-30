import express from "express";
import logger from "./config/morgan";
import session from "express-session";
import sessionConfig from "./config/session";
import userRouter from "./routes/user-router";

const configureApp = (app) => {
  app.use(logger);
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(session(sessionConfig));

  app.use("/uploads", express.static("uploads"));

  //API routes
  app.use("/api/users", userRouter);
};

export default configureApp;
