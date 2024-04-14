"use client"
import { useEffect, useState } from "react"
import axios from "axios"
// import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TailSpin } from "react-loader-spinner";
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast";
import { Span } from "next/dist/trace"

export default function Signup() {
    const router = useRouter()
    const { toast } = useToast()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const signUpToast = () => {
        toast({
            title: "SignUp Successfull",
            description: "Please Enter Your Details To Login",
          })
    }
    const errorToast = () => {
        toast({
            variant: "destructive",
            title: "SignUp Unsuccessfull",
            description: "Please Enter Your Details Correctly",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          })
    }

    const onSignUp = async () => {
        try {
            setLoading(true)
            const res = await axios.post("/api/users/signup", user)
            console.log("signup success", res.data);
            router.push("/login")
            signUpToast()
            setLoading(false)
        } catch (error: any) {
            errorToast()
            setLoading(false)
            console.log("signup failed", error);
        }
    }

    useEffect(() => {
        if (user.username.length > 0 && user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    }, [user])

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)


    return (
        <div className="w-full h-screen flex-col flex  justify-center items-center">
            <div className="flex items-center flex-col gap-3 bg-black px-14 py-10 border border-solid border-gray-800">
                <h1 className="text-white text-3xl font-bold"> SignUp </h1>
                <hr />
                <div>
                    <Label className="text-white font-semibold" htmlFor="username">Username</Label>
                    <Input

                        id="username"
                        value={user.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                        placeholder="username"
                        type="text">

                    </Input>
                </div>

                <div>
                    <Label className="text-white font-semibold" htmlFor="email">Email</Label>
                    <Input

                        id="email"
                        value={user.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        placeholder="email"
                        type="email">

                    </Input>
                </div>

                <div>
                    <Label className="text-white font-semibold" htmlFor="password">Password</Label>
                    <Input

                        id="password"
                        value={user.password}
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                        placeholder="password"
                        type="password" >

                    </Input>
                </div>
                <Button onClick={onSignUp}
                    className={buttonDisabled ?
                        "cursor-not-allowed font-bold" : "font-bold"
                    }
                >
                    { loading ? <TailSpin
                        visible={true}
                        height="25"
                        width="25"
                        color="#000000"
                        ariaLabel="tail-spin-loading"
                        radius="1"
                        wrapperStyle={{}}
                        wrapperClass=""
                    /> : buttonDisabled ? <span>Please Fill The Form</span> : <span>Submit</span> }
                </Button>
                <hr />
                <Button variant={"outline"}>
                <Link href={"/login"} className="font-bold">Login</Link>
                </Button>
            </div>
        </div>
    )
}
