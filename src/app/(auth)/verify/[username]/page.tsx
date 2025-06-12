"use client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Form } from "@/components/ui/form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Flame, Shield, CheckCircle } from "lucide-react";
import Link from "next/link";
import LoadingScreen from "@/components/LoadingScreen";

function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const { toast } = useToast();
  const [isNavigating, setIsNavigating] = useState(false);
  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    defaultValues: {
      code: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    try {
      await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });

      toast({
        title: "🔥 Account Verified!",
        description:
          "Welcome to the roasting arena! You're ready to get burned!",
      });

      setIsNavigating(true);
      router.replace("/sign-in");
    } catch (error) {
      console.error("Error in verification: ", error);
      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "🚫 Verification Failed",
        description:
          axiosError.response?.data.message ||
          "The verification gods are not pleased. Try again!",
        variant: "destructive",
      });
    }
  };

  if (isNavigating) {
    return <LoadingScreen message="Verification successful! Redirecting..." />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-violet-200 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-purple-200">
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-10 h-10 text-purple-600 mr-2" />
            <Flame className="w-10 h-10 text-purple-600" />
            <CheckCircle className="w-10 h-10 text-purple-600 ml-2" />
          </div>

          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-purple-800 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-2">
            Almost There! <Flame className="w-8 h-8 text-purple-600" />
          </h1>

          <div className="bg-purple-100 border-2 border-purple-200 rounded-xl p-4 mb-6">
            <h2 className="text-lg font-bold text-purple-800 mb-2">
              Verify Your RoastRadar Account
            </h2>
            <p className="text-purple-700">
              Hey <span className="font-semibold">{params.username}</span>!
              We&apos;ve sent a verification code to your email. Enter it below
              to join the roasting party!
            </p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-purple-800 font-medium">
                    Verification Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your 6-digit code"
                      className="bg-purple-50 border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-purple-800 placeholder:text-purple-400 rounded-xl p-4 text-center text-lg font-mono tracking-wider"
                      maxLength={6}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all duration-300 py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Verify & Enter Arena</span>
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
            <p className="text-purple-700 text-sm">
              Didn&apos;t receive the code? Check your spam folder or{" "}
              <Link
                href="/sign-up"
                className="text-purple-600 hover:text-purple-800 font-semibold underline"
              >
                try signing up again
              </Link>
              !
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyAccount;
