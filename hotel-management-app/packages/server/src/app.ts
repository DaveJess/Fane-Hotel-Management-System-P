import * as dotenv from "dotenv";
import path from "path";
import express from "express";

// Load environment variables from the repo root `config.env` for local dev
dotenv.config({ path: path.resolve(__dirname, "../../..", "config.env") });

import connectDB from "./lib/db";
import authRouter from "./routes/auth";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/auth", authRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(err => {
  console.error("Failed to connect to DB", err);
  process.exit(1);
});
