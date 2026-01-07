// Converted to Express route: see packages/server/src/routes/auth.ts
// Original Next handler preserved here for reference (will remove after migration)
import bcrypt from "bcryptjs";
import User from "../../../src/models/user.model";
import connectDB from "../../../src/lib/db";

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json();

  await connectDB();

  const exists = await User.findOne({ email });
  if (exists) {
    return new Response(JSON.stringify({ message: "User exists" }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10); 

  await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  });

  return new Response(JSON.stringify({ message: "Account Created" }), { status: 201 });
}; 





