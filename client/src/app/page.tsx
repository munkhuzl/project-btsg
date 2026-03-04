'use client';

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Page=() =>{
    const router = useRouter();
    return <main className="py-16 flex justify-center items-center container mx-auto">
        <Button onClick={() => router.push("/createNewRequest")} className="text-sm">Чөлөөний хүсэлт илгээх</Button>
    </main>
}
export default Page;