"use client";

import React, { useEffect, useState } from "react";
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
import { Loader } from "lucide-react";

function Page() {
  const params = useParams<{ username: string }>();
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
      // If time has expired or no value exists in localStorage
      setDisabled(false);
      localStorage.removeItem("buttonDisabledUntil"); // Clear outdated value
    }
  }, []);

  const { toast } = useToast();

  // Function to fetch suggestions
  const fetchSuggestions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/suggest-messages");
      setSuggestions(response.data.suggestions);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      console.error("Error fetching suggestions:", error);

      toast({
        title: "Failed to fetch suggestions",
        description: "Please try again later.",
        variant: "destructive",
      });

      if (axiosError.response?.status === 429) {
        // Rate limit exceeded
        setDisabled(true);
        localStorage.setItem(
          "buttonDisabledUntil",
          (Date.now() + 60 * 60 * 1000).toString()
        );
        toast({
          title: "Rate limit exceeded",
          description: "You can only request suggestions 3 times per hour.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Function to handle form submission
  const onSubmit = async (data: z.infer<typeof messageSchema>) => {
    try {
      const response = await axios.post("/api/send-message", {
        username: params.username,
        content: data.content,
      });

      toast({
        title: "Message sent successfully",
        description: response.data.message,
        duration: 2000,
      });

      // Reset form field
      form.reset({ content: "" });
    } catch (error) {
      console.error("Error in sending message: ", error);
      const axiosError = error as AxiosError<ApiResponse>;

      toast({
        title: "Failed to send message",
        description: axiosError.response?.data.message || "An error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex pt-5 p-3 min-h-screen flex-col bg-blue-50">
      <div className="text-center">
        <h1 className="text-xl font-extrabold tracking-tight lg:text-2xl mb-6">
          {`Send a message to ${params.username}`}
        </h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="content"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Enter a message" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-around">
            <Button type="submit">Send a message</Button>
            <Button
              type="button"
              onClick={fetchSuggestions}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="animate-spin" />
              ) : (
                "Suggest Messages"
              )}
            </Button>
          </div>
        </form>
      </Form>
      {suggestions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Suggestions:</h2>
          <ul className="space-y-2">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 bg-white rounded-lg shadow-sm cursor-pointer hover:bg-gray-50"
                onClick={() => form.setValue("content", suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Page;
