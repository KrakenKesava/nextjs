import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log("Token received for verification:", token);
        const user =  await  User.findOne({verifyToken: token, verifyTokenExpiry: {$gt: Date.now()}})
        if (!user) {
            return NextResponse.json({message: "Invalid or expired token"}, {status: 400});
        }

        console.log("User found for verification:", user);
        user.isVerfied = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({message: "Email verified successfully"}, {status: 200});

    
    } catch (error: any) {
        console.log("Error in verify email route:", error);
        return NextResponse.json({message: error.message}, {status: 500});
    }
}