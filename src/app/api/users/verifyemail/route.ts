import { connectDB } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest , NextResponse } from "next/server";

connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token} = reqBody
        console.log("Verify Token In Verify Email Route Received");
        console.log("Token:"+token);

        const user = await User.findOne({verifyToken: token,verifyTokenExpiry: {$gt: Date.now()}})

        console.log(user);
        if (!user) {
            return NextResponse.json({error: "user not found"},{status: 400})
        }
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()
        
        return NextResponse.json({message: "email verified",success: true},{status: 500})

    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}