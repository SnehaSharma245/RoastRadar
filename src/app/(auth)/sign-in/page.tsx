"use client";

// Import necessary modules and libraries
import { zodResolver } from "@hookform/resolvers/zod"; // For integrating Zod validation with React Hook Form
import { useForm } from "react-hook-form"; // React Hook Form for handling forms
import { Form } from "@/components/ui/form"; // Custom Form component
import Link from "next/link"; // For client-side navigation in Next.js
import * as z from "zod"; // Zod for schema-based validation
import React, { useState } from "react"; // React hooks for state and lifecycle
import { useRouter } from "next/navigation"; // Next.js router for navigation

import { useToast } from "@/hooks/use-toast"; // Custom toast notifications

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // UI components for form
import { Input } from "@/components/ui/input"; // Input component
import { Button } from "@/components/ui/button"; // Button component
// import { Loader2 } from "lucide-react"; // Loader spinner icon
import { signInSchema } from "@/schemas/signInSchema";
import { signIn } from "next-auth/react";

// Main page component
function page() {
  const [isSubmitting, setIsSubmitting] = useState(false); // Flag for form submission

  // Toast notifications for feedback
  const { toast } = useToast();

  // Next.js router for navigation
  const router = useRouter();

  // Setting up React Hook Form with Zod validation schema
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema), // Connect Zod schema with React Hook Form
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true); // Indicate that form submission is in progress
    // console.log(data);

    const result = await signIn("credentials", {
      identifier: data.identifier,
      password: data.password,
      redirect: false,
    });
    // console.log(result);
    if (result?.error) {
      if (result.error == "CredentialsSignin") {
        toast({
          title: "Login failed",
          description: "Incorrect username or password",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    }

    if (result?.url) {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Card container */}
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          {/* Heading */}
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join True Feedback
          </h1>
          {/* Subheading */}
          <p className="mb-4">Sign in to start your anonymous adventure</p>
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
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Email/Username" {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit button */}
            <Button type="submit">SignIn</Button>
          </form>
        </Form>

        {/* Sign-in link */}
        <div className="text-center mt-4">
          <p>
            Not a member yet?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
