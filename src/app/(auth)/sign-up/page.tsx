"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import * as z from "zod";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";
import { signUpSchema } from "@/schemas/signUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Flame, UserPlus, CheckCircle, XCircle } from "lucide-react";

function page() {
  const [username, setUsername] = useState("");
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const debounced = useDebounceCallback(setUsername, 300);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (username) {
        setIsCheckingUsername(true);
        setUsernameMessage("");
        try {
          const response = await axios.get(
            `/api/check-username-unique?username=${username}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? "Error checking username"
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };

    checkUsernameUnique();
  }, [username]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    console.log(data);

    try {
      const response = await axios.post<ApiResponse>("/api/sign-up", data);
      toast({
        title: "Welcome to the Arena! 🔥",
        description: response.data.message,
      });

      router.replace(`/verify/${username}`);
    } catch (error) {
      console.error("Error in signup of user: ", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage = axiosError.response?.data.message;

      toast({
        title: "Signup failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-violet-200 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-purple-200">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Link href="/" className="flex items-center space-x-2">
              <Flame className="w-10 h-10 text-purple-600 mr-2" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-purple-800 bg-clip-text text-transparent">
                RoastRadar
              </h1>
            </Link>
          </div>

          <h2 className="text-2xl font-extrabold text-purple-800 mb-4">
            Join the Roasting Arena!
          </h2>

          <p className="text-purple-700 mb-6">
            Create your account and prepare to get roasted
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="username"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800 font-medium">
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Choose your roast handle"
                      className="bg-purple-50 border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-purple-800 placeholder:text-purple-400 rounded-xl"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounced(e.target.value);
                      }}
                    />
                  </FormControl>

                  <div className="flex items-center space-x-2 mt-2">
                    {isCheckingUsername && (
                      <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
                    )}
                    {usernameMessage && !isCheckingUsername && (
                      <>
                        {usernameMessage === "Username is unique" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <p
                          className={`text-sm font-medium ${
                            usernameMessage === "Username is unique"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {usernameMessage}
                        </p>
                      </>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800 font-medium">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your.email@example.com"
                      className="bg-purple-50 border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-purple-800 placeholder:text-purple-400 rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                      placeholder="Create a strong password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all duration-300 py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Entering the Arena...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Join RoastRadar</span>
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center mt-6">
          <p className="text-purple-700">
            Already getting roasted?{" "}
            <Link
              href="/sign-in"
              className="text-purple-600 hover:text-purple-800 font-semibold underline decoration-purple-400 hover:decoration-purple-600 transition-colors"
            >
              Sign In Here!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default page;
