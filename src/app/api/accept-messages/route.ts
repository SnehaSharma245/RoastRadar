import { getServerSession } from "next-auth"; // Importing function to retrieve the current user session.
import { authOptions } from "../auth/[...nextauth]/options"; // Authentication options for NextAuth.
import dbConnect from "@/lib/dbConnet"; // Database connection utility.
import UserModel from "@/model/User"; // User model for MongoDB operations.
import { User } from "next-auth"; // Importing the User type from NextAuth.

export async function POST(request: Request) {
  await dbConnect(); // Ensure the database connection is established.

  const session = await getServerSession(authOptions); // Fetch the current session to check user authentication.
  const user: User = session?.user as User; // Extract the user from the session object and cast to the User type.

  // Check if the user is authenticated; if not, return a 401 response.
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated", // Error message for unauthenticated users.
      },
      {
        status: 401, // HTTP status code for Unauthorized.
      }
    );
  }

  const userId = user._id; // Extract user ID from the session object.
  const { acceptMessages } = await request.json(); // Parse the request body to get the `acceptMessages` value.

  try {
    // Update the user's `isAcceptingMessage` field in the database.
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId, // Find user by their ID.
      { isAcceptingMessage: acceptMessages }, // Update the `isAcceptingMessage` field with the provided value.
      { new: true } // Return the updated document after modification.
    );

    // If no user was updated, return a 401 response.
    if (!updatedUser) {
      return Response.json(
        {
          success: false,
          message: "Not Found Updated User", // Error when no matching user is found.
        },
        {
          status: 401,
        }
      );
    }

    // Success response with the updated user data.
    return Response.json(
      {
        success: true,
        message: "Message acceptance status updated successfully", // Success message.
        updatedUser, // Return the updated user data.
      },
      {
        status: 200, // HTTP status code for OK.
      }
    );
  } catch (error) {
    // Log the error to the console for debugging.
    console.log("Failed to update user status to accept messages: ", error);

    // Return a 500 response for server errors.
    return Response.json(
      {
        success: false,
        message: "Failed to update user status to accept messages", // Error message for server issues.
      },
      {
        status: 500, // HTTP status code for Internal Server Error.
      }
    );
  }
}

export async function GET(request: Request) {
  await dbConnect(); // Ensure the database connection is established.

  const session = await getServerSession(authOptions); // Fetch the current session to check user authentication.
  const user: User = session?.user as User; // Extract the user from the session object and cast to the User type.

  // Check if the user is authenticated; if not, return a 401 response.
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated", // Error message for unauthenticated users.
      },
      {
        status: 401, // HTTP status code for Unauthorized.
      }
    );
  }

  const userId = user._id; // Extract user ID from the session object.

  try {
    // Find the user in the database by their ID.
    const foundUser = await UserModel.findById(userId);

    // If no user is found, return a 404 response.
    if (!foundUser) {
      return Response.json(
        {
          success: false,
          message: "User not found", // Error message for missing user.
        },
        {
          status: 404, // HTTP status code for Not Found.
        }
      );
    }

    // Success response with the user's `isAcceptingMessage` field.
    return Response.json(
      {
        success: true,
        isAcceptingMessages: foundUser.isAcceptingMessage, // Return the `isAcceptingMessage` status.
      },
      {
        status: 200, // HTTP status code for OK.
      }
    );
  } catch (error) {
    // Log the error to the console for debugging.
    console.log("Failed to update user status to accept messages: ", error);

    // Return a 500 response for server errors.
    return Response.json(
      {
        success: false,
        message: "Error in getting message acceptance status", // Error message for server issues.
      },
      {
        status: 500, // HTTP status code for Internal Server Error.
      }
    );
  }
}
