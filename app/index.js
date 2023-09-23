import express from "express";
import { router as api } from "./api/v1/index.js";
import { v4 as uuidv4 } from "uuid";
import cors from "cors";
import { HTTPlogger, logger } from "./logger.js";

export const app = express();

app.use((req, res, next) => {
  const id = uuidv4();
  req.id = id;
  res.setHeader("X-Request-Id", id);

  next();
});

// Log HTTP Requests
app.use(HTTPlogger);

// CORS
app.use(cors());

// Parse JSON body
app.use(express.json());

app.use("/api", api);
app.use("/api/v1", api);

// No route found handler
app.use((req, res, next) => {
  next({
    message: "Route Not Found",
    status: 404,
  });
});

// Error handler
app.use((err, req, res, next) => {
  const { message = "", status = 500, error } = err;

  const data = {
    message,
    status,
    error,
    traceId: req.id,
    body: req.body,
  };

  if (status < 500) {
    logger.warn(data);
  } else {
    logger.error(data);
  }

  res.status(status);
  res.json({
    error: {
      message,
      status,
      error,
    },
  });
});
