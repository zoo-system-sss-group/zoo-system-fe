import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";

const INITIAL_ACCOUNT_OBJ = {
	Username: "",
	Password: "",
	Role: "staff",
	Avatar: null,
	Fullname: "",
	Experiences: "",
};

function AddAccount({fetch}) {
	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [accountObj, setAccountObj] = useState(INITIAL_ACCOUNT_OBJ);

	const saveNewAccount = () => {
		if (accountObj.Username.trim() === "")
			return setErrorMessage("Username is required!");
		if (accountObj.Password.trim() === "")
			return setErrorMessage("Password is required!");

		let newAccountObj = {
			Username: accountObj.Username,
			Password: accountObj.Password,
			Role: accountObj.Role,
			Avatar: accountObj.Avatar,
			Fullname: accountObj.Fullname,
			Experiences: accountObj.Experiences,
		};
		const data = JSON.stringify(newAccountObj);
		axios
			.post("odata/accounts", data)
			.then((res) => {
				document.getElementById("btnCloseAddAccount").click();
				dispatch(
					showNotification({
						message: "New Account Added!",
						status: res.status,
					})
				);
                fetch();
			})
			.catch((err) => {
				return setErrorMessage(err.response.data.value);
			});
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setAccountObj({ ...accountObj, [updateType]: value });
	};

	return (
		<>
			<div className="inline-block float-right">
				<button
					className="btn px-6 btn-sm normal-case btn-primary"
					onClick={() => document.getElementById("addAccount").showModal()}
				>
					Add New
				</button>
				<dialog id="addAccount" className="modal ">
					<div className="modal-box">
						<h3 className="font-bold text-lg">Add new account</h3>
						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text">Username</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={accountObj.Username}
								onChange={(e) => updateFormValue("Username", e.target.value)}
								className="input input-bordered w-full "
							/>

							<label className="label mt-4">
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder=""
								value={accountObj.Password}
								onChange={(e) => updateFormValue("Password", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">Fullname</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={accountObj.Fullname}
								onChange={(e) => updateFormValue("Fullname", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">Experiences</span>
							</label>
							<textarea
								type="text"
								placeholder=""
								value={accountObj.Experiences}
								onChange={(e) => updateFormValue("Experiences", e.target.value)}
								className="textarea textarea-bordered h-24"
							/>
							<div className="text-err text-lg">{errorMessage}</div>
						</div>
						<div className="modal-action">
							<form method="dialog">
								<button id="btnCloseAddAccount" className="btn">
									Close
								</button>
							</form>

							<button
								className="btn btn-primary ml-4"
								onClick={() => saveNewAccount()}
							>
								Create
							</button>
						</div>
					</div>
					<form method="dialog" className="modal-backdrop">
						<button>close</button>
					</form>
				</dialog>
			</div>
		</>
	);
}

export default AddAccount;
