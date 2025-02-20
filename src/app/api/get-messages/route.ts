import { getServerSession } from "next-auth"; // Importing the function to fetch the current session.
import { authOptions } from "../auth/[...nextauth]/options"; // Authentication options for NextAuth.
import dbConnect from "@/lib/dbConnet"; // Utility function to connect to the database.
import UserModel from "@/model/User"; // User model for MongoDB operations.
import { User } from "next-auth"; // Importing the User type from NextAuth.
import mongoose from "mongoose"; // Importing Mongoose for working with MongoDB.

export async function GET(request: Request) {
  await dbConnect(); // Establish a connection to the database.

  const session = await getServerSession(authOptions); // Get the current authenticated session.
  const user: User = session?.user as User; // Extract the user from the session and cast it to the User type.

  // Check if the user is authenticated; if not, return a 401 Unauthorized response.
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated", // Error message for unauthenticated access.
      },
      { status: 401 }
    );
  }

  // Convert the user ID (which is a string in the model) into a Mongoose ObjectId.
  // Aggregation pipelines require proper ObjectId types for queries involving `_id`.
  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    // Aggregate the user's messages using MongoDB's aggregation pipeline.
    const user = await UserModel.aggregate([
      { $match: { id: userId } }, // Match the user by their unique ID.
      { $unwind: "$messages" }, // Deconstruct the `messages` array into individual documents.
      { $sort: { "messages.createdAt": -1 } }, // Sort messages by their `createdAt` field in descending order.
      {
        $group: {
          _id: "$_id", // Group messages back by the user ID.
          messages: { $push: "$messages" }, // Push sorted messages back into an array.
        },
      },
    ]);

    // If no user or messages are found, return a 401 Unauthorized response.
    if (!user || user.length === 0) {
      return Response.json(
        {
          success: false,
          message: "User not found", // Error message for missing user or messages.
        },
        { status: 401 }
      );
    }

    // Return the messages array for the authenticated user.
    return Response.json(
      {
        success: true,
        messages: user[0].messages, // Access the user's messages from the first result.
      },
      { status: 200 }
    );
  } catch (error) {
    // Log any unexpected errors for debugging purposes.
    console.log("An unexpected error occurred: ", error);

    // Return a 500 Internal Server Error response with a generic error message.
    return Response.json(
      {
        success: false,
        messages: "An unexpected error occurred", // Error message for server issues.
      },
      { status: 500 }
    );
  }
}
