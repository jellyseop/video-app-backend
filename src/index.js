import "dotenv/config";
import "module-alias/register";
import express from "express";
import configureApp from "./app";
import databaseConnection from "./database/connection";

const startServer = async () => {
  const app = express();

  await databaseConnection();

  configureApp(app);

  app.listen(process.env.PORT, () =>
    console.log(
      `✅ Server listenting on http://localhost:${process.env.PORT} 🚀`
    )
  );
};

startServer();
