"use client";

//It's a context provider from next-auth that manages the authentication session state for your application.
// It ensures that components inside this provider can access the authentication session.

import { SessionProvider } from "next-auth/react";

// This is a custom React component that wraps its children with the SessionProvider.
// It takes a single prop:
// children: These are the React components nested inside <AuthProvider> in your app.
// React.ReactNode: It is a TypeScript type for anything renderable in React (e.g., JSX elements, strings, etc.).

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
