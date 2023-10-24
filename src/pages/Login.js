import React, { useState } from "react";
import image from "../assets/an-2.jpg";
import axios from "axios";

import { APIPathURL } from "../utils/WebConstants";
import { clearError } from "../utils/MyUtils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  function doLogin(e, form) {
    e.preventDefault();
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");
    const data = {
      username: username,
      password: password,
    };
    // clearError(form);
    axios
      .post(APIPathURL("auth/login"), data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response?.data?.errors ?? undefined);
        setErrors(err.response?.data?.errors ?? undefined);
        console.log();
        var errorMessage = err.response?.data.errorMessage;
        setErrorMessage(errorMessage);
      });
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full bg-cor5">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={image} alt="" />
      </div>
      <div className="flex flex-col justify-center">
        <form
          className="max-w-[400px] w-full mx-auto bg-cor1 p-9 px-8 rounded-lg"
          onSubmit={(e) => doLogin(e, e.target)}
        >
          <div className="relative">
            <a
              href="/"
              className="rounded-md inline-flex items-center justify-center absolute"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </a>
            <h2 className="text-4xl font-bold text-center">Sign In</h2>
          </div>
          {/* username */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Username</span>
            </label>
            <input
              className="input input-bordered"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email Address"
            />
            <label className="label">
              <span className="label-text-alt text-red-500">
                {errors && errors.UserName}
              </span>
            </label>
          </div>
          {/* password */}
          <div className="form-control ">
            <label className="label">Password</label>
            <input
              className="input input-bordered"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
            <label className="label">
              <span className="label-text-alt text-red-500">
                {errors && errors.Password}
              </span>
            </label>
          </div>
          <div className={!errorMessage && "hidden"}>
            <label className="label">
              <span className="label-text-alt text-red-500 ">
                {errorMessage}
              </span>
            </label>
          </div>
          <div className="form-control">
            <label className="label cursor-pointer justify-start">
              <input type="checkbox" className="checkbox mr-3 bg-cor2" />
              <span className="label-text">Remember me</span>
            </label>
          </div>
          <button
            className="w-full my-5 py-2 btn btn-accent text-white font-semibold rounded-lg"
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
