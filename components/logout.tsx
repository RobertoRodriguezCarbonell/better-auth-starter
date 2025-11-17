"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "./ui/button";
import { LogOut, LogOutIcon } from "lucide-react";

export function Logout() {
    const handleLogout = async () => {
        await authClient.signOut();
        window.location.href = "/";
    }

    return (
        <div className="w-full" onClick={handleLogout}>
            <LogOutIcon className="inline mr-2 h-4 w-4" />
            Logout
        </div>
    )
}