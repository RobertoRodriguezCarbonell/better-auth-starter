import { EmailTemplate } from '@/components/emails/email-template';
import { Resend } from 'resend';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session || !session.user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = session.user;

        const { data, error } = await resend.emails.send({
            from: `${process.env.NEXT_PUBLIC_APP_NAME} <noreply@${process.env.NEXT_PUBLIC_APP_DOMAIN}>`,
            to: user.email,
            subject: 'Test Email from Resend',
            react: EmailTemplate({
                username: user.name,
            }),
        });

        if (error) {
            console.error("Resend Error:", error);
            return Response.json({ error: error.message || "Failed to send email" }, { status: 500 });
        }

        console.log('Email sent successfully to:', user.email);
        console.log('Nombre de usuario:', user.name);
        return Response.json(data);

    } catch (error) {
        console.error('Unexpected error:', error);
        return Response.json({ 
            error: error instanceof Error ? error.message : 'Unknown error occurred' 
        }, { status: 500 });
    }
}