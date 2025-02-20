import UserModel from "@/model/User"; // Importing the User model for database operations.
import dbConnect from "@/lib/dbConnet"; // Utility function to connect to the database.
import { Message } from "@/model/User"; // Importing the Message type for type safety.

export async function POST(request: Request) {
  await dbConnect(); // Establishing a connection to the database.

  // Extracting `username` and `content` from the incoming request body.
  const { username, content } = await request.json();

  try {
    // Finding the user by their `username` in the database.
    const user = await UserModel.findOne({ username });

    // If the user does not exist, return a 404 response.
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found", // Error message for missing user.
        },
        {
          status: 404,
        }
      );
    }

    // Checking if the user is accepting messages. If not, return a 403 response.
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User is not accepting the messages", // Message rejection error.
        },
        {
          status: 403,
        }
      );
    }

    // Creating a new message object with the content and the current timestamp.
    const newMessage = { content, createdAt: new Date() };

    // Adding the new message to the user's `messages` array.
    user.messages.push(newMessage as Message);

    // Saving the updated user document in the database.
    await user.save();

    // Returning a success response if the message is sent successfully.
    return Response.json(
      {
        success: true,
        message: "Message sent successfully", // Success message.
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // Logging any errors that occur during the process for debugging purposes.
    console.log("Error adding messages: ", error);

    // Returning a 500 Internal Server Error response if an unexpected error occurs.
    return Response.json(
      {
        success: false,
        message: "Internal Server Error", // Generic error message.
      },
      {
        status: 500,
      }
    );
  }
}
