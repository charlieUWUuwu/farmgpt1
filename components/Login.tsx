'use client'
import { signIn } from "next-auth/react";

function Login() {
  return (
    <div className="flex flex-col h-screen  text-center items-center justify-center space-y-2">
      <h1 className="text-5xl">農業進化，淨零未來</h1>
      <div className="">登入使用FarmGPT</div>
      <button
        onClick={() => signIn("google")}
        className="w-1/6 h-10 text-black align-middle rounded-full animate-pulse bg-gradient-to-r from-[#DCFC34] to-[#10E5B2]"
      >
        login
      </button>
    </div>
  );
}

export default Login;
