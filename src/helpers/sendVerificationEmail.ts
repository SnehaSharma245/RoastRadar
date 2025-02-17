import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

// Yeh function Promise<ApiResponse> return karta hai, yaani yeh asynchronous response return karega jisme success aur message information hogi.

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: "Anonymous Messages | Verification Code",

      //component ko directly call kiya gaya hai jisme props { username, otp: verifyCode } diye gaye hain. Yeh template ko render karta hai with dynamic data.
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verification email sent successfully" };
  } catch (emailError) {
    console.log("Error sending verification email : ", emailError);
    return { success: false, message: "Failed to send verification email" };
  }
}
