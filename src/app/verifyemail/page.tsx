"use client";
import React, {useState, useEffect, use} from "react";
import axios from "axios";
import { set } from "mongoose";

export default function VerifyEmailPage() {

    const [token, setToken] = React.useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", {token});
            console.log("Email verification response:", response.data);
            setVerified(true);

        } catch (error:any) {
            console.log("Error verifying email:", error);
            setError(true);
        }
    }

    useEffect(() => {
        const urlToken = (window.location.search.split("=")[1]);
        setToken(urlToken || "");
    },[]);


    useEffect(() => {
        if(token.length > 0){
            verifyUserEmail();
        }   
    }, [token]);


    return (
        <div className="flex flex-col justify-center items-center h-screen py-2">
            <h1> Verify Email Page </h1>
            <br />
            <p>Your email has been verified successfully. You can now login to your account.</p>
            {verified && <p className="text-green-500">Email verified successfully!</p>}
            {error && <p className="text-red-500">Error verifying email. Please try again.</p>}
            <h2 className="text-back-600 bg-teal-700  p-2">{token ? `${token}` : "no token"}</h2>
        </div>
    )

}