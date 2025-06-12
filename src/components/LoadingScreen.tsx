"use client";
import React from "react";
import { Flame, Target, Zap } from "lucide-react";

interface LoadingScreenProps {
  message?: string;
}

function LoadingScreen({ message = "Loading..." }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-50 via-purple-100 to-violet-200">
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-24 h-24">
            {/* Rotating rings */}
            <div className="absolute inset-0 border-4 border-purple-300 rounded-full animate-spin opacity-20"></div>
            <div className="absolute inset-2 border-4 border-purple-400 rounded-full animate-ping opacity-40"></div>
            <div className="absolute inset-4 border-2 border-purple-500 rounded-full animate-pulse"></div>

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-full p-4 shadow-lg">
                <Flame className="w-8 h-8 text-white animate-bounce" />
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div
            className="absolute -top-4 -right-4 animate-bounce"
            style={{ animationDelay: "0s" }}
          >
            <div className="bg-purple-500 text-white p-2 rounded-full shadow-lg">
              <Target className="w-4 h-4" />
            </div>
          </div>

          <div
            className="absolute -bottom-4 -left-4 animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            <div className="bg-violet-500 text-white p-2 rounded-full shadow-lg">
              <Zap className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Brand */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">
            <span className="text-purple-500">Roast</span>
            <span className="text-purple-800">Radar</span>
          </h1>

          {/* Loading text */}
          <div className="space-y-2">
            <p className="text-purple-700 text-lg font-medium">{message}</p>

            {/* Animated dots */}
            <div className="flex justify-center space-x-1">
              <div
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="bg-purple-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-violet-500 h-full rounded-full animate-pulse w-full"></div>
          </div>
        </div>

        {/* Tagline */}
        <p className="text-purple-600 text-sm font-medium max-w-md mx-auto">
          Preparing the ultimate roasting experience...
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;
