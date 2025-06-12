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
      "Generate exactly 3 witty and savage roasting messages separated by '||'. Do not include any explanatory text, introductions, or formatting instructions. Just return the three roasts directly. The roasts should be clever, humorous, and mildly savage but not offensive. Focus on universal themes like social media habits, daily routines, or personality quirks. Example format: 'Your WiFi password is probably still password123||You say we should hang out soon but never make plans||Your Spotify Wrapped embarrassed your own music taste'";

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

    // Clean the response to remove any unwanted text
    let cleanedText = text.trim();

    // Remove common prefixes that might appear
    const prefixesToRemove = [
      "Here's the string containing three RoastRadar-ready roasts:",
      "Here are three roasts:",
      "Here's the string:",
      "Three roasts:",
    ];

    for (const prefix of prefixesToRemove) {
      if (cleanedText.startsWith(prefix)) {
        cleanedText = cleanedText.substring(prefix.length).trim();
      }
    }

    // Remove quotes if they wrap the entire response
    if (cleanedText.startsWith("'") && cleanedText.endsWith("'")) {
      cleanedText = cleanedText.slice(1, -1);
    }
    if (cleanedText.startsWith('"') && cleanedText.endsWith('"')) {
      cleanedText = cleanedText.slice(1, -1);
    }

    const suggestions = cleanedText
      .split("||")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

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
