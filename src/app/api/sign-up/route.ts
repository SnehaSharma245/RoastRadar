import dbConnect from "@/lib/dbConnet";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";

//helper function for sending verification email
import sendVerificationEmail from "@/helpers/sendVerificationEmail";

//(request: Request)
// Yeh function ka parameter hai, jo HTTP request object ko represent karta hai.
//Request is a blueprint/class provided by the browser.
//request is the actual object you receive in a server-side function or API route.
export async function POST(request: Request) {
  // if (request.method !== "POST") {
  //   return Response.json(
  //     {
  //       success: false,
  //       message: "only POST method is allowed",
  //     },
  //     {
  //       status: 405,
  //     }
  //   );
  // }

  await dbConnect();
  try {
    //always await data fetching from json
    //in request .json() is an instance method while in response it is class method , hence Response.json() is used to return a response while request.json() is used to fetc data from json body
    const { username, email, password } = await request.json();

    // MongoDB se check kar rahe hain ki koi user exists karta hai jiska given username ho aur woh verified (isVerified: true) ho.
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return Response.json(
        {
          success: false,
          message: "Username is already taken",
        },
        {
          status: 400,
        }
      );
    }

    //generate 6 digit verification code
    const existingUserByEmail = await UserModel.findOne({ email });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Handling Existing User by Email
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User already exists with this email",
          },
          { status: 400 }
        );
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(
          Date.now() + 60 * 60 * 1000
        );
        await existingUserByEmail.save();
      }
    } else {
      //Creating a New User
      const hashedPassword = await bcrypt.hash(password, 10);
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }

    //send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    //ApiResponse returned by sendVerificationEmail
    if (!emailResponse.success) {
      return Response.json(
        {
          success: false,
          message: emailResponse.message,
        },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user ", error);
    return Response.json(
      {
        success: false,
        message: "Error registering user",
      },
      {
        status: 500,
      }
    );
  }
}
