const Register = () => {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] w-screen items-center justify-center py-10">
      <div className="lg:border-2 lg:rounded-xl lg:border-black lg:p-20">
        <form className="flex flex-col items-center justify-center">
          <input
            required
            className="outline-none bg-transparent border-2 border-black font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400"
            type="text"
            placeholder="Full Name"
          />
          <input
            required
            className="outline-none bg-transparent border-2 border-black font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400"
            type="text"
            placeholder="Student ID (e.g. 21-XXXXX-X)"
          />
          <input
            required
            className="outline-none bg-transparent border-2 border-black font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400"
            type="text"
            placeholder="Department (e.g. CSE)"
          />
          <input
            required
            className="outline-none bg-transparent border-2 border-black font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400"
            type="email"
            placeholder="Enter your email"
          />
          <input
            required
            className="outline-none bg-transparent border-2 border-black font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400"
            type="password"
            placeholder="Create password"
          />
          <button className="mt-7 text-white border-none outline-none bg-black hover:bg-black font-semibold text-lg py-2 px-8 w-full rounded-full transition-all">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;