import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";

const INITIAL_ACCOUNT_OBJ = {
	Id: "",
	Username: "",
	Password: "",
	Role: "",
	Avatar: null,
	Fullname: "",
	Experiences: "",
};

function EditAccount({ id, fetch }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [accountObj, setAccountObj] = useState(INITIAL_ACCOUNT_OBJ);

	useEffect(() => {
		axios.get(`odata/accounts/${id}`).then((res) => {
			setAccountObj({
				...accountObj,
				...res.data,
			});
		});
	}, [id]);

	const saveNewAccount = () => {
		if (accountObj.Username.trim() === "")
			return setErrorMessage("Username is required!");
		if (accountObj.Role.trim() === "")
			return setErrorMessage("Role is required!");
		if (accountObj.Fullname.trim() === "")
			return setErrorMessage("Fullname is required!");
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
			});
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setAccountObj({ ...accountObj, [updateType]: value });
	};

	return (
		<>
			<dialog id="my_modal_1" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Edit account</h3>
					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">ID</span>
						</label>
						<input
							value={accountObj.Id}
							className="input input-bordered w-full "
							disabled
						/>

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
							<span className="label-text">Role</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={accountObj.Role}
							onChange={(e) => updateFormValue("Role", e.target.value)}
							className="input input-bordered w-full"
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
						<div className="text-err text-lg">{errorMessage}</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseEditAccount" className="btn">Close</button>
						</form>

						<button
							className="btn btn-primary ml-4"
							onClick={(e) => saveNewAccount()}
						>
							Save
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
