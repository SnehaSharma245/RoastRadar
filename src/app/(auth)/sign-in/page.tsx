"use client";

// Import necessary modules and libraries
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import * as z from "zod";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";
import { Flame, LogIn } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";

// Main page component
function page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);

    const result = await signIn("credentials", {
      identifier: data.identifier,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      if (result.error == "CredentialsSignin") {
        toast({
          title: "🎯 Aim Better Next Time",
          description:
            "Your username or password missed the target. Try again, warrior!",
          variant: "destructive",
        });
      } else {
        toast({
          title: "⚡ System Overload",
          description:
            "The roasting servers are getting heated. Cool down and retry!",
          variant: "destructive",
        });
      }
    }

    if (result?.url) {
      router.replace("/dashboard");
    }
    setIsSubmitting(false);
  };

  const handleLogoClick = () => {
    setIsNavigating(true);
  };

  const handleSignUpClick = () => {
    setIsNavigating(true);
  };

  if (isNavigating) {
    return <LoadingScreen message="Redirecting..." />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-violet-200">
      {/* Card container */}
      <div className="w-full max-w-md p-8 space-y-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-purple-200">
        <div className="text-center">
          {/* Logo and Heading */}
          <div className="flex items-center justify-center mb-6">
            <Link href="/" onClick={handleLogoClick}>
              <div className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-300">
                <Flame className="w-10 h-10 text-purple-600 mr-2" />
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-purple-800 bg-clip-text text-transparent">
                  RoastRadar
                </h1>
              </div>
            </Link>
          </div>

          <h2 className="text-2xl font-extrabold text-purple-800 mb-4">
            Ready to Get Roasted?
          </h2>

          <p className="text-purple-700 mb-6">
            Sign in to enter the ultimate roasting arena
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Email field */}
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800 font-medium">
                    Email/Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-purple-50 border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-purple-800 placeholder:text-purple-400 rounded-xl"
                      placeholder="Enter your email or username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password field */}
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800 font-medium">
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="bg-purple-50 border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-purple-800 placeholder:text-purple-400 rounded-xl"
                      type="password"
                      placeholder="Enter your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all duration-300 py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span>Entering the Arena...</span>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Enter RoastRadar</span>
                </>
              )}
            </Button>
          </form>
        </Form>

        {/* Sign-up link */}
        <div className="text-center mt-6">
          <p className="text-purple-700">
            New to the roasting game?{" "}
            <Link href="/sign-up" onClick={handleSignUpClick}>
              <span className="text-purple-600 hover:text-purple-800 font-semibold  decoration-purple-400 hover:decoration-purple-600 transition-colors cursor-pointer">
                Join the Arena!
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
