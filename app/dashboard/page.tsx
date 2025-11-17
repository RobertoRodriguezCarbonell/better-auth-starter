import { Logout } from "@/components/logout";
import { SendEmailButton } from "@/components/send-email-button";

export default function Dashboard() {
    

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-2">
            <Logout />
            <SendEmailButton />
        </div>
    )
}