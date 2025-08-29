import { Resend } from "resend";
import VerificationEmail from "@/components/emails/VerificationsEmail";


const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  email: string,
  username: string,
  verifyCode: string,
  type: string
) => {
  try {
    await resend.emails.send({
      from: "nextpractice@ak-diagnostic.in",
      to: email,
      subject: type === "VERIFY" ? "Verify your email" : "Reset your password",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return {
        success: true,
        message: "Verification email sent successfully",
      }

  } catch (error) {
    console.error("Error sending verification email", error);
    return {
        success: false,
        message: "Failed to send verification email",
      }
  }
};

