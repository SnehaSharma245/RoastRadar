"use client";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import { Button } from "./ui/button";

// Navbar with consistent dark theme styling
function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;

  return (
    <nav className="p-4 md:p-6 bg-gray-900 text-gray-200 shadow-lg border-b-2 border-b-teal-500">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center border-b-teal-500">
        {/* Logo/Brand Name */}
        <a href="#" className="text-2xl font-bold text-teal-400 mb-4 md:mb-0">
          Mystery Message
        </a>

        {/* Session-based Navigation */}
        {session ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm md:text-base text-gray-300">
              Welcome, {user?.username || user?.email}
            </span>
            <Button
              className="w-full md:w-auto bg-teal-500 text-gray-900 hover:bg-amber-400 hover:text-gray-900"
              onClick={() => signOut()}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href={"/sign-in"}>
            <Button className="w-full md:w-auto bg-teal-500 text-gray-900 hover:bg-amber-400 hover:text-gray-900">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
