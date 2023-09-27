import request from "supertest";
import { app } from "../app/index.js";
describe("Users Sign in", () => {
  test("signed in successfully", async () => {
    const user = await request(app).post("/api/users/signin").send({
      email: "messi@gmail.com",
      password: "password",
    });
    expect(user.status).toBe(200);
  });
});
