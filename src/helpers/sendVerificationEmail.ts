import sendEmail from "@/lib/nodemailerUtility";
import { render } from "@react-email/render";
import VerificationEmail from "../../emails/VerificationEmail";

const sendVerificationEmail = async (
  email: string,
  username: string,
  otp: string
) => {
  try {
    const subject = "Verify your email";

    // Render the React email template to HTML
    const htmlContent = await render(VerificationEmail({ username, otp }));

    await sendEmail(email, subject, htmlContent);

    return {
      success: true,
      message: "OTP sent successfully",
    };
  } catch (error) {
    console.error("Error sending OTP:", error);

    return {
      success: false,
      message: "Failed to send OTP",
    };
  }
};

export default sendVerificationEmail;
