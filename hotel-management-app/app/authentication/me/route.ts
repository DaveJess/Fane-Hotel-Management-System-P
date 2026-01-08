import connectDB from "../../../src/lib/db";
import User from "../../../src/models/user.model";
import { verifyToken } from "../../../src/lib/jwt";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const tokenPair = cookie.split("; ").find((c) => c.startsWith("token="));
    if (!tokenPair) return new Response(JSON.stringify({ user: null }), { status: 200 });

    const token = tokenPair.split("=")[1];

    const payload: any = verifyToken(token);
    if (!payload?.id) return new Response(JSON.stringify({ user: null }), { status: 200 });

    await connectDB();
    const user = await User.findById(payload.id).select("-password");
    if (!user) return new Response(JSON.stringify({ user: null }), { status: 200 });

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (err) {
    console.error("/authentication/me error", err);
    return new Response(JSON.stringify({ user: null }), { status: 200 });
  }
}
