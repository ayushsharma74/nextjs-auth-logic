"use client"

export default function page({params}: any){
    return(
        <div className="flex flex-col h-screen w-full items-center justify-center">
            <h1 className="text-white">profile page</h1>
            <h2 className="text-white">{params.id}</h2>
        </div>
    )
}