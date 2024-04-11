"use client"

import axios from "axios"
// import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Link from "next/link"

export default function VerifyEmail() {
    // const router = useRouter()
    const [token,setToken] = useState("")
    const [verified,setVerified] = useState(false)
    const [error,setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail",{token})
            setVerified(true)
        } catch (error:any) {
            setError(true)
            console.log(error);
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1]
        setToken(urlToken || "")

        // const {query} = router
        // const urlToken = query.token
        // setToken(urlToken)
    },[])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
    },[token])

    return(
        <div className="flex justify-center items-center flex-col">
            <h1 className="text-white">verify email</h1>
            <h2 className="text-orange-800">
                {token ? `${token}` : "token is not received"}
            </h2>
            {verified && (
                <div className="bg-yellow-500 p-5">
                    <h2 className="text-white">Verified</h2>
                <Link href={"/login"} >Login Page</Link>
                </div>
            )}
            {error && (
                <h1 className="text-white">Error</h1>
            )}
        </div>
    )
}
