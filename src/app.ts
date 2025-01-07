import express from "express";
import helmet from "helmet";
import cors from "cors";
import Router from "./Router";
import connectToDB from "./db/connection";
import { fileURLToPath } from "url";
import path, { dirname } from "path";

import helper from "./utils/helper";
import globalErrorHandler from "./middlewares/globalError";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Initialize app
const app = express();

// Connect to database
connectToDB();

// Middlewares
app.use(express.static(path.join(__dirname, "../", "public")));
app.use(express.raw({ type: "application/octet-stream", limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.json({ limit: "1mb" }));
app.use(helmet());
app.use(cors());

//Router
app.use("/api/v1", Router);

// initializing a basic API that
// returns the "Hello, World!" message
app.get("/", (_, res) => {
  res.json("Hello, World!");
});

//health endpoint
app.get("/health", (_, res) => {
  const healthData = {
    application: helper.getApplicationHealth(),
    system: helper.getSystemHealth(),
    timestamp: Date.now(),
  };

  res.json({
    success: true,
    healthData,
  });
});

// Middleware: Handle Not Found
app.get("*", (_, res) => {
  res.status(404).send("not found");
});

app.use(globalErrorHandler);

export default app;
