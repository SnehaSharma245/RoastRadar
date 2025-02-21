"use client";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
function page() {
  return (
    <div className="flex justify-center p-3 min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-xl font-extrabold tracking-tight lg:text-5xl mb-6">
            {`Send a message to`}
          </h1>
        </div>
        <Input />
        <Button>Send Message</Button>
      </div>
    </div>
  );
}

export default page;
