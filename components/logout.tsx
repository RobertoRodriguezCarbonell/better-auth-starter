"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export function Logout() {
    const handleLogout = async () => {
        await authClient.signOut();
        window.location.href = "/";
    }

    return (
        <Button variant="destructive" onClick={handleLogout}>
            Logout <LogOut className="size-4" />
        </Button>
    )
}