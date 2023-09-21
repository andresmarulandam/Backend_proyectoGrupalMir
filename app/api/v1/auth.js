import jwt from "jsonwebtoken";

import { configuration } from "../../config.js";

const { token } = configuration;
const { secret, expires } = token;

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
      message: "Forbidden",
      status: 403,
    });
  }
  jwt.verify(token, secret, function (err, decoded) {
    if (err) {
      return next({
        message: "Forbidden",
        status: 403,
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
};