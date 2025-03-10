"use client";
import React from "react";
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

function Home() {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-8 bg-gray-900 text-gray-200">
        {/* Header Section */}
        <section className="text-center mb-8">
          <h1 className="text-2xl md:text-4xl font-bold text-teal-400">
            Dive into the World of Anonymous Feedback
          </h1>
          <p className="mt-3 text-sm md:text-base text-gray-400">
            Anonymous Feedback - Where your identity remains a secret.
          </p>
        </section>

        {/* Carousel Section */}
        <Carousel
          plugins={[Autoplay({ delay: 2500 })]}
          className="w-full max-w-sm md:max-w-md"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index}>
                <div className="p-2">
                  <Card className="shadow-lg bg-gray-800 border border-teal-500 rounded-lg">
                    <CardHeader className="text-base font-semibold text-teal-400">
                      {message.title}
                    </CardHeader>
                    <CardContent className="flex items-center justify-center p-4 bg-gray-900 h-36">
                      <span className="text-sm md:text-base font-medium text-gray-300 text-center">
                        {message.content}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-teal-500 hover:text-amber-400" />
          <CarouselNext className="text-teal-500 hover:text-amber-400" />
        </Carousel>
      </main>

      {/* Footer Section */}
      <footer className="text-center p-3 bg-gray-800 text-gray-400">
        <p className="text-xs md:text-sm">
          © 2023 True Feedback. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default Home;
