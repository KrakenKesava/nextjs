import {connect} from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { token, password } = reqBody;

        if (!token) {
            return NextResponse.json({ message: "Token is required" }, { status: 400 });
        }
        if (!password) {
            return NextResponse.json({ message: "New password is required" }, { status: 400 });
        }

        console.log("Token received for password reset:", token);

        // find user by forgotPasswordToken and ensure token not expired
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }

        console.log("User found for password reset:", user.email || user._id);

        // hash new password and save
        const hashed = await bcryptjs.hash(password, 10);
        user.password = hashed;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({ message: "Password changed successfully" }, { status: 200 });

    } catch (error: any) {
        console.error("Error in changepassword route:", error?.message ?? error, error?.stack);
        return NextResponse.json({ message: error?.message || "Server error" }, { status: 500 });
    }
}