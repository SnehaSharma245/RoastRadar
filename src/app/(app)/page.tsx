"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import messages from "@/messages.json";
import Autoplay from "embla-carousel-autoplay";
import { FlameIcon, Skull, Ghost, Flame, Target, Zap, Eye } from "lucide-react";
import LoadingScreen from "@/components/LoadingScreen";
import { useRouter } from "next/navigation";

function Home() {
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  if (isNavigating) {
    return <LoadingScreen message="Loading..." />;
  }

  return (
    <>
      <main className="page-content flex-grow px-4 min-h-screen relative pt-20">
        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
            {/* Left Side - Text Content */}
            <div className="text-left space-y-6">
              <div className="flex items-center mb-6">
                <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent">
                  <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-500 bg-clip-text text-transparent">
                    Roast
                  </span>
                  <span className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 bg-clip-text text-transparent">
                    Radar
                  </span>
                </h1>
              </div>{" "}
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-bold text-purple-800 leading-tight">
                  Where Radar Catches the
                  <br />
                  Roastest Toasts!
                </h2>
              </div>
              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 mt-8">
                <div className="flex items-center bg-purple-100 border-2 border-purple-200 rounded-full px-4 py-2">
                  <FlameIcon className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-purple-800 font-medium">
                    Seariously Savage
                  </span>
                </div>
                <div className="flex items-center bg-purple-100 border-2 border-purple-200 rounded-full px-4 py-2">
                  <Skull className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-purple-800 font-medium">
                    Deadly Burns
                  </span>
                </div>
                <div className="flex items-center bg-purple-100 border-2 border-purple-200 rounded-full px-4 py-2">
                  <Ghost className="w-5 h-5 text-purple-600 mr-2" />
                  <span className="text-purple-800 font-medium">
                    Phantom Roasts
                  </span>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Images */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-lg">
                {/* Hero Image 1 */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative bg-white rounded-2xl p-4 shadow-2xl border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-3xl hover:-translate-y-2">
                    <Image
                      src="/hero_1.png"
                      alt="RoastRadar Hero 1"
                      width={280}
                      height={280}
                      className="w-full h-auto rounded-xl object-cover"
                      priority
                    />
                  </div>
                </div>

                {/* Hero Image 2 */}
                <div className="relative group md:mt-12">
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-400 to-purple-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative bg-white rounded-2xl p-4 shadow-2xl border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 hover:shadow-3xl hover:-translate-y-2">
                    <Image
                      src="/hero_2.png"
                      alt="RoastRadar Hero 2"
                      width={280}
                      height={280}
                      className="w-full h-auto rounded-xl object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="w-full flex justify-center items-center py-16">
          <Carousel
            plugins={[Autoplay({ delay: 3000 })]}
            className="w-full max-w-2xl"
          >
            <CarouselContent>
              {messages.map((message, index) => (
                <CarouselItem key={index}>
                  <div className="p-4">
                    <Card className="shadow-purple-200 shadow-lg bg-white border border-purple-200 rounded-3xl hover:shadow-purple-300 hover:shadow-xl transition-all duration-300 hover:border-purple-300 hover:-translate-y-1 overflow-hidden">
                      <CardHeader className="text-xl font-bold text-purple-700 pb-3 px-8 pt-6">
                        {message.title}
                      </CardHeader>
                      <CardContent className="flex items-center justify-center p-8 bg-purple-50 rounded-b-2xl">
                        <span className="text-lg font-medium text-purple-800 text-center leading-relaxed">
                          {message.content}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="text-purple-600 hover:text-white hover:bg-purple-600 border border-purple-300 hover:border-purple-600 shadow-purple-200 shadow-md transition-all duration-300" />
            <CarouselNext className="text-purple-600 hover:text-white hover:bg-purple-600 border border-purple-300 hover:border-purple-600 shadow-purple-200 shadow-md transition-all duration-300" />
          </Carousel>
        </section>

        {/* Call to Action */}
        <section className="w-full max-w-4xl mx-auto py-16 px-6">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
                Ready to handle the heat?{" "}
                <Flame className="w-8 h-8 text-purple-600" />
              </h3>
              <p className="text-lg text-purple-600 font-medium">
                Step into the arena where words burn and egos melt
              </p>
            </div>

            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-violet-300 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white border-2 border-purple-200 p-8 rounded-3xl shadow-purple-200 shadow-lg hover:shadow-purple-300 hover:shadow-xl transition-all duration-300 hover:border-purple-300">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <Target className="w-6 h-6 text-purple-600" />
                  <h4 className="text-xl font-bold text-purple-800">
                    Enter the Roast Zone
                  </h4>
                  <Flame className="w-6 h-6 text-purple-600" />
                </div>
                <p className="text-purple-700 font-medium text-lg leading-relaxed">
                  Share your profile and let the anonymous roasting begin!
                  <br />
                  <span className="text-purple-600 text-base">
                    No mercy. No limits. Just pure savage energy.
                  </span>
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold border border-purple-200 flex items-center gap-2">
                    <Skull className="w-4 h-4" /> Brutal Honest
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold border border-purple-200 flex items-center gap-2">
                    <Eye className="w-4 h-4" /> 100% Anonymous
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold border border-purple-200 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Instant Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="relative bg-white border-t border-purple-100">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-violet-50/50"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-2">
          <div className="text-center space-y-6">
            {/* Logo & Brand */}
            <div className="flex items-center justify-center space-x-1">
              <div className="w-10 h-10">
                <Image
                  src="/logo2.png"
                  alt="RoastRadar Logo"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold">
                <span className="text-purple-500">Roast</span>
                <span className="text-purple-800">Radar</span>
              </h2>
            </div>

            {/* Tagline */}
            <p className="text-lg font-medium text-purple-600 flex items-center justify-center gap-2">
              Where savage meets anonymous <Flame className="w-5 h-5" />
            </p>

            {/* Copyright */}
            <div className="border-t border-purple-100 pt-4">
              <p className="text-purple-500 text-sm">
                © 2025 RoastRadar. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
