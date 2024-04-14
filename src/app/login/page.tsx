"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TailSpin } from "react-loader-spinner";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast";


export default function Login() {
    const router = useRouter()
    const { toast } = useToast()

    const loginToast = () => {
        toast({
            title: "Login Successfull",
            description: "Welcome To Your Profile",
          })
    }

    const errorToast = () => {
        toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "Please check your credentials !!",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
    }

    const onLogin = async () => {
        try {
            setLoading(true)
            const res = await axios.post("/api/users/login", userPayload)
            router.push("/profile")
            setLoading(false)
            loginToast()

        } catch (error: any) {
            setLoading(false)
            errorToast()
            console.log(error);
        }
    }

    const [userPayload, setUserPayload] = useState({
        username: "",
        email: "",
        password: ""
    })

    const [loading,setLoading] = useState(false)

    return (
        <div className="flex flex-col h-screen items-center justify-center ">
            <div className="bg-black py-10 px-12 flex gap-3 flex-col items-center border border-solid border-gray-900">
                <h1 className="font-bold text-4xl">Login</h1>
                <div>
                    <Label htmlFor="username" className="font-semibold">Username</Label>
                    <Input
                        value={userPayload.username}
                        onChange={(e) => setUserPayload({ ...userPayload, username: e.target.value })}
                        type="text"
                        placeholder="Username"
                    >

                    </Input>
                </div>
                <div>
                    <Label htmlFor="email" className="font-semibold">Email</Label>
                    <Input
                        value={userPayload.email}
                        onChange={(e) => setUserPayload({ ...userPayload, email: e.target.value })}
                        type="email"
                        placeholder="Email"
                    >
                    </Input>
                </div>
                <div>
                    <Label htmlFor="password" className="font-semibold">Password</Label>
                    <Input
                        value={userPayload.password}
                        onChange={(e) => setUserPayload({ ...userPayload, password: e.target.value })}
                        type="password"
                        placeholder="Password">
                    </Input>
                </div>

                <Button onClick={onLogin} className="mt-5">
                    {loading ? <TailSpin
                        visible={true}
                        height="25"
                        width="25"
                        color="#000000"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    /> : <span className="font-bold"> Sign In </span>}
                </Button>
                <Button>
                    <Link href={"/signup"} className="font-bold">Sign Up</Link>
                </Button>

            </div>
        </div>
    )
}
