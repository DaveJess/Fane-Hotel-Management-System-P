import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "dev_secret";
const DEFAULT_EXPIRY = "7d";

export function signToken(payload: Record<string, any>, expiresIn: string | undefined = DEFAULT_EXPIRY) {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyToken(token: string) {
  return jwt.verify(token, SECRET);
}

export function createAuthCookie(token: string, maxAgeSeconds = 60 * 60 * 24 * 7) {
  const secureFlag = process.env.NODE_ENV === "production" ? "; Secure" : "";
  return `token=${token}; HttpOnly; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax${secureFlag}`;
}
