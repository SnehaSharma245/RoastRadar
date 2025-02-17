import dbConnect from "@/lib/dbConnet"; // Import the utility to connect to the database
import UserModel from "@/model/User"; // Import the User model for interacting with the database
import { z } from "zod"; // Import Zod for schema validation
import { usernameValidation } from "@/schemas/signUpSchema"; // Import custom username validation schema

// Define a Zod schema to validate the `username` query parameter
const UsernameQuerySchema = z.object({
  username: usernameValidation, // Ensure username meets the predefined validation criteria
});

// Define the GET function to check if a username is unique
export async function GET(request: Request) {
  // Uncomment the block below to restrict the route to only GET requests:
  // if (request.method !== "GET") {
  //   return Response.json(
  //     {
  //       success: false,
  //       message: "Only GET method is allowed",
  //     },
  //     { status: 405 }
  //   );
  // }

  // Connect to the database
  await dbConnect();

  try {
    // Extract search parameters (query string) from the request URL
    const { searchParams } = new URL(request.url);
    const queryParam = {
      username: searchParams.get("username"), // Get the value of the `username` parameter
    };

    // Validate the query parameter using Zod
    const result = UsernameQuerySchema.safeParse(queryParam);
    // console.log(result); // Log the validation result for debugging purposes

    // If validation fails, return an appropriate error response
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || []; // Extract username-specific errors
      return Response.json({
        success: false,
        message:
          usernameErrors?.length > 0
            ? usernameErrors.join(", ") // Join multiple errors into a single string
            : "Invalid username", // Generic error if no specific errors exist
      });
    }

    // Destructure the validated `username` from the result
    const { username } = result.data;

    // Check if a user with the given username already exists and is verified
    const existingVerifiedUser = await UserModel.findOne({
      username, // Match the username in the database
      isVerified: true, // Ensure the user is verified
    });

    // If such a user exists, return an error indicating the username is taken
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Username already exists", // Inform the user that the username is not unique
        },
        { status: 400 } // Bad Request status code
      );
    }

    // If no matching verified user is found, return a success response
    return Response.json(
      {
        success: true,
        message: "Username is unique", // Indicate the username is available
      },
      {
        status: 200, // OK status code
      }
    );
  } catch (error) {
    // Log any unexpected errors that occur
    console.error("Error checking username ", error);

    // Return a generic error response with status 500
    return Response.json(
      {
        success: false,
        message: "Error checking username", // Inform the user of the error
      },
      {
        status: 500, // Internal Server Error status code
      }
    );
  }
}
