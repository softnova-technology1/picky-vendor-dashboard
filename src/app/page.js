"use client";
import LoginPage from "./Auth/Log/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f9fafb' }}>
        <p style={{ color: '#2798F5', fontWeight: '600' }}>Loading Picky Vendor...</p>
      </div>
    );
  }

  return <LoginPage />;
}
