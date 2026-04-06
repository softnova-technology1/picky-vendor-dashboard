"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("vendor-auth");

    if (isLoggedIn !== "true") {
      router.replace("/Auth/Log");
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  // Optionally show a loading screen while checking
  if (!isAuthorized) {
    return null;
  }

  return children;
}
