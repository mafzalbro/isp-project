"use client";

import AppShell from "@/components/layout/app-shell";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
    }
  }, [router]);

  if (!isClient) {
    return null; // Or a loading spinner
  }

  return <AppShell>{children}</AppShell>;
}
