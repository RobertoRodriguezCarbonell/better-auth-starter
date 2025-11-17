import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/drizzle";
import { schema, user } from "@/db/schema";
import { nextCookies } from "better-auth/next-js";
import VerifyEmail from "@/components/emails/verify-email";
import { Resend } from "resend";
import ForgotPasswordEmail from "@/components/emails/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            resend.emails.send({
                from: `${process.env.NEXT_PUBLIC_APP_NAME} <noreply@${process.env.NEXT_PUBLIC_APP_DOMAIN}>`,
                to: user.email,
                subject: "Verify your email address",
                react: VerifyEmail({
                    username: user.name,
                    verifyUrl: url,
                }),
            })
        },
        sendOnSignUp: true,
        expiresIn: 3600 // 1 hour
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url }) => {
            resend.emails.send({
                from: `${process.env.NEXT_PUBLIC_APP_NAME} <noreply@${process.env.NEXT_PUBLIC_APP_DOMAIN}>`,
                to: user.email,
                subject: "Reset your password",
                react: ForgotPasswordEmail({
                    username: user.name,
                    resetUrl: url,
                    userEmail: user.email
                }),
            })
        },
    },
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    plugins: [nextCookies()]
})