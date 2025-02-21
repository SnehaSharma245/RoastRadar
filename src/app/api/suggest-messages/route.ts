import { NextResponse } from "next/server";
import { GoogleGenerativeAI, GenerativeModel } from "@google/generative-ai";

// Gemini API client initialize karna
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const userClickCounts = new Map<
  string,
  { count: number; lastClickTime: number }
>();

export const runtime = "edge";

export async function POST(request: Request) {
  const userIP = request.headers.get("x-forwarded-for") || "unknown";

  try {
    // Check if user exists in the map
    const userData = userClickCounts.get(userIP);

    // Rate limit check
    if (
      userData &&
      userData.count >= 3 &&
      Date.now() - userData.lastClickTime < 60 * 60 * 1000
    ) {
      const remainingTime =
        60 - Math.floor((Date.now() - userData.lastClickTime) / 60_000);
      return NextResponse.json(
        {
          error: `Rate limit exceeded. Please try again after ${remainingTime} minutes.`,
        },
        { status: 429 }
      );
    }

    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    // Gemini model initialize karna
    const model: GenerativeModel = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite-preview-02-05",
    });

    // Fetching and parsing Gemini API response
    const result = await model.generateContent(prompt);

    if (!result?.response) {
      throw new Error("Invalid response from Gemini API.");
    }

    const text = await result.response.text();

    if (!text || text.trim() === "") {
      throw new Error("Empty response from Gemini API.");
    }

    const suggestions = text.split("||");

    // Update user click count
    const newCount = userData ? userData.count + 1 : 1;
    userClickCounts.set(userIP, {
      count: newCount,
      lastClickTime: Date.now(),
    });

    // Response format and send to client
    return NextResponse.json({ suggestions });
  } catch (err) {
    let errorMessage = "An unexpected error occurred. Please try again later.";

    if (err instanceof Error) {
      errorMessage = err.message;
    }

    console.error(`Error for user ${userIP}:`, err);

    // Fallback error response
    return NextResponse.json(
      { error: errorMessage },
      { status: errorMessage.includes("rate limit") ? 429 : 500 }
    );
  }
}
