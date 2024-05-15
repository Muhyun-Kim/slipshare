"use client";

import { useEffect, useState } from "react";
import useUserStore from "@/store/useUserStore";

export default function Profile() {
  const user = useUserStore((state) => state.user);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{user?.email || "No email found"}</h1>
    </div>
  );
}
