import dotenv from "dotenv";
import express from "express";

dotenv.config();
import connectDB from "../src/lib/db";

const app = express();
const port = process.env.PORT;

app.use(express.json());

connectDB();

