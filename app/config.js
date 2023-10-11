import * as dotenv from "dotenv";

dotenv.config();

export const configuration = {
  server: {
    port: process.env.PORT,
  },
  pagination: {
    limit: 10,
    offset: 0,
  },
  order: {
    options: ["asc", "desc"],
    appointment: {
      direction: "desc",
      orderBy: "appointmentDate",
    },
    center: {
      direction: "desc",
      orderBy: "id",
    },
    user: {
      direction: "desc",
      orderBy: "fullName",
    },
  },
  token: {
    secret: process.env.TOKEN_SECRET,
    expires: process.env.TOKEN_EXPIRES,
  },
  rateLimit: {
    points: process.env.RATE_LIMIT_POINTS,
    duration: process.env.RATE_LIMIT_DURATION,
  },
};
export const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN;
