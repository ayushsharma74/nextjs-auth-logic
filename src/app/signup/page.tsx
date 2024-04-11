"use client"
import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Signup() {
    const router = useRouter()
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: ""
    })

    const onSignUp = async () => {
        try {
            const res = await axios.post("/api/users/signup", user)
            console.log("signup success", res.data);
            router.push("/login")
        } catch (error: any) {
            console.log("signup failed", error);
            toast.error(error.message)
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
            <h1 className="text-white">{loading ? "Processing..." : "SignUp"}</h1>
            <hr />
            <label className="text-white" htmlFor="username">username</label>
            <input

                id="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
                placeholder="username"
                type="text" />

            <label className="text-white" htmlFor="email">email</label>
            <input

                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="email"
                type="email" />

            <label className="text-white" htmlFor="password">password</label>
            <input

                id="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
                type="password" />

            <button onClick={onSignUp}
                className="bg-white"
            >
                {buttonDisabled ? "fill the form" : "Submit"}
            </button>
            <Link href={"/login"}></Link>
        </div>
    )
}
