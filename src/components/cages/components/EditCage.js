import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";

const INITIAL_CAGE_OBJ = {
	Id: "",
	Code: "",
	Name: "",
	Location: "",
	Description: "",
	Capacity: 0
};

function EditCage({ id, fetch }) {
	// const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [cageObj, setCageObj] = useState(INITIAL_CAGE_OBJ);

	useEffect(() => {
		axios.get(`odata/cages/${id}`).then((res) => {
			setCageObj({
				...cageObj,
				...res.data,
			});
		});
	}, [id]);

	const saveNewCage = () => {
		if (cageObj.Code.trim() === "") return setErrorMessage("Code is required!");
		if (cageObj.Name.trim() === "") return setErrorMessage("Name is required!");
		if (cageObj.Location.trim() === "")
			return setErrorMessage("Location is required!");
		if (cageObj.Description.trim() === "")
			return setErrorMessage("Description is required!");
		if (cageObj.Capacity <= 0)
			return setErrorMessage("Capacity must greater than 0!");

		let newCageObj = {
			Code: cageObj.Code,
			Name: cageObj.Name,
			Location: cageObj.Location,
			Description: cageObj.Description,
			Capacity: cageObj.Capacity,
		};
		const data = JSON.stringify(newCageObj);
		axios
			.put(`odata/cages/${cageObj.Id}`, data)
			.then((res) => {
				document.getElementById("btnCloseEditCage").click();
				dispatch(
					showNotification({
						message: "Edit cage successfully",
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
		setCageObj({ ...cageObj, [updateType]: value });
	};

	return (
		<>
			<dialog id="btnEditCage" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Edit cage</h3>
					<div className="form-control w-full mt-4">
						<label className="label">
							<span className="label-text">ID</span>
						</label>
						<input
							value={cageObj.Id}
							className="input input-bordered w-full "
							disabled
						/>

						<label className="label">
							<span className="label-text">Code</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={cageObj.Code}
							onChange={(e) => updateFormValue("Code", e.target.value)}
							className="input input-bordered w-full "
						/>

						<label className="label mt-4">
							<span className="label-text">Name</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={cageObj.Name}
							onChange={(e) => updateFormValue("Name", e.target.value)}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">Location</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={cageObj.Location ? cageObj.Location : ""}
							onChange={(e) => updateFormValue("Fullname", e.target.value)}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">Description</span>
						</label>
						<textarea
							type="text"
							placeholder=""
							value={cageObj.Description ? cageObj.Description : ""}
							onChange={(e) => updateFormValue("Description", e.target.value)}
							className="textarea textarea-bordered h-24"
						/>
						<label className="label mt-4">
							<span className="label-text">Capacity</span>
						</label>
						<input
							type="number"
							placeholder=""
							min="1"
							value={cageObj.Capacity}
							onChange={(e) => updateFormValue("Capacity", e.target.value)}
							className="input input-bordered w-full"
						/>
						<div className="text-err text-lg">{errorMessage}</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseEditCage" className="btn">
								Close
							</button>
						</form>

						<button
							className="btn btn-primary ml-4"
							onClick={(e) => saveNewCage()}
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

export default EditCage;
