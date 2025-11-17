"use client"

import { toast } from "sonner";
import { Button } from "./ui/button";

export function SendEmailButton() {
    const sendEmail = async () => {
        try {
            const response = await fetch('/api/send', {
                method: 'POST',
            });

            const result = await response.json();

            if (response.ok) {
                toast.success('Email sent successfully!');
            } else {
                toast.error('Failed to send email: ' + JSON.stringify(result.error));
            }
        } catch (error) {
            toast.error('Error sending email');
            console.error(error);
        }
    };

    return (
        <Button
            variant="default"
            onClick={sendEmail}
        >
            Send Test Email
        </Button>
    )
}