import { verifyToken } from "./jwt";
import connectDB from "./db";
import User from "../models/user.model";

export async function getUserFromRequest(req: Request) {
  const cookie = req.headers.get("cookie") || "";
  const tokenPair = cookie.split("; ").find((c) => c.startsWith("token="));
  if (!tokenPair) return null;

  const token = tokenPair.split("=")[1];

  try {
    const payload: any = verifyToken(token);
    if (!payload?.id) return null;

    await connectDB();
    const user = await User.findById(payload.id).select("-password");
    return user;
  } catch (err) {
    return null;
  }
};
