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
};
