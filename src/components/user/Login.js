import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";

function Login() {
	const INITIAL_LOGIN_OBJ = {
		password: "",
		emailId: "",
	};
	const ADMIN_LOGIN_INFO = {
		password: "Matkhausieumanh123!",
		emailId: "admin@medkit.com",
	};

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);

	const submitForm = (e) => {
		e.preventDefault();
		setErrorMessage("");

		if (loginObj.emailId.trim() === "")
			return setErrorMessage("Email Id is required!");
		if (loginObj.password.trim() === "")
			return setErrorMessage("Password is required!");
		if (
			loginObj.emailId.trim() !== ADMIN_LOGIN_INFO.emailId ||
			loginObj.password.trim() !== ADMIN_LOGIN_INFO.password
		)
			return setErrorMessage("Email or password wrong!");
		else {
			setLoading(true);
			// Call API to check user credentials and save token in localstorage
			localStorage.setItem("token", "DumyTokenHere");
			setLoading(false);
			window.location.href = "/app/dashboard";
		}
	};

	const updateFormValue = ({ updateType, value }) => {
		setErrorMessage("");
		setLoginObj({ ...loginObj, [updateType]: value });
	};

	return (
		<div className="min-h-screen bg-base-200 flex items-center">
			<div className="card mx-auto w-full max-w-5xl  shadow-xl">
				<div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
					<div className="">
						<LandingIntro />
					</div>
					<div className="py-24 px-10">
						<h2 className="text-2xl font-semibold mb-2 text-center">Login</h2>
						<form onSubmit={(e) => submitForm(e)}>
							<div className="mb-4">
								<InputText
									type="emailId"
									defaultValue={loginObj.emailId}
									updateType="emailId"
									containerStyle="mt-4"
									labelTitle="Email"
									updateFormValue={updateFormValue}
								/>

								<InputText
									defaultValue={loginObj.password}
									type="password"
									updateType="password"
									containerStyle="mt-4"
									labelTitle="Password"
									updateFormValue={updateFormValue}
								/>
							</div>

							<ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
							<button
								type="submit"
								className={
									"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")
								}
							>
								Login
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
