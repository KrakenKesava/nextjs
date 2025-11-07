import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
    try  {
        const token = request.cookies.get("token")?.value || '';
        if (!token) {
            return null;
        }
        const secretKey = process.env.TOKEN_SECRET;
        if (!secretKey) {
            console.error("JWT_SECRET is not defined in environment variables.");
            return null;
        }
        const decoded = jwt.verify(token, secretKey);
        console.log("Decoded token data:", decoded);
        return decoded;
    }
    catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }   
}