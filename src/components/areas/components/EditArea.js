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

function EditArea({ id, fetch }) {
	// const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [areaObj, setAreaObj] = useState(INITIAL_ACCOUNT_OBJ);

	useEffect(() => {
		axios.get(`odata/areas/${id}`).then((res) => {
			setAreaObj({
				...areaObj,
				...res.data,
			});
		});
	}, [id]);

	const saveNewArea = () => {
		if (areaObj.Username.trim() === "")
			return setErrorMessage("Username is required!");
		if (areaObj.Role.trim() === "")
			return setErrorMessage("Role is required!");
		if (areaObj.Fullname.trim() === "")
			return setErrorMessage("Fullname is required!");
		let newAreaObj = {
			Username: areaObj.Username,
			Password: areaObj.Password,
			Role: areaObj.Role,
			Avatar: areaObj.Avatar,
			Fullname: areaObj.Fullname,
			Experiences: areaObj.Experiences,
		};
		const data = JSON.stringify(newAreaObj);
		axios
			.put(`odata/areas/${areaObj.Id}`, data)
			.then((res) => {
				document.getElementById("btnCloseEditArea").click();
				dispatch(
					showNotification({
						message: "Edit area successfully",
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
		setAreaObj({ ...areaObj, [updateType]: value });
	};

	return (
		<>
			<dialog id="my_modal_1" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Edit area</h3>
					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">ID</span>
						</label>
						<input
							value={areaObj.Id}
							className="input input-bordered w-full "
							disabled
						/>

						<label className="label">
							<span className="label-text">Username</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={areaObj.Username}
							onChange={(e) => updateFormValue("Username", e.target.value)}
							className="input input-bordered w-full "
						/>

						<label className="label mt-4">
							<span className="label-text">Role</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={areaObj.Role}
							onChange={(e) => updateFormValue("Role", e.target.value)}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">Fullname</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={areaObj.Fullname ? areaObj.Fullname : ""}
							onChange={(e) => updateFormValue("Fullname", e.target.value)}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">Experiences</span>
						</label>
						<textarea
							type="text"
							placeholder=""
							value={areaObj.Experiences ? areaObj.Experiences : ""}
							onChange={(e) => updateFormValue("Experiences", e.target.value)}
							className="textarea textarea-bordered h-24"
						/>
						<div className="text-err text-lg">{errorMessage}</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseEditArea" className="btn">Close</button>
						</form>

						<button
							className="btn btn-primary ml-4"
							onClick={(e) => saveNewArea()}
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

export default EditArea;
