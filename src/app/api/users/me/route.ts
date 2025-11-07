import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";

connect();

export async function GET(request: NextRequest) {
    try {
        const tokenData:any = getDataFromToken(request);
        console.log("Token data in route:", tokenData);
        const user = await User.findOne({ _id: tokenData.id   }).select("-password");
        return NextResponse.json({message: "User Found", data: user}, {status: 200});
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}