// NextAuthOptions:
// Yeh NextAuth ka type definition hai jo aapko authentication options specify karne mein help karta hai. Isse aapko pata chalta hai ki aapke configuration object mein kya properties hone chahiye.

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnet";
import UserModel from "@/model/User";

// Is configuration object ko authOptions ke naam se export kar rahe hain. Iska type NextAuthOptions hai, jo NextAuth ko batata hai ki hum authentication kaise manage karna chahte hain.
export const authOptions: NextAuthOptions = {
  // Authentication providers define karte hain. Yahan hum ek CredentialsProvider use kar rahe hain.

  providers: [
    CredentialsProvider({
      id: "credentials", // Unique identifier for the provider.
      name: "Credentials", // Display name for the provider

      //Specifies the fields users need to provide for authentication. In this case, email and password.
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      //The authorize function is the core of custom authentication. It verifies the credentials provided by the user.
      //you don't need to explicitly use the function keyword here is because authorize is written as an object property with a shorthand method definition

      async authorize(credentials: any): Promise<any> {
        await dbConnect();
        try {
          // Queries the database to find a user whose email or username matches the identifier provided by the user.
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              {
                username: credentials.identifier,
              },
            ],
          });

          //If no user matches the identifier, it stops the process and informs the user.
          if (!user) {
            throw new Error("No user found with this email");
          }

          //Prevents unverified users from logging in by checking the isVerified field.
          if (!user.isVerified) {
            throw new Error("Please verify your account before login");
          }

          // Verifies that the hashed password stored in the database matches the password entered by the user.
          const isPassworCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          // Confirms successful authentication or reports an incorrect password.
          if (isPassworCorrect) {
            return user;
          } else {
            throw new Error("Incorrect Password");
          }
        } catch (err: any) {
          throw new Error(err); // Handles and rethrows errors during the authentication process.
        }
      },
    }),
  ],

  callbacks: {
    //store maximum data in token
    //we can not directly access the properties of our custom user, so redefine the User values in tyes > next-auth.d.ts

    // jwt ke token mein user ki sari details daali hai
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.isAcceptingMessages = user.isAcceptingMessages;
      }
      return token;
    },

    //token mein user ki sab details hai toh vha se leke session mein ek objet banaya user usme pura user data daala jisse session mein bhi pura user data ho
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
  },

  pages: {
    signIn: "/sign-in",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
