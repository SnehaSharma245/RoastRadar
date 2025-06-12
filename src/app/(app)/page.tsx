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
      <main className="page-content flex-grow px-4 min-h-screen relative pt-16 sm:pt-20">
        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto min-h-screen flex items-center justify-center py-8 sm:py-0">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full text-center lg:text-left">
            {/* Left Side - Text Content */}
            <div className="space-y-4 sm:space-y-6 flex flex-col items-center lg:items-start">
              {/* Mobile Hero Image - Only visible on mobile */}
              <div className="flex justify-center mb-6 lg:hidden">
                <div className="relative w-48 h-48 sm:w-56 sm:h-56">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-violet-500 rounded-2xl blur-xl opacity-20"></div>
                  <div className="relative bg-white rounded-2xl p-3 shadow-2xl border-2 border-purple-200">
                    <Image
                      src="/hero_1.png"
                      alt="RoastRadar Mobile Hero"
                      width={200}
                      height={200}
                      className="w-full h-full rounded-xl object-cover"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center lg:justify-start mb-4 sm:mb-6 w-full">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold bg-clip-text text-transparent leading-tight text-center lg:text-left">
                  <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-500 bg-clip-text text-transparent">
                    Roast
                  </span>
                  <span className="bg-gradient-to-r from-purple-700 via-purple-800 to-purple-900 bg-clip-text text-transparent">
                    Radar
                  </span>
                </h1>
              </div>

              <div className="space-y-3 sm:space-y-4 text-center lg:text-left w-full">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-800 leading-tight text-center lg:text-left">
                  Where Radar Catches the
                  <br />
                  Roastest Toasts!
                </h2>
                <p className="text-lg sm:text-xl text-purple-700 font-medium max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
                  Get ready for the most savage anonymous feedback experience.
                  Share your profile and let the burns begin!
                </p>
              </div>

              {/* Feature Pills */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3 mt-6 sm:mt-8 w-full">
                <div className="flex items-center bg-purple-100 border-2 border-purple-200 rounded-full px-4 py-2 shadow-sm">
                  <FlameIcon className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2" />
                  <span className="text-purple-800 font-medium text-sm sm:text-base">
                    Seariously Savage
                  </span>
                </div>
                <div className="flex items-center bg-purple-100 border-2 border-purple-200 rounded-full px-4 py-2 shadow-sm">
                  <Skull className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2" />
                  <span className="text-purple-800 font-medium text-sm sm:text-base">
                    Deadly Burns
                  </span>
                </div>
                <div className="flex items-center bg-purple-100 border-2 border-purple-200 rounded-full px-4 py-2 shadow-sm">
                  <Ghost className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 mr-2" />
                  <span className="text-purple-800 font-medium text-sm sm:text-base">
                    Phantom Roasts
                  </span>
                </div>
              </div>

              {/* Stats Section - Mobile Only */}
              <div className="grid grid-cols-3 gap-4 mt-8 lg:hidden w-full max-w-md mx-auto">
                <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
                  <div className="text-2xl font-bold text-purple-800">100%</div>
                  <div className="text-sm text-purple-600">Anonymous</div>
                </div>
                <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
                  <div className="text-2xl font-bold text-purple-800">24/7</div>
                  <div className="text-sm text-purple-600">Available</div>
                </div>
                <div className="text-center bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
                  <div className="text-2xl font-bold text-purple-800">∞</div>
                  <div className="text-sm text-purple-600">Roasts</div>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Images - Hidden on mobile */}
            <div className="relative items-center justify-center lg:justify-end hidden lg:flex">
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

        {/* How It Works Section - Mobile Enhanced */}
        <section className="w-full max-w-4xl mx-auto py-12 sm:py-16 lg:hidden">
          <div className="text-center space-y-8 px-4">
            <h3 className="text-3xl font-bold text-purple-800 mb-8 text-center">
              How It Works
            </h3>
            <div className="grid gap-6 max-w-md mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 shadow-lg text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Target className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-purple-800 mb-2">
                  1. Create Account
                </h4>
                <p className="text-purple-700">
                  Sign up and get your unique roasting profile link to share
                  with others.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 shadow-lg text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-purple-800 mb-2">
                  2. Share Link
                </h4>
                <p className="text-purple-700">
                  Send your profile to friends and watch the anonymous roasts
                  roll in!
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 shadow-lg text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-purple-100 rounded-full p-3">
                    <Flame className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <h4 className="text-xl font-bold text-purple-800 mb-2">
                  3. Get Roasted
                </h4>
                <p className="text-purple-700">
                  Receive savage but fun anonymous feedback and enjoy the heat!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="w-full flex justify-center items-center py-12 sm:py-16">
          <div className="text-center w-full max-w-4xl mx-auto px-4">
            <h3 className="text-2xl sm:text-3xl font-bold text-purple-800 mb-8 text-center">
              Sample Roasts
            </h3>
            <Carousel
              plugins={[Autoplay({ delay: 3000 })]}
              className="w-full max-w-sm sm:max-w-2xl mx-auto"
            >
              <CarouselContent>
                {messages.map((message, index) => (
                  <CarouselItem key={index}>
                    <div className="p-2 sm:p-4">
                      <Card className="shadow-purple-200 shadow-lg bg-white border border-purple-200 rounded-2xl sm:rounded-3xl hover:shadow-purple-300 hover:shadow-xl transition-all duration-300 hover:border-purple-300 hover:-translate-y-1 overflow-hidden">
                        <CardHeader className="text-lg sm:text-xl font-bold text-purple-700 pb-2 sm:pb-3 px-4 sm:px-8 pt-4 sm:pt-6">
                          {message.title}
                        </CardHeader>
                        <CardContent className="flex items-center justify-center p-4 sm:p-8 bg-purple-50 rounded-b-2xl sm:rounded-b-2xl">
                          <span className="text-base sm:text-lg font-medium text-purple-800 text-center leading-relaxed">
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
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full max-w-4xl mx-auto py-12 sm:py-16 px-4 sm:px-6">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="space-y-4 text-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent flex items-center justify-center gap-3 flex-wrap text-center">
                Ready to handle the heat?{" "}
                <Flame className="w-8 h-8 sm:w-10 sm:h-10 text-purple-600" />
              </h3>
              <p className="text-lg sm:text-xl text-purple-600 font-medium px-4 max-w-2xl mx-auto text-center">
                Step into the arena where words burn and egos melt. Join
                thousands who dare to get roasted!
              </p>
            </div>

            <div className="relative group max-w-2xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-300 to-violet-300 rounded-2xl sm:rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              <div className="relative bg-white border-2 border-purple-200 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-purple-200 shadow-lg hover:shadow-purple-300 hover:shadow-xl transition-all duration-300 hover:border-purple-300 text-center">
                <div className="flex items-center justify-center space-x-3 mb-4 flex-wrap gap-2">
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
                  <h4 className="text-xl sm:text-2xl font-bold text-purple-800">
                    Enter the Roast Zone
                  </h4>
                  <Flame className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
                </div>
                <p className="text-purple-700 font-medium text-lg sm:text-xl leading-relaxed mb-6 text-center">
                  Share your profile and let the anonymous roasting begin!
                  <br />
                  <span className="text-purple-600 text-base sm:text-lg">
                    No mercy. No limits. Just pure savage energy.
                  </span>
                </p>
                <div className="flex flex-wrap justify-center gap-3">
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
        <div className="relative max-w-4xl mx-auto px-6 py-8">
          <div className="text-center space-y-6">
            {/* Logo & Brand */}
            <div className="flex items-center justify-center space-x-2">
              <div className="w-12 h-12">
                <Image
                  src="/logo2.png"
                  alt="RoastRadar Logo"
                  width={48}
                  height={48}
                  className="w-full h-full object-contain"
                />
              </div>
              <h2 className="text-3xl font-bold">
                <span className="text-purple-500">Roast</span>
                <span className="text-purple-800">Radar</span>
              </h2>
            </div>

            {/* Tagline */}
            <p className="text-xl font-medium text-purple-600 flex items-center justify-center gap-2">
              Where savage meets anonymous <Flame className="w-6 h-6" />
            </p>

            {/* Copyright */}
            <div className="border-t border-purple-100 pt-4">
              <p className="text-purple-500 text-base">
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
