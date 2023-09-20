import * as dotenv from "dotenv";

dotenv.config();

export const configuration = {
  server: {
    port: process.env.PORT,
  },
  pagination: {
    limit: 5,
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
};
