import bcrypt from "bcryptjs";
import User from "../../../src/models/user.model";
import connectDB from "../../../src/lib/db";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Email and password are required" }), { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 400 });
    }

    // Sign JWT and set cookie
    const { signToken, createAuthCookie } = await import("../../../src/lib/jwt");
    const token = signToken({ id: user._id, email: user.email, role: user.role });
    const cookie = createAuthCookie(token);

    // Remove password before sending user data back
    const userObj = user.toObject ? user.toObject() : { ...user };
    delete userObj.password;

    return new Response(JSON.stringify({ message: "Login successful", user: userObj }), { status: 200, headers: { "Set-Cookie": cookie } });
  } catch (err) {
    console.error("Login error", err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
};


