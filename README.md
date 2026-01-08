# Fane-Hotel-Management-System-P
This is a prototype for a hotel management system

## Authentication

This repository includes a basic authentication system implemented using bcrypt and JWTs set as httpOnly cookies.

Environment variables required:
- `DB_URL` - MongoDB connection string
- `JWT_SECRET` - secret used to sign JWT tokens (set in `config.env`)
- `NEXTAUTH_SECRET` - (optional)

API routes (server-side):
- `POST /authentication/signup` - create account
- `POST /authentication/login` - login (sets httpOnly cookie)
- `POST /authentication/logout` - clears cookie
- `GET /authentication/me` - returns current user when authenticated

How to run:
1. Set `DB_URL` and `JWT_SECRET` in `config.env`.
2. Run `npm run dev` in the workspace root to start the server and client workspaces.
3. Visit the client app or the Next-like app pages to sign up and log in.

Notes:
- I added a simple middleware that protects routes prefixed with `/dashboard`, `/hotels`, `/rooms`, `/reservations`, and `/admin`.
- If you'd like, I can add tests, CI configuration, and more robust role-based access next.
