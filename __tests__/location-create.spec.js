import request from "supertest";
import { app } from "../app/index.js";
describe("Location creation", () => {
  test("location created successfully", async () => {
    const user = await request(app).post("/api/locations").send({
      country: "colombia",
      city: "bogota",
      address: "calle 123",
    });
    expect(user.status).toBe(201);
  });
});
