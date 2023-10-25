import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
// import { addNewAnimal } from "../animalSlice"

const INITIAL_ACCOUNT_OBJ = {
	Username: "",
	Password: "",
	Role: "staff",
	Avatar: null,
	Fullname: "",
	Experiences: "",
};

function AddAnimal({fetch}) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [animalObj, setAnimalObj] = useState(INITIAL_ACCOUNT_OBJ);

	const saveNewAnimal = () => {
		if (animalObj.Username.trim() === "")
			return setErrorMessage("Username is required!");
		if (animalObj.Password.trim() === "")
			return setErrorMessage("Password is required!");

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
			.post("odata/animals", data)
			.then((res) => {
				document.getElementById("btnCloseAddAnimal").click();
				dispatch(
					showNotification({
						message: "New Animal Added!",
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
			<div className="inline-block float-right">
				<button
					className="btn px-6 btn-sm normal-case btn-primary"
					onClick={() => document.getElementById("addAnimal").showModal()}
				>
					Add New
				</button>
				<dialog id="addAnimal" className="modal ">
					<div className="modal-box">
						<h3 className="font-bold text-lg">Add new animal</h3>
						<div className="form-control w-full ">
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
								<span className="label-text">Password</span>
							</label>
							<input
								type="password"
								placeholder=""
								value={animalObj.Password}
								onChange={(e) => updateFormValue("Password", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">Fullname</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={animalObj.Fullname}
								onChange={(e) => updateFormValue("Fullname", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">Experiences</span>
							</label>
							<textarea
								type="text"
								placeholder=""
								value={animalObj.Experiences}
								onChange={(e) => updateFormValue("Experiences", e.target.value)}
								className="textarea textarea-bordered h-24"
							/>
							<div className="text-err text-lg">{errorMessage}</div>
						</div>
						<div className="modal-action">
							<form method="dialog">
								<button id="btnCloseAddAnimal" className="btn">
									Close
								</button>
							</form>

							<button
								className="btn btn-primary ml-4"
								onClick={() => saveNewAnimal()}
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

export default AddAnimal;
