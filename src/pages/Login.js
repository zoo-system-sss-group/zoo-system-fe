import React from "react";
import image from "../assets/an-2.jpg";
import axios from "axios";

import { APIPathURL } from "../utils/WebConstants";
import { displayError } from "../utils/MyUtils";
const Login = () => {
  function doLogin(e, form) {
    e.preventDefault();
    console.log(form);
    const formData = new FormData(form);
    const username = formData.get("username");
    const password = formData.get("password");
    const data = {
      username: username,
      password: password,
    };
    axios
      .post(APIPathURL("auth/login"), data)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.data?.errors ?? undefined);
        displayError(form, err.response.data?.errors ?? undefined);
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </a>
            <h2 className="text-4xl font-bold text-center">Sign In</h2>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              className="input input-bordered"
              type="text"
              name="username"
              placeholder="Email Address"
            />
            <label className="label">
              <span className="label-text-alt text-error"></span>
            </label>
          </div>
          <div className="form-control">
            <label className="label">Password</label>
            <input
              className="input input-bordered"
              type="password"
              name="password"
              placeholder="Enter Password"
            />
            <label className="label">
              <span className="label-text-alt text-error"></span>
            </label>
          </div>
          <div className="flex justify-between text-gray-400 py-2">
            <p className="flex items-center">
              <input type="checkbox" />
              Remeber me
            </p>
            <p>Forgot Password</p>
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
