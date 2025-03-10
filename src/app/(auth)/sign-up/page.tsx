"use client";

// Import necessary modules and libraries
import { zodResolver } from "@hookform/resolvers/zod"; // For integrating Zod validation with React Hook Form
import { useForm } from "react-hook-form"; // React Hook Form for handling forms
import { Form } from "@/components/ui/form"; // Custom Form component
import Link from "next/link"; // For client-side navigation in Next.js
import * as z from "zod"; // Zod for schema-based validation
import React, { useEffect, useState } from "react"; // React hooks for state and lifecycle
import { useRouter } from "next/navigation"; // Next.js router for navigation
import { useDebounceCallback } from "usehooks-ts"; // For debouncing a callback function
import { useToast } from "@/hooks/use-toast"; // Custom toast notifications

import { signUpSchema } from "@/schemas/signUpSchema"; // Schema for signup form validation
import axios, { AxiosError } from "axios"; // Axios for API requests
import { ApiResponse } from "@/types/ApiResponse"; // Type for API response
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"; // UI components for form
import { Input } from "@/components/ui/input"; // Input component
import { Button } from "@/components/ui/button"; // Button component
import { Loader2 } from "lucide-react"; // Loader spinner icon

// Main page component
function page() {
  // States for handling username, checking username uniqueness, and form submission status
  const [username, setUsername] = useState(""); // Stores the username input
  const [usernameMessage, setUsernameMessage] = useState(""); // Message for username validation
  const [isCheckingUsername, setIsCheckingUsername] = useState(false); // Flag for checking username
  const [isSubmitting, setIsSubmitting] = useState(false); // Flag for form submission

  // Debouncing to delay updating the username state until typing stops
  const debounced = useDebounceCallback(setUsername, 300);

  // Toast notifications for feedback
  const { toast } = useToast();

  // Next.js router for navigation
  const router = useRouter();

  // Setting up React Hook Form with Zod validation schema
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema), // Connect Zod schema with React Hook Form
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Effect to check if the username is unique whenever the `username` state changes
  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true); // Indicate that the username check is in progress
        setUsernameMessage(""); // Reset the message
        try {
          // API call to check if the username is unique
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message); // Update the message based on the response
        } catch (error) {
          // Handle errors from the API
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false); // Reset the flag after checking
        }
      }
    };

    checkUsernameUnique(); // Call the function
  }, [username]); // Runs every time `username` changes

  // Handle form submission
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true); // Indicate that form submission is in progress
    console.log(data);

    try {
      // Send signup data to the API
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      // Show success toast
      toast({
        title: "Success",
        description: response.data.message,
      });

      // Navigate to the verification page
      router.replace(`/verify/${username}`);
    } catch (error) {
      // Handle errors during signup
      console.error("Error in signup of user: ", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;

      // Show error toast
      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false); // Reset the flag after submission
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      {/* Card container */}
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-md">
        <div className="text-center">
          {/* Heading */}
          <h1 className="text-3xl font-extrabold tracking-tight text-teal-400 lg:text-4xl mb-6">
            Join Anonymous Feedback
          </h1>
          {/* Subheading */}
          <p className="mb-4 text-gray-300">
            Sign up to start your anonymous adventure
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Username field */}
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username"
                      className="focus:ring-2 focus:ring-teal-500 focus:outline-none bg-gray-700 text-gray-300 border-gray-600"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e); // Update form field
                        debounced(e.target.value); // Debounce username input
                      }}
                    />
                  </FormControl>
                  {/* Loader for checking username */}
                  {isCheckingUsername && <Loader2 className="animate-spin" />}
                  {/* Username validation message */}
                  <p
                    className={`text-sm ${
                      usernameMessage === "Username is unique"
                        ? "text-green-500"
                        : "text-red-500"
                    } `}
                  >
                    {usernameMessage}
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email field */}
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      className="focus:ring-2 focus:ring-teal-500 focus:outline-none bg-gray-700 text-gray-300 border-gray-600"
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
                  <FormLabel className="text-gray-300">Password</FormLabel>
                  <FormControl>
                    <Input
                      className="focus:ring-2 focus:ring-teal-500 focus:outline-none bg-gray-700 text-gray-300 border-gray-600"
                      type="password"
                      placeholder="password"
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
              disabled={isSubmitting}
              className="w-full bg-teal-500 text-gray-900 hover:bg-amber-400 hover:text-gray-900"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                  wait...
                </>
              ) : (
                "Signup"
              )}
            </Button>
          </form>
        </Form>

        {/* Sign-in link */}
        <div className="text-center mt-4">
          <p className="text-gray-300">
            Already a member?{" "}
            <Link
              href="/sign-in"
              className="text-teal-400 hover:text-amber-400"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
