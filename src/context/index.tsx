"use client";

import { AuthProvider } from "./auth.context";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AuthProvider>{children}</AuthProvider>;
}
