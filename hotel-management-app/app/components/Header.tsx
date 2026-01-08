"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useUser from "../../src/hooks/useUser";

export default function Header() {
  const { user, loading, refresh } = useUser();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/authentication/logout", { method: "POST" });
    refresh();
    router.push("/authentication/login");
  }

  return (
    <header style={{ display: "flex", justifyContent: "space-between", padding: "1rem 2rem", borderBottom: "1px solid #eee" }}>
      <div>
        <Link href="/">Fane Hotel</Link>
      </div>
      <nav>
        {loading ? (
          <span>...</span>
        ) : user ? (
          <>
            <span style={{ marginRight: 12 }}>Hi, {user.name || user.email}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/authentication/login">Login</Link>
            <Link href="/authentication/signup" style={{ marginLeft: 12 }}>Sign up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
