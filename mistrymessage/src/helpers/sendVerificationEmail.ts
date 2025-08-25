import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationsEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verifyCode: string
): Promise<ApiResponse<void>>{
    

    try {

        await resend.emails.send({
            from: 'mistry-message@ak-diagnostic.in',
            to: email,
            subject: 'Mistry Message | Verification Code',
            react: VerificationEmail({username, otp: verifyCode}),
          });

        return {
            success: true,
            message: "Verification email sent successfully"
        }
    } catch (emailError) {
        console.error("Error sending verification email", emailError);
        return {
            success: false,
            message: "Failed to send verification email"
        }
    }
}