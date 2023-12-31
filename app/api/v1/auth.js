import jwt from "jsonwebtoken";
import { RateLimiterMemory } from "rate-limiter-flexible";

import { configuration } from "../../config.js";

const { token, rateLimit } = configuration;
const { secret, expires } = token;
const { points, duration } = rateLimit;

const rateLimiter = new RateLimiterMemory({
  points,
  duration,
});

export const signToken = (payload, expiresIn = expires) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  });
};

export const auth = (req, res, next) => {
  let token = req.headers.authorization || "";
  if (token.startsWith("Bearer")) {
    token = token.substring(7);
  }
  if (!token) {
    return next({
      message: "Unauthorized",
      status: 401,
    });
  }
  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      return next({
        message: "Unauthorized",
        status: 401,
      });
    }
    req.decoded = decoded;
    next();
  });
};

export const me = (req, res, next) => {
  const { decoded = {}, params = {} } = req;
  const { id: userId } = decoded;
  const { id } = params;

  if (userId !== id) {
    return next({
      message: "Forbidden",
      status: 403,
    });
  }
  next();
};

export const limit = async (req, res, next) => {
  const ip = req.ip;
  console.log(ip);
  try {
    await rateLimiter.consume(ip, 1);
    next();
  } catch (error) {
    next({
      message: "Too many requests",
      status: 429,
    });
  }
};
