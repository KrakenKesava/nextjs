import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import {NextRequest, NextResponse} from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email , password} = reqBody;
        console.log(reqBody);

        const user = await User.findOne({email})
            if (!user) {
                return NextResponse.json({error: "Invalid User credentials"}, {status: 400});
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return NextResponse.json({error: "Invalid Password credentials"}, {status: 400});
            }
        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email

        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'});
        const response = NextResponse.json({
            message: "Login successful"
        }, {status: 200});
        response.cookies.set("token", token, {
            httpOnly: true, 
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day
        });   
           return response;    
        
    }
    catch (error: any) {
        return NextResponse.json({error: "InternalServer Error"}, {status: 500});
    }
}
