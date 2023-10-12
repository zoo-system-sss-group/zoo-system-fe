import React from "react";
import image from "../assets/an-2.jpg";
const Login = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={image} alt="" />
      </div>
      <div className="flex flex-col justify-center">
        <form className="max-w-[400px] w-full mx-auto bg-cor1 p-9 px-8 rounded-lg">
          <div className="relative">
            <a
              href="/"
              class="rounded-md inline-flex items-center justify-center absolute"
            >
              <svg
                class="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </a>
            <h2 className="text-4xl font-bold text-center">Sign In</h2>
          </div>
          <div className="flex flex-col py-2">
            <label>Email</label>
            <input
              className="rounded-lg mt-2 p-2"
              type="text"
              placeholder="Email Address"
            />
          </div>
          <div className="flex flex-col py-2">
            <label>Password</label>
            <input
              className="rounded-lg mt-2 p-2"
              type="password"
              placeholder="Enter Password"
            />
          </div>
          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input type="checkbox" />
              Remeber me
            </p>
            <p>Forgot Password</p>
          </div>
          <button
            class="w-full my-5 py-2 btn btn-accent text-white font-semibold rounded-lg"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
