import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";

const INITIAL_SPECIES_OBJ = {
	Name: "",
	ScientificName: "",
	LifeSpan: 1,
	Description: "",
	WildDiet: "",
	Habitat: "AFRICAN",
};

const HABITAT = [
	"AFRICAN",
	"ASIAN",
	"OCEANS",
	"EUROPE",
	"ANTARCTIC",
	"AUSTRALIAN",
	"NORTH_AMERICA",
];

function EditTraining({ id, fetch }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [trainingObj, setTrainingObj] = useState(INITIAL_SPECIES_OBJ);

	useEffect(() => {
		axios.get(`odata/training/${id}`).then((res) => {
			setTrainingObj({
				...trainingObj,
				...res.data,
			});
			setErrorMessage("")
		});
	}, [id]);

	const saveNewTraining = () => {
		if (trainingObj.Name.trim() === "")
			return setErrorMessage("Name is required!");
		if (trainingObj.ScientificName.trim() === "")
			return setErrorMessage("ScientificName is required!");
		if (trainingObj.LifeSpan <= 0)
			return setErrorMessage("LifeSpan must greater than 0!");

		let newTrainingObj = {
			Name: trainingObj.Name,
			ScientificName: trainingObj.ScientificName,
			LifeSpan: trainingObj.LifeSpan,
			Description: trainingObj.Description,
			WildDiet: trainingObj.WildDiet,
			Habitat: trainingObj.Habitat,
		};
		const data = JSON.stringify(newTrainingObj);
		setLoading(true);
		axios
			.put(`odata/training/${trainingObj.Id}`, data)
			.then((res) => {
				document.getElementById("btnCloseEditTraining").click();
				dispatch(
					showNotification({
						message: "Edit training successfully",
						status: res.status,
					})
				);
				fetch();
			})
			.catch((err) => {
				return setErrorMessage(err.response.data.value);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setTrainingObj({ ...trainingObj, [updateType]: value });
	};

	return (
		<>
			<dialog id="btnEditTraining" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Edit training</h3>
					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">ID</span>
						</label>
						<input
							value={trainingObj.Id}
							className="input input-bordered w-full "
							disabled
						/>

						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={trainingObj.Name}
							onChange={(e) => updateFormValue("Name", e.target.value)}
							className="input input-bordered w-full "
						/>

						<label className="label mt-4">
							<span className="label-text">ScientificName</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={trainingObj.ScientificName}
							onChange={(e) =>
								updateFormValue("ScientificName", e.target.value)
							}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">LifeSpan</span>
						</label>
						<input
							type="number"
							placeholder=""
							min="1"
							value={trainingObj.LifeSpan}
							onChange={(e) => updateFormValue("LifeSpan", e.target.value)}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">Description</span>
						</label>
						<textarea
							type="text"
							placeholder=""
							value={trainingObj.Description ? trainingObj.Description : ""}
							onChange={(e) => updateFormValue("Description", e.target.value)}
							className="textarea textarea-bordered h-24"
						/>

						<label className="label mt-4">
							<span className="label-text">WildDiet</span>
						</label>
						<textarea
							type="text"
							placeholder=""
							value={trainingObj.WildDiet ? trainingObj.WildDiet : ""}
							onChange={(e) => updateFormValue("WildDiet", e.target.value)}
							className="textarea textarea-bordered h-24"
						/>

						<label className="label mt-4">
							<span className="label-text">Habitat</span>
						</label>
						<select
							type="text"
							placeholder=""
							value={trainingObj.Habitat}
							onChange={(e) => updateFormValue("Habitat", e.target.value)}
							className="select select-bordered"
						>
							{HABITAT.map((l, k) => (
								<option key={k}>{l}</option>
							))}
						</select>

						<div className="text-err text-lg">{errorMessage}</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseEditTraining" className="btn">
								Close
							</button>
						</form>

						<button
							className="btn btn-primary ml-4"
							onClick={(e) => saveNewTraining()}
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

export default EditTraining;
