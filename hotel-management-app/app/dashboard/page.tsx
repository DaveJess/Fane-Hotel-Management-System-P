"use client";

import useUser from "../../src/hooks/useUser";
import { useRouter } from "next/navigation";
import "./page.css";

export default function DashboardPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  if (!loading && !user) {
    if (typeof window !== "undefined") router.push("/authentication/login");
    return <div>Redirecting...</div>;
  }

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      {loading ? <p>Loading...</p> : <pre>{JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
}

