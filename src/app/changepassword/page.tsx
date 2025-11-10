"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ChangePassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return toast.error("Missing reset token");
    if (!password || password !== confirmPassword) return toast.error("Passwords must match");

    try {
      setLoading(true);
      await axios.post("/api/users/changepassword", { token, password });
      toast.success("Password changed — you can now log in");
      router.push("/login");
    } catch (err: any) {
      console.error("Reset error", err);
      toast.error(err?.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center h-screen py-8">
      <h1>Change Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col max-w-md">
        <input
          className="p-2 border rounded-lg m-2 w-80"
          id="newPassword"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password"
        />
        <input
          className="p-2 border rounded-lg m-2 w-80"
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm password"
        />
        <button className="bg-blue-600 text-white p-2 rounded m-2" disabled={loading}>
          {loading ? "Saving..." : "Change password"}
        </button>
      </form>
    </div>
  );
}