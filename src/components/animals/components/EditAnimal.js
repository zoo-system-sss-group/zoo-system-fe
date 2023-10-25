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

function EditAnimal({ id, fetch }) {
	// const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [animalObj, setAnimalObj] = useState(INITIAL_ACCOUNT_OBJ);

	useEffect(() => {
		axios.get(`odata/animals/${id}`).then((res) => {
			setAnimalObj({
				...animalObj,
				...res.data,
			});
		});
	}, [id]);

	const saveNewAnimal = () => {
		if (animalObj.Username.trim() === "")
			return setErrorMessage("Username is required!");
		if (animalObj.Role.trim() === "")
			return setErrorMessage("Role is required!");
		if (animalObj.Fullname.trim() === "")
			return setErrorMessage("Fullname is required!");
		let newAnimalObj = {
			Username: animalObj.Username,
			Password: animalObj.Password,
			Role: animalObj.Role,
			Avatar: animalObj.Avatar,
			Fullname: animalObj.Fullname,
			Experiences: animalObj.Experiences,
		};
		const data = JSON.stringify(newAnimalObj);
		axios
			.put(`odata/animals/${animalObj.Id}`, data)
			.then((res) => {
				document.getElementById("btnCloseEditAnimal").click();
				dispatch(
					showNotification({
						message: "Edit animal successfully",
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
		setAnimalObj({ ...animalObj, [updateType]: value });
	};

	return (
		<>
			<dialog id="my_modal_1" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Edit animal</h3>
					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">ID</span>
						</label>
						<input
							value={animalObj.Id}
							className="input input-bordered w-full "
							disabled
						/>

						<label className="label">
							<span className="label-text">Username</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={animalObj.Username}
							onChange={(e) => updateFormValue("Username", e.target.value)}
							className="input input-bordered w-full "
						/>

						<label className="label mt-4">
							<span className="label-text">Role</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={animalObj.Role}
							onChange={(e) => updateFormValue("Role", e.target.value)}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">Fullname</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={animalObj.Fullname ? animalObj.Fullname : ""}
							onChange={(e) => updateFormValue("Fullname", e.target.value)}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">Experiences</span>
						</label>
						<textarea
							type="text"
							placeholder=""
							value={animalObj.Experiences ? animalObj.Experiences : ""}
							onChange={(e) => updateFormValue("Experiences", e.target.value)}
							className="textarea textarea-bordered h-24"
						/>
						<div className="text-err text-lg">{errorMessage}</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseEditAnimal" className="btn">Close</button>
						</form>

						<button
							className="btn btn-primary ml-4"
							onClick={(e) => saveNewAnimal()}
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

export default EditAnimal;
