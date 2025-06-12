"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useToast } from "@/hooks/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";
import {
  Loader,
  Flame,
  Send,
  Lightbulb,
  Target,
  Shield,
  Zap,
} from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";

function Page() {
  const params = useParams<{ username: string }>();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  useEffect(() => {
    const disabledUntil = localStorage.getItem("buttonDisabledUntil");
    if (disabledUntil && Date.now() < Number(disabledUntil)) {
      setDisabled(true);
    } else {
      setDisabled(false);
      localStorage.removeItem("buttonDisabledUntil");
    }
  }, []);

  const { toast } = useToast();

  const fetchSuggestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/suggest-messages");
      setSuggestions(response.data.suggestions);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error("Error fetching suggestions:", error);

      toast({
        title: "🚫 Roast Ideas Offline",
        description:
          "The savage suggestion engine needs a break. Try again when it's cooled down!",
        variant: "destructive",
      });

      if (axiosError.response?.status === 429) {
        setDisabled(true);
        localStorage.setItem(
          "buttonDisabledUntil",
          (Date.now() + 60 * 60 * 1000).toString()
        );
        toast({
          title: "🌡️ Too Hot to Handle",
          description:
            "You've maxed out your roast requests! The servers need time to recover from the heat.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      const response = await axios.post("/api/send-message", {
        username: params.username,
        content: data.content,
      });

      toast({
        title: "🔥 Roast Delivered!",
        description:
          "Your savage message has landed! The target has been thoroughly roasted.",
        duration: 2000,
      });

      form.reset({ content: "" });
    } catch (error) {
      console.error("Error in sending message: ", error);
      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "💥 Roast Failed to Launch",
        description:
          axiosError.response?.data.message ||
          "Your roast got stuck in the oven. Try reheating!",
        variant: "destructive",
      });
    }
  };

  const handleLogoClick = () => {
    setIsNavigating(true);
  };

  const handleHeadingClick = () => {
    setIsNavigating(true);
  };

  if (isNavigating) {
    return <LoadingScreen message="Redirecting to home..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-violet-200 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center justify-center mb-4">
            <Link href="/" onClick={handleLogoClick}>
              <div className="w-16 h-16 mb-3 hover:scale-110 transition-transform duration-300 cursor-pointer">
                <Image
                  src="/logo2.png"
                  alt="RoastRadar Logo"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <Link href="/" onClick={handleHeadingClick}>
              <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer">
                <span className="bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent">
                  Roast
                </span>
                <span className="bg-gradient-to-r from-purple-700 to-purple-900 bg-clip-text text-transparent">
                  Radar
                </span>
              </h1>
            </Link>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-purple-200 p-6 mb-6">
            <div className="flex items-center justify-center mb-3">
              <Target className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-2xl font-bold text-purple-800">
                Target Acquired: {params.username}
              </h2>
            </div>
            <p className="text-purple-700 text-lg flex items-center justify-center gap-2">
              Time to deliver some anonymous fire! <Zap className="w-5 h-5" />{" "}
              What savage feedback do you have?
            </p>
          </div>
        </div>

        {/* Message Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-purple-200 p-6 mb-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          placeholder="Type your roast here... make it count!"
                          className="bg-purple-50 border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-purple-800 placeholder:text-purple-400 rounded-xl p-4 text-lg min-h-20"
                          {...field}
                        />
                        <Flame className="absolute right-3 top-3 w-6 h-6 text-purple-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all duration-300 py-3 rounded-xl font-medium flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Anonymous Roast</span>
                </Button>

                <Button
                  type="button"
                  onClick={fetchSuggestions}
                  disabled={isLoading || disabled}
                  variant="outline"
                  className="border-2 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 rounded-xl py-3 flex items-center space-x-2"
                >
                  {isLoading ? (
                    <Loader className="w-5 h-5 animate-spin" />
                  ) : (
                    <Lightbulb className="w-5 h-5" />
                  )}
                  <span>{isLoading ? "Loading..." : "Get Roast Ideas"}</span>
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Suggestions */}
        {suggestions.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-purple-200 p-6">
            <div className="flex items-center mb-4">
              <Lightbulb className="w-6 h-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-purple-800 flex items-center gap-2">
                Savage Suggestions <Flame className="w-5 h-5" />
              </h2>
            </div>
            <p className="text-purple-700 mb-4">
              Click on any suggestion to use it as your roast!
            </p>
            <div className="grid gap-3">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border-2 border-purple-100 cursor-pointer hover:border-purple-300 hover:shadow-lg transition-all duration-300"
                  onClick={() => form.setValue("content", suggestion)}
                >
                  <div className="flex items-start">
                    <Flame className="w-5 h-5 text-purple-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-purple-800 font-medium leading-relaxed">
                      {suggestion}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Notice */}
        <div className="text-center mt-8">
          <div className="bg-purple-100 border-2 border-purple-200 rounded-2xl p-4">
            <p className="text-purple-700 text-sm flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" /> Your identity is completely
              anonymous. Roast responsibly and keep it fun!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
