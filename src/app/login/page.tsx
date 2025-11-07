"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";



export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("Login success", response.data);
            router.push("/profile");
        }
        catch (error) {
            console.log("Login failed", error);
            toast.error("Login failed. Please try again later.");
        }
        finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className="flex flex-col justify-center items-center h-screen py-2">
            <h1> {!loading ? "Login Page" : "Processing"} </h1>
            <br />

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
                onClick={onLogin}
            >
               {buttonDisabled ? "Fill all the fields" : "Login"}
            </button>
            <hr />
            <br />
            <Link href="/signup" className="text-blue-500">
                Don't have an account? SignUp
            </Link>
        </div>
    )
}