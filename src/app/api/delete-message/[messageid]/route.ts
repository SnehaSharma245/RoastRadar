import { getServerSession } from "next-auth"; // Importing the function to fetch the current session.
import { authOptions } from "../../auth/[...nextauth]/options"; // Authentication options for NextAuth.
import dbConnect from "@/lib/dbConnet"; // Utility function to connect to the database.
import UserModel from "@/model/User"; // User model for MongoDB operations.
import { User } from "next-auth"; // Importing the User type from NextAuth.

export async function DELETE(
  request: Request,
  { params }: { params: { messageid: string } }
) {
  const { messageid } = await params;
  console.log(messageid);
  await dbConnect(); // Establish a connection to the database.

  const session = await getServerSession(authOptions); // Get the current authenticated session.
  const user: User = session?.user as User; // Extract the user from the session and cast it to the User type.

  // Check if the user is authenticated; if not, return a 401 Unauthorized response.
  if (!session || !user) {
    return Response.json(
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
      { $pull: { messages: { _id: messageid } } }
    );

    if (updateResult.modifiedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "Message not found or already deleted",
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "Message deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in deleting message route: ", error);
    return Response.json(
      {
        success: false,
        message: "Error deleting message", // Error message for unauthenticated access.
      },
      { status: 401 }
    );
  }
}
