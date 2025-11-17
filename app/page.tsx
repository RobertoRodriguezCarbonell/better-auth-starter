import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
        <div className="flex justify-center items-center h-screen space-x-4">
          <Button variant="outline" className="w-fit">
            <Link href="/login">
              Login
            </Link>
          </Button>
          <Button className="w-fit">
            <Link href="/signup">
              Signup
            </Link>
          </Button>
        </div>
  );
}
