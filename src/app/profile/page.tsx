"use client"

import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"


export default function Profile(){
    const router = useRouter()
    const [data,setData] = useState("none")

    const getUserDetails = async () => {
        const res = await axios.post("/api/users/me")
        console.log(res.data);
        setData(res.data._id)
    }

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            toast.success("Logout Success")
            router.push("/login")
        } catch (error:any) {
            console.log(error.message);
            toast.error("Error While Logout")
        }
    }

    // profile fetching logic to be implemented

    return(
        <div className="flex flex-col h-screen w-full items-center justify-center">
            <h1 className="text-white">{data}</h1>

            <button className="p-5 bg-slate-600" onClick={logout}>
                Logout
            </button>
        </div>
    )
}