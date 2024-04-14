"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Login() {
    const router = useRouter()

    const onLogin = async () => {
        try {
            const res = await axios.post("/api/users/login",userPayload)
            router.push("/profile")
            
        } catch (error: any) {
            console.log(error);
        }
    }

    const [userPayload, setUserPayload] = useState({
        username: "",
        email: "",
        password: ""
    })
    return (
        <div className="flex flex-col h-screen items-center justify-center">
            <label htmlFor="username" className="text-white">username</label>
            <input
                value={userPayload.username}
                onChange={(e) => setUserPayload({ ...userPayload, username: e.target.value })}
                type="text" />

            <label htmlFor="password" className="text-white">password</label>
            <input
                value={userPayload.password}
                onChange={(e) => setUserPayload({ ...userPayload, password: e.target.value })}
                type="password" />

            <label htmlFor="email" className="text-white">email</label>
            <input
                value={userPayload.email}
                onChange={(e) => setUserPayload({ ...userPayload, email: e.target.value })}
                type="email" />

            <Button onClick={onLogin}>
                Login
            </Button>
            <button className="bg-yellow-600">
                <Link href={"/signup"}>signup</Link>
            </button>
        </div>
    )
}
