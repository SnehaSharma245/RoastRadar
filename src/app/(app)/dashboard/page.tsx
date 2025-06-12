"use client";
import { useToast } from "@/hooks/use-toast";
import { Message } from "@/model/User";
import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  RefreshCcw,
  Copy,
  Flame,
  Share,
  ToggleLeft,
  ToggleRight,
  Target,
  ChefHat,
  Zap,
  Eye,
  Shield,
} from "lucide-react";
import MessageCard from "@/components/MessageCard";
import { User } from "next-auth";

function page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [baseUrl, setBaseUrl] = useState<string>("");

  const { toast } = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });

  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessages ?? false);
    } catch (error) {
      const axiosError = error as AxiosError as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message ||
          "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<ApiResponse>("/api/get-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast({
            title: "Fresh Roasts Loaded!",
            description: "Check out the latest burns",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError as AxiosError<ApiResponse>;
        toast({
          title: "Error",
          description:
            axiosError.response?.data.message || "Failed to fetch messages",
          variant: "destructive",
        });
      } finally {
        setIsSwitchLoading(false);
        setIsLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();
    fetchAcceptMessage();
  }, [session, setValue, fetchAcceptMessage, fetchMessages]);

  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });

      setValue("acceptMessages", !acceptMessages);

      toast({
        title: response.data.message,
        variant: "default",
      });
    } catch (error) {
      const axiosError = error as AxiosError as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description:
          axiosError.response?.data.message || "Failed to fetch messages",
        variant: "destructive",
      });
    }
  };

  const username: string = (session?.user as User)?.username as string;

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBaseUrl(`${window.location.protocol}//${window.location.host}`);
    }
  }, []);

  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast({
      title: "URL Copied!",
      description: "Share this link to receive epic roasts",
    });
  };

  if (!session || !session.user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-violet-200">
        <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl border-2 border-purple-200 shadow-xl">
          <Flame className="w-16 h-16 text-purple-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-purple-800 mb-2">
            Authentication Required
          </h2>
          <p className="text-purple-700">
            Please login to access your roasting dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-violet-200 p-4 ">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-purple-200 p-6 mb-6 mt-20">
          <div className="flex items-center mb-4">
            <ChefHat className="w-8 h-8 text-purple-600 mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-purple-800 bg-clip-text text-transparent flex items-center gap-2">
              Your Roasting Dashboard{" "}
              <Flame className="w-8 h-8 text-purple-600" />
            </h1>
          </div>
          <p className="text-purple-700 text-lg">
            Welcome back, <span className="font-semibold">{username}</span>!
            Ready to see what people really think?
          </p>
        </div>

        {/* Share Profile Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-purple-200 p-6 mb-6">
          <div className="flex items-center mb-4">
            <Share className="w-6 h-6 text-purple-600 mr-2" />
            <h2 className="text-xl font-bold text-purple-800">
              Share Your Roasting Profile
            </h2>
          </div>
          <p className="text-purple-700 mb-4 flex items-center gap-2">
            Share this link to let people roast you anonymously!{" "}
            <Zap className="w-4 h-4 text-purple-600" />
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="flex-1 p-3 bg-purple-50 border-2 border-purple-200 rounded-xl text-purple-800 font-mono text-sm"
            />
            <Button
              onClick={copyToClipboard}
              className="bg-gradient-to-r from-purple-600 to-violet-600 text-white hover:from-purple-700 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 rounded-xl flex items-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Link</span>
            </Button>
          </div>
        </div>

        {/* Message Settings */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-purple-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {acceptMessages ? (
                <ToggleRight className="w-6 h-6 text-purple-600 mr-2" />
              ) : (
                <ToggleLeft className="w-6 h-6 text-purple-400 mr-2" />
              )}
              <div>
                <h3 className="text-lg font-bold text-purple-800 flex items-center gap-2">
                  Accept Roasts
                  {acceptMessages ? (
                    <Flame className="w-4 h-4 text-purple-600" />
                  ) : (
                    <Shield className="w-4 h-4 text-purple-400" />
                  )}
                </h3>
                <p className="text-purple-600 text-sm">
                  {acceptMessages
                    ? "You're open for business!"
                    : "Taking a break from the heat?"}
                </p>
              </div>
            </div>
            <Switch
              {...register("acceptMessages")}
              checked={acceptMessages}
              onCheckedChange={handleSwitchChange}
              disabled={isSwitchLoading}
              className="data-[state=checked]:bg-purple-600"
            />
          </div>
        </div>

        <Separator className="my-6 bg-purple-200" />

        {/* Refresh Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
            Your Roasts <Target className="w-6 h-6 text-purple-600" />
          </h2>
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              fetchMessages(true);
            }}
            className="border-2 border-purple-200 text-purple-700 hover:bg-purple-100 hover:border-purple-300 rounded-xl flex items-center space-x-2"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4" />
            )}
            <span>Refresh</span>
          </Button>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.length > 0 ? (
            messages.map((message) => (
              <MessageCard
                key={message._id as string}
                message={message}
                onMessageDelete={handleDeleteMessage}
              />
            ))
          ) : (
            <div className="col-span-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-purple-200 p-12 text-center">
              <Eye className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-purple-800 mb-2">
                No Roasts Yet!
              </h3>
              <p className="text-purple-600 flex items-center justify-center gap-2">
                Share your profile link and wait for the savage feedback to pour
                in!
                <Zap className="w-4 h-4 text-purple-600" />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default page;
