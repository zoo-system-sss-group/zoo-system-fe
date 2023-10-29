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

function EditSpecies({ id, fetch }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [speciesObj, setSpeciesObj] = useState(INITIAL_SPECIES_OBJ);

	useEffect(() => {
		axios.get(`odata/species/${id}`).then((res) => {
			setSpeciesObj({
				...speciesObj,
				...res.data,
			});
			setErrorMessage("")
		});
	}, [id]);

	const saveNewSpecies = () => {
		if (speciesObj.Name.trim() === "")
			return setErrorMessage("Name is required!");
		if (speciesObj.ScientificName.trim() === "")
			return setErrorMessage("ScientificName is required!");
		if (speciesObj.LifeSpan <= 0)
			return setErrorMessage("LifeSpan must greater than 0!");

		let newSpeciesObj = {
			Name: speciesObj.Name,
			ScientificName: speciesObj.ScientificName,
			LifeSpan: speciesObj.LifeSpan,
			Description: speciesObj.Description,
			WildDiet: speciesObj.WildDiet,
			Habitat: speciesObj.Habitat,
		};
		const data = JSON.stringify(newSpeciesObj);
		setLoading(true);
		axios
			.put(`odata/species/${speciesObj.Id}`, data)
			.then((res) => {
				document.getElementById("btnCloseEditSpecies").click();
				dispatch(
					showNotification({
						message: "Edit species successfully",
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
		setSpeciesObj({ ...speciesObj, [updateType]: value });
	};

	return (
		<>
			<dialog id="btnEditSpecies" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Edit species</h3>
					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">ID</span>
						</label>
						<input
							value={speciesObj.Id}
							className="input input-bordered w-full "
							disabled
						/>

						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={speciesObj.Name}
							onChange={(e) => updateFormValue("Name", e.target.value)}
							className="input input-bordered w-full "
						/>

						<label className="label mt-4">
							<span className="label-text">ScientificName</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={speciesObj.ScientificName}
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
							value={speciesObj.LifeSpan}
							onChange={(e) => updateFormValue("LifeSpan", e.target.value)}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">Description</span>
						</label>
						<textarea
							type="text"
							placeholder=""
							value={speciesObj.Description ? speciesObj.Description : ""}
							onChange={(e) => updateFormValue("Description", e.target.value)}
							className="textarea textarea-bordered h-24"
						/>

						<label className="label mt-4">
							<span className="label-text">WildDiet</span>
						</label>
						<textarea
							type="text"
							placeholder=""
							value={speciesObj.WildDiet ? speciesObj.WildDiet : ""}
							onChange={(e) => updateFormValue("WildDiet", e.target.value)}
							className="textarea textarea-bordered h-24"
						/>

						<label className="label mt-4">
							<span className="label-text">Habitat</span>
						</label>
						<select
							type="text"
							placeholder=""
							value={speciesObj.Habitat}
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
							<button id="btnCloseEditSpecies" className="btn">
								Close
							</button>
						</form>

						<button
							className="btn btn-primary ml-4"
							onClick={(e) => saveNewSpecies()}
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

export default EditSpecies;
