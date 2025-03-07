import { getServerSession } from "next-auth"; // Importing the function to fetch the current session.
import { authOptions } from "@/app/api/auth/[...nextauth]/options"; // Authentication options for NextAuth.
import dbConnect from "@/lib/dbConnet"; // Utility function to connect to the database.
import UserModel from "@/model/User"; // User model for MongoDB operations.
import { NextResponse, NextRequest } from "next/server"; // Import NextRequest and NextResponse
import { User as NextAuthUser } from "next-auth"; // Import the base User type

// Extend the User type to include _id
interface User extends NextAuthUser {
  _id: string;
}

export async function DELETE(request: NextRequest): Promise<Response> {
  // Extract messageid directly from the URL
  const url = new URL(request.url);
  const messageid = url.pathname.split("/").pop(); // Assuming messageid is at the end of the URL
  console.log("Message ID:", messageid);

  // Ensure the database connection is established
  await dbConnect();

  const session = await getServerSession(authOptions); // Get the current authenticated session.
  const user: User = session?.user as User; // Extract the user from the session and cast it to the User type.

  // Check if the user is authenticated; if not, return a 401 Unauthorized response.
  if (!session || !user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not Authenticated", // Error message for unauthenticated access.
      },
      { status: 401 }
    );
  }

  try {
    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageid } } } // Use $pull operator to remove the message
    );

    if (updateResult.modifiedCount === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        { status: 404 } // Use 404 for "Not Found"
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Message deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE request: ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error deleting message",
      },
      { status: 500 } // Use 500 for "Internal Server Error"
    );
  }
}
