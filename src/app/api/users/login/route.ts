import { connectDB } from "@/db/dbConfig";
import User from "@/models/user.model";
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email,username,password} = reqBody

        console.log(reqBody);

        const user =  await User.findOne({email})

        if (!user) {
            return NextResponse.json({error: "user does not exist"},{status: 404})
        }

        console.log("user exists");
        const isValidPassword = await bcryptjs.compare(password,user.password)
        if (!isValidPassword) {
            return NextResponse.json({error: "check your credentials"},{status: 300})
        }

        const tokenPayload = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenPayload,process.env.TOKEN_SECRET!,{expiresIn: '1d'})

        const res = NextResponse.json(
            {
                message: "Login Success",
                success: true
            }
        )
        res.cookies.set("token",token,{
            httpOnly: true
        })

        return res
        
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 500})
    }
}