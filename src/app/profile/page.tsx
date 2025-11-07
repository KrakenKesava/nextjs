"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
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
    return (
        <div className="flex flex-col justify-center items-center h-screen py-2">
            <h1> Profile Page </h1>
            <button className="bg-red-500 px-3 py-2 rounded-lg mt-4 cursor-pointer"
                onClick={logout}
                >Logout</button>
        </div>
        
    )
}