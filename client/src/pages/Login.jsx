import React from "react";

const Login = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-screen items-center justify-center">
      <div className="lg:border-2 lg:rounded-xl lg:border-black lg:p-20">
        <form className="flex flex-col items-center justify-center">
          <input
            required
            className="outline-none bg-transparent border-2 border-black font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400"
            type="email"
            placeholder="Enter your email"
          />
          <input
            required
            className="outline-none bg-transparent border-2 border-black font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400"
            type="password"
            placeholder="Enter password"
          />
          <button className="mt-7 text-white border-none outline-none bg-black hover:bg-black font-semibold text-lg py-2 px-8 w-full rounded-full transition-all">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
