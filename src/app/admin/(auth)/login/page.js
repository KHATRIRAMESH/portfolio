"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    console.log(res);

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("adminToken", data.token);
      router.push("/admin/dashboard/blogs"); // Redirect after login
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-inherit">
      <div className="bg-inherit p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl text-center font-bold mb-4">Admin Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-white">Email</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 bg-black text-white border  rounded mt-1 "
              required
            />
          </div>
          <div className="mb-4 relative">
            <label className="block text-white ">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 pr-10 bg-black text-white border  rounded mt-1"
                required
              />
              {showPassword ? (
                <EyeOffIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer"
                />
              ) : (
                <EyeIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 cursor-pointer"
                />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
