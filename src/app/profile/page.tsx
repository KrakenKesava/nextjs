"use client"
import axios from "axios";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { get } from "http";

export default function ProfilePage() {
    const [data, setData] = React.useState(false);
    const router = useRouter();
    const logout = () => {
        try{
        const response = axios.get("api/users/logout");
        toast.success("logout successfully");
        router.push("/login");
        
        }catch (error: any) {
            console.log("Error during logout:", error);
            
        }
    }

    const getUserDetails = async () => {
        try {
            const response = await axios.get("api/users/me");
            console.log("User details:", response.data);
            setData(response.data.data.username);
        }
        catch (error: any) {
            console.log("Error fetching user details:", error);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen py-2">
            <h1> Profile Page </h1>
            <br />
            <p>User Details: </p>
            <hr />
            <p>{data===false ? "Nothing" : <Link href={`/profile/${data}`}> <button className="bg-green-500 px-3 py-2 rounded-lg mt-4 cursor-pointer"
                onClick={getUserDetails}
                >View Details</button> </Link>} </p>
            <button className="bg-red-500 px-3 py-2 rounded-lg mt-4 cursor-pointer"
                onClick={logout}
                >Logout</button>

            <button className="bg-yellow-500 px-3 py-2 rounded-lg mt-4 cursor-pointer"
                onClick={getUserDetails}
                >Get User Details</button>

            
            
        </div>
        
    )
}