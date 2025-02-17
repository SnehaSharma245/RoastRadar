import dbConnect from "@/lib/dbConnet"; // Import database connection utility
import UserModel from "@/model/User"; // Import the user model to interact with the users collection

// POST function to verify the user's account using the verification code
export async function POST(request: Request) {
  // Connect to the database
  await dbConnect();

  try {
    // Parse the incoming JSON body to get username and code
    const { username, code } = await request.json();

    // Decode the username if it was URI-encoded
    const decodedUsername = decodeURIComponent(username);

    // Find the user in the database based on the decoded username
    const user = await UserModel.findOne({ username: decodedUsername });

    // If user is not found, return a 500 error response
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 500,
        }
      );
    }

    // Check if the provided verification code matches the one stored in the database
    const isCodeValid = user.verifyCode === code;

    // Check if the verification code has not expired by comparing expiry date with the current date
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    // If both the code is valid and it's not expired, verify the account
    if (isCodeValid && isCodeNotExpired) {
      // Set the user as verified
      user.isVerified = true;
      // Save the updated user data back to the database
      await user.save();
      // Return a success response with status 200
      return Response.json(
        {
          success: true,
          message: "Account verified successfully",
        },
        {
          status: 200,
        }
      );
    }
    // If the code is expired, return a response indicating the code has expired
    else if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message:
            "Verification code has expired, please sign up again to get a new code",
        },
        {
          status: 400,
        }
      );
    }
    // If the code is incorrect, return an error response
    else {
      return Response.json(
        {
          success: false,
          message: "Verification code is incorrect",
        },
        {
          status: 400,
        }
      );
    }
  } catch (error) {
    // Log any unexpected error that occurs during the process
    console.error("Error verifying user ", error);
    // Return a generic error response with status 500
    return Response.json(
      {
        success: false,
        message: "Error verifying user",
      },
      {
        status: 500,
      }
    );
  }
}
