import React, { useState } from "react";
import image from "../assets/at-4.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import checkAuth from "../app/auth";
const Login = () => {
	const INITIAL_LOGIN_OBJ = {
		userName: "",
		password: "",
	};
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

	const updateFormValue = (updateType, e) => {
		const value = e.target.value;
		setErrorMessage("");
		setLoginObj({ ...loginObj, [updateType]: value });
	};

	const submitForm = (e) => {
		e.preventDefault();
		setErrorMessage("");
		if (loginObj.userName.trim() === "")
			return setErrorMessage("Username is required!");
		if (loginObj.password.trim() === "")
			return setErrorMessage("Password is required!");

		setLoading(true);
		// Call API to check user credentials and save token in localstorage

		let dataLogin = JSON.stringify(loginObj);
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};

		let token = null;
		axios
			.post("api/auth/login", dataLogin, config)
			.then((res) => {
				if (res.status === 200) {
					token = res.data.value;
					localStorage.setItem("token", token);
					checkAuth();
					axios.get("api/auth/current-user").then((res) => {
						const user = res.data.value;
						localStorage.setItem("loginInfo", JSON.stringify(user));
						if (user.role === "Trainer")
							window.location.href = "/management/myTraining";
						else window.location.href = "/management/dashboard";
					});
				} else {
					return navigate("/login");
				}
			})
			.catch((err) => {
				var msg = err.response?.data?.errorMessage;
				if (msg === undefined) msg = err.message;
				setErrorMessage(msg);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<div className="grid grid-cols-1 gap-2  sm:grid-cols-2 min-h-screen w-full bg-cor5">
			<div className="hidden sm:block">
				<img className="w-full h-full object-cover" src={image} alt="" />
			</div>
			<div className="flex flex-col justify-center">
				<form
					className="max-w-[400px] w-full mx-auto bg-cor1 p-9 px-8 rounded-lg"
					onSubmit={submitForm}
				>
					<div className="relative">
						<Link
							to="/"
							className="rounded-md inline-flex items-center justify-center absolute"
						>
							<ArrowUturnLeftIcon className="h-6 w-6 inline-block font-extrabold stroke-2" />
						</Link>
						<h2 className="text-4xl font-bold text-center">Sign In</h2>
					</div>
					<div className="flex flex-col py-2 mr-2">
						<label>Username</label>
						<input
							className="rounded-lg mt-2 p-2"
							type="text"
							value={loginObj.userName}
							placeholder="username"
							onChange={(e) => updateFormValue("userName", e)}
						/>
					</div>
					<div className="flex flex-col py-2">
						<label>Password</label>
						<input
							className="rounded-lg mt-2 p-2"
							type="password"
							value={loginObj.password}
							placeholder="Enter Password"
							onChange={(e) => updateFormValue("password", e)}
						/>
					</div>
					<div className="text-red-500">{errorMessage}</div>
					<button
						className={
							"w-full my-5 py-2 btn btn-accent text-white font-semibold rounded-lg "
						}
					>
						Sign In <span className={loading ? " loading" : ""}></span>
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
