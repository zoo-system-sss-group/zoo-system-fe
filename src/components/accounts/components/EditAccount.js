import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";
import { FirebaseImageUpload } from "../../../FirebaseImageUpload/FirebaseImageUpload";
import { roleAdmin } from "../../../routes/author";

const ROLE_ACCOUNT = ["Trainer", "Staff"];
const INITIAL_ACCOUNT_OBJ = {
	Id: "",
	Username: "",
	Password: "",
	Role: ROLE_ACCOUNT[0],
	Avatar: null,
	Fullname: "",
	Experiences: "",
};

function EditAccount({ id, fetch }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [accountObj, setAccountObj] = useState(INITIAL_ACCOUNT_OBJ);
	const [avatar, setAvatar] = useState(null);
	const [password, setPassword] = useState("");

	useEffect(() => {
		axios.get(`odata/accounts/${id}`).then((res) => {
			setAccountObj({
				...accountObj,
				...res.data,
			});
			setAvatar(null);
		});
	}, [id]);

	const saveNewAccount = async () => {
		if (accountObj.Username.trim() === "")
			return setErrorMessage("Username is required!");
		if (accountObj.Role.trim() === "")
			return setErrorMessage("Role is required!");
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
				if (msg === undefined) msg = "Something went wrong!";
				setErrorMessage(msg);
			}
		} else {
			uploadAccountData();
		}
	};

	const uploadAccountData = () => {
		let newAccountObj = {
			Username: accountObj.Username,
			Role: accountObj.Role,
			Avatar: accountObj.Avatar,
			Fullname: accountObj.Fullname,
			Experiences: accountObj.Experiences,
		};
		if (password.length > 0) {
			newAccountObj = { ...newAccountObj, Password: password };
		}
		const data = JSON.stringify(newAccountObj);
		axios
			.put(`odata/accounts/${accountObj.Id}`, data)
			.then((res) => {
				document.getElementById("btnCloseEditAccount").click();
				dispatch(
					showNotification({
						message: "Edit account successfully",
						status: res.status,
					})
				);
				fetch();
			})
			.catch((err) => {
				return setErrorMessage(err.response.data.value);
			})
			.finally(() => {
				setPassword("");
				setErrorMessage("");
				setLoading(false);
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
			<dialog id="btnEditAccount" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Edit account</h3>
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
							<span className="label-text">Fullname</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={accountObj.Fullname ? accountObj.Fullname : ""}
							onChange={(e) => updateFormValue("Fullname", e.target.value)}
							className="input input-bordered w-full"
						/>
						{!roleAdmin.includes(accountObj.Role) && (
							<>
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
							</>
						)}

						<label className="label mt-4">
							<span className="label-text">Experiences</span>
						</label>
						<textarea
							type="text"
							placeholder=""
							value={accountObj.Experiences ? accountObj.Experiences : ""}
							onChange={(e) => updateFormValue("Experiences", e.target.value)}
							className="textarea textarea-bordered h-24"
						/>

						<label className="label mt-4">
							<span className="label-text">
								Password{" "}
								<span className="text-err">
									(Leave it blank if no changes are needed)
								</span>
							</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="input input-bordered w-full"
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
							src={
								avatar
									? URL.createObjectURL(avatar)
									: accountObj.Avatar
									? accountObj.Avatar
									: "../img/user.png"
							}
							alt="cage"
							className="mt-2 border rounded-lg aspect-square object-cover"
						/>

						<div className="text-err text-lg">{errorMessage}</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseEditAccount" className="btn">
								Close
							</button>
						</form>

						<button
							className="btn btn-primary ml-4"
							onClick={(e) => saveNewAccount()}
						>
							Save <span className={loading ? " loading" : ""}></span>
						</button>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default EditAccount;
