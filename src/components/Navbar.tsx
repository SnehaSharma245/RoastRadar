"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { LogOut, LogIn } from "lucide-react";
import LoadingScreen from "./LoadingScreen";
import { useToast } from "@/hooks/use-toast";

// Navbar with roasting theme and purple styling
function Navbar() {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Reset loading when pathname changes
  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  const handleSignInClick = () => {
    setIsLoading(true);
  };

  const handleLogoutClick = async () => {
    setIsLoading(true);
    try {
      await signOut();
      toast({
        title: "🚪 Arena Exit Complete",
        description:
          "You've successfully escaped the roasting arena. Come back when you're ready for more heat!",
      });
    } catch (error) {
      toast({
        title: "🔥 Still Trapped in the Arena",
        description:
          "The roasting gods won't let you leave! Try escaping again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen message="Redirecting..." />;
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-all duration-300 ${
        isScrolled
          ? "backdrop-blur-3xl bg-white/20 shadow-purple-200 shadow-2xl border-b border-purple-200/30"
          : "backdrop-blur-2xl bg-white/10 shadow-purple-100 shadow-xl border-b border-purple-100/20"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/Brand Name */}
        <Link href="/" className="flex items-center group">
          <div className="relative flex items-center space-x-2 group-hover:scale-105 transition-transform duration-300">
            {/* Logo Image */}
            <div className="w-10 h-10">
              <Image
                src="/logo2.png"
                alt="RoastRadar Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>

            {/* Text */}
            <h1 className="text-xl sm:text-2xl font-bold drop-shadow-lg">
              <span className="text-purple-500">Roast</span>
              <span className="text-purple-800">Radar</span>
            </h1>
          </div>
        </Link>

        {/* Session-based Navigation */}
        {session ? (
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="bg-white/30 backdrop-blur-sm px-3 sm:px-4 py-2 rounded-full border border-white/40 shadow-lg">
              <span className="text-xs sm:text-sm text-purple-800 font-medium drop-shadow truncate max-w-[100px] sm:max-w-none">
                {user?.username || user?.email}
              </span>
            </div>
            <Button
              className="bg-purple-600/90 backdrop-blur-sm text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 px-3 sm:px-4 py-2 rounded-lg font-semibold border border-white/20 hover:border-white/30"
              onClick={handleLogoutClick}
              size="sm"
            >
              <LogOut className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline text-sm">Logout</span>
            </Button>
          </div>
        ) : (
          <Link href="/sign-in" onClick={handleSignInClick}>
            <Button className="bg-purple-600/90 backdrop-blur-sm text-white hover:bg-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 px-4 sm:px-6 py-2 rounded-lg font-semibold border-2 border-white/20 hover:border-white/30 mr-2 sm:mr-4">
              <div className="flex items-center space-x-2">
                <LogIn className="w-4 h-4" />
                <span className="text-sm sm:text-base">Enter Arena</span>
              </div>
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
