"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flame, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import dayjs from "dayjs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Message } from "@/model/User";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

function MessageCard({ message, onMessageDelete }: MessageCardProps) {
  const { toast } = useToast();
  const handleDeleteConfirm = async () => {
    await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`);

    toast({
      title: "Roast Deleted! 🗑️",
      description: "That burn has been removed from your collection",
    });
    onMessageDelete(message._id as string);
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:border-purple-300">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center mb-2">
              <Flame className="w-5 h-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
                Anonymous Roast
              </span>
            </div>
            <CardTitle className="text-purple-800 leading-relaxed text-base">
              {message.content}
            </CardTitle>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="ml-3 bg-red-500 hover:bg-red-600 rounded-xl"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white border-2 border-purple-200 rounded-2xl">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-purple-800 flex items-center">
                  <Flame className="w-5 h-5 mr-2" />
                  Delete This Roast?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-purple-700">
                  Are you sure you want to delete this roast? This action cannot
                  be undone and the burn will be lost forever! 🔥
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-2 border-purple-200 text-purple-700 hover:bg-purple-100 rounded-xl">
                  Keep the Heat
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteConfirm}
                  className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
                >
                  Delete Roast
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div className="text-sm text-purple-600 mt-3 flex items-center">
          <span className="bg-purple-50 px-2 py-1 rounded-lg">
            🕒 {dayjs(message.createdAt).format("MMM D, YYYY h:mm A")}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-3 rounded-xl border border-purple-100">
          {" "}
          <p className="text-purple-700 text-sm font-medium">
            💭 How do you feel about this roast? Remember, it&apos;s all in good
            fun!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default MessageCard;
