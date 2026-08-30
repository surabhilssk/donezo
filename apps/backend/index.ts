import express from "express";
import "dotenv/config";
import db from "db/client";
import { usersTable } from "db/schema";

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await Bun.password.hash(password);
    await db.insert(usersTable).values({ email, password: hashedPassword });
    res.json({ message: "User signed up successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error signing up user" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
