import request from "supertest";

import { app } from "../app/index.js";
import { setup } from "./payment-pagination.setup.js";
import { resetDb } from "./helpers/reset-db.js";

describe("Pagination", () => {
  beforeEach(async () => {
    await resetDb();
    await setup();
  });

  test("offset and limit", async () => {
    const agent = request(app);
    const response = await agent.get("/api/payments?limit=2");

    expect(response.body.data.length).toBe(2);
  });
});
