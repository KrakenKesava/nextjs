"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";



export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        }

        catch (error: any) {
            console.log("Signup failed", error.message);
            toast.error("Signup failed. Please try again later." , error.message);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])


    return (
        <div className="flex flex-col justify-center items-center h-screen py-2">
            <h1> {loading ? "Processing" : "Signup"} </h1>
            <br />
            
            <label htmlFor="username">username:</label>
            <input
                className="p-2 border rounded-lg m-2 w-80"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user,username: e.target.value})}
                placeholder="username"
            />
            <label htmlFor="email">Email:</label>
            <input
                className="p-2 border rounded-lg m-2 w-80"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user,email: e.target.value})}
                placeholder="email"
            />
            <label htmlFor="password">Password:</label>
            <input
                className="p-2 border rounded-lg m-2 w-80"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user,password: e.target.value})}
                placeholder="password"
            />
            <button
                className="bg-blue-500 text-white p-2 rounded-lg m-2 w-80"
                onClick={onSignup}
            >
                {buttonDisabled ? "Fill all the details" : "Signup"}
            </button>
            <hr />
            <br />
            <Link href="/login" className="text-blue-500">
                Already have an account? Login
            </Link>
        </div>
    )
}