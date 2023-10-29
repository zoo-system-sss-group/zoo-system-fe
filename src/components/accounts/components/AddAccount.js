import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { FirebaseImageUpload } from "../../../FirebaseImageUpload/FirebaseImageUpload";

const ROLE_ACCOUNT = ["Trainer", "Staff"];
const INITIAL_ACCOUNT_OBJ = {
	Username: "",
	Password: "",
	Role: ROLE_ACCOUNT[0],
	Avatar: null,
	Fullname: "",
	Experiences: "",
};

function AddAccount({ fetch }) {
	const dispatch = useDispatch();
	// const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [accountObj, setAccountObj] = useState(INITIAL_ACCOUNT_OBJ);
	const [avatar, setAvatar] = useState(null);
	const [loading, setLoading] = useState(false);

	const saveNewAccount = async () => {
		if (accountObj.Username.trim() === "")
			return setErrorMessage("Username is required!");
		if (accountObj.Password.trim() === "")
			return setErrorMessage("Password is required!");
		if (accountObj.Fullname.trim() === "")
			return setErrorMessage("Fullname is required!");
		setLoading(true);
		if (avatar !== null) {
			try {
				const url = await FirebaseImageUpload({
					folder: "accounts",
					img: avatar,
				});
				accountObj.Avatar = url;
				uploadAccountData();
			} catch (err) {
				var msg = err?.response?.data?.value;
				if (msg === undefined) msg = "Something go wrong!";
				setErrorMessage(msg);
			}
		} else {
			uploadAccountData();
		}
		setLoading(false);
	};

	const uploadAccountData = () => {
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
				console.log(res);
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
			})
			.finally(() => {
				setAccountObj(INITIAL_ACCOUNT_OBJ);
				setAvatar(null);
			});
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setAccountObj({ ...accountObj, [updateType]: value });
	};

	const onImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setAvatar(e.target.files[0]);
		}
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
								<span className="label-text">Role</span>
							</label>
							<select
								type="text"
								placeholder=""
								value={accountObj.Role}
								onChange={(e) => updateFormValue("Role", e.target.value)}
								className="select select-bordered w-full"
							>
								{ROLE_ACCOUNT.map((l, k) => (
									<option key={k} value={l}>
										{l}
									</option>
								))}
							</select>

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

							<label className="label mt-4">
								<span className="label-text">Avatar</span>
							</label>
							<input
								type="file"
								onChange={onImageChange}
								className="file-input file-input-bordered w-full"
								accept="image/png, image/jpg, image/jpeg"
							/>
							<img
								src={avatar ? URL.createObjectURL(avatar) : "../img/user.png"}
								alt="cage"
								className="mt-2 border rounded-lg min-w-full"
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
								Create <span className={loading ? " loading" : ""}></span>
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
