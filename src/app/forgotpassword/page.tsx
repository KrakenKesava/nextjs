"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const onResetPassword = async () => {
        if (!email) return toast.error("Please enter an email");
        try {
            setLoading(true);
            await axios.post("/api/users/forgotpassword", { email });
            toast.success("Reset password link sent to your email (if it exists)");
            setEmail("");
        } catch (error: any) {
            console.error("Error sending reset password link", error);
            toast.error(error?.response?.data?.message || "Error sending reset password link");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen py-2">
            <h1>{!loading ? "Forgot Password Page" : "Loading..."} </h1>
            <label htmlFor="email">Enter your email to reset password:</label>
            <input
                className="p-2 border rounded-lg m-2 w-80"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="email"
            />
            <button
                onClick={onResetPassword}
                disabled={!email || loading}
                className="bg-blue-500 px-3 py-2 rounded-lg mt-4 cursor-pointer"
            >
                {loading ? "Sending..." : "Send Reset Link"}
            </button>
        </div>
    );
}