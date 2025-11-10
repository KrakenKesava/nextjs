import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import {NextRequest, NextResponse} from "next/server";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email} = reqBody;
        console.log("Forgot password request for email:", email);
        const user = await User.findOne({email
        });
        if (!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        await sendEmail({email, emailType: "RESET", userId: user._id});

        return NextResponse.json({message: "Password reset email sent"}, {status: 200});
    }
    catch (error: any) {
        console.log("Error in forgot password route:", error);
        return NextResponse.json({message: "Internal Server Error"}, {status: 500});
    }
}