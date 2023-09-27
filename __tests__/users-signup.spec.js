import request from "supertest";
import { app } from "../app/index.js";
describe("Users Sign Up", () => {
  test("signed successfully", async () => {
    const user = await request(app).post("/api/users/signup").send({
      fullName: "cristiano",
      gender: "male",
      userType: "user",
      email: "cristiano@gmail.com",
      password: "password",
      citizenshipNumber: 2222,
      enabled: true,
      locationId: "84291ff0-f7e1-4858-ac19-91adba13aeb5",
    });
    expect(user.status).toBe(201);
  });
});
