"use client"
import axios from "axios";
import { useState } from "react";

export default function Login() {

    const onLogin = async () => {
        try {
            const res = await axios.post("/api/users/login",userPayload)
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

            <button onClick={onLogin} className="bg-white">
                login
            </button>
        </div>
    )
}
