import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import { FirebaseImageUpload } from "../../../FirebaseImageUpload/FirebaseImageUpload";

const INITIAL_ANIMAL_OBJ = {
	Id: "",
	Name: "",
	Image: null,
	Description: "",
	Weight: 0,
	Height: 0,
	BirthDate: moment().format("YYYY-MM-DD"),
	SpeciesId: 0,
};

function EditAnimal({ id, fetch }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [animalObj, setAnimalObj] = useState(INITIAL_ANIMAL_OBJ);
	const [speciesObj, setSpeciesObj] = useState([]);
	const [img, setImg] = useState(null);

	useEffect(() => {
		axios
			.get(`odata/species?$filter=isDeleted eq false&$select=Id,Name`)
			.then((res) => {
				let arr = Object.values(res.data.value);
				setSpeciesObj([...arr]);
			});

		axios.get(`odata/animals/${id}`).then((res) => {
			setAnimalObj({
				...INITIAL_ANIMAL_OBJ,
				...res.data,
			});
			setImg(null);
		});
	}, [id]);

	const saveNewAnimal = async () => {
		if (animalObj.Name.trim() === "")
			return setErrorMessage("Name is required!");
		if (animalObj.Description.trim() === "")
			return setErrorMessage("Description is required!");
		if (animalObj.Weight <= 0)
			return setErrorMessage("Weight must greater than 0!");
		if (animalObj.Height !== null && animalObj.Height <= 0)
			return setErrorMessage("Weight must greater than 0!");

		if (animalObj.BirthDate !== null) {
			const dob = moment(animalObj.BirthDate, "YYYY-MM-DD");
			var startDate = moment("01/01/1900", "DD/MM/YYYY");
			var endDate = moment();
			if (dob.isBefore(startDate) || dob.isAfter(endDate)) {
				return setErrorMessage("BirthDate is invalid!");
			}
		} else {
			return setErrorMessage("BirthDate is required!");
		}
		setLoading(true);
		if (img !== null) {
			try {
				const url = await FirebaseImageUpload({ folder: "animals", img: img });
				animalObj.Image = url;
				uploadAnimalData();
			} catch (err) {
				var msg = err?.response?.data?.value;
				if (msg === undefined) msg = "Something went wrong!";
				setErrorMessage(msg);
			}
		} else {
			uploadAnimalData();
		}
		setLoading(false);
	};
	const uploadAnimalData = () => {
		let newAnimalObj = {
			Name: animalObj.Name,
			Image: animalObj.Image,
			Description: animalObj.Description,
			Weight: animalObj.Weight,
			Height: animalObj.Height,
			BirthDate: animalObj.BirthDate,
			SpeciesId: animalObj.SpeciesId,
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

	const onImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setImg(e.target.files[0]);
		}
	};

	return (
		<>
			<dialog id="my_modal_1" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Edit animal</h3>
					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={animalObj.Name}
							onChange={(e) => updateFormValue("Name", e.target.value)}
							className="input input-bordered w-full "
						/>

						<label className="label mt-4">
							<span className="label-text">Description</span>
						</label>
						<textarea
							type="text"
							placeholder=""
							value={animalObj.Description ?? ""}
							onChange={(e) => updateFormValue("Description", e.target.value)}
							className="textarea textarea-bordered h-24"
						/>

						<label className="label mt-4">
							<span className="label-text">Weight</span>
						</label>
						<input
							type="number"
							placeholder=""
							min="1"
							value={animalObj.Weight ?? ""}
							onChange={(e) => updateFormValue("Weight", e.target.value)}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">Height</span>
						</label>
						<input
							type="number"
							placeholder=""
							min="1"
							value={animalObj.Height ?? ""}
							onChange={(e) => updateFormValue("Height", e.target.value)}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">BirthDate</span>
						</label>
						<input
							type="date"
							placeholder=""
							value={moment(animalObj.BirthDate).format("YYYY-MM-DD")}
							onChange={(e) => updateFormValue("BirthDate", e.target.value)}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">Species</span>
						</label>
						<select
							value={animalObj.SpeciesId}
							onChange={(e) => updateFormValue("SpeciesId", e.target.value)}
							className="input input-bordered w-full"
						>
							{speciesObj.length > 0
								? speciesObj.map((l) => (
										<option key={l.Id} value={l.Id}>
											{l.Name}
										</option>
								  ))
								: ""}
						</select>

						<label className="label mt-4">
							<span className="label-text">Image</span>
						</label>
						<input
							type="file"
							onChange={onImageChange}
							className="file-input file-input-bordered w-full"
							accept="image/png, image/jpg, image/jpeg"
						/>
						<img
							src={
								img
									? URL.createObjectURL(img)
									: animalObj.Image ?? "../img/noimage.jpg"
							}
							alt="animal"
							className="mt-2 border rounded-lg aspect-square object-cover"
						/>

						<div className="text-err text-lg">{errorMessage}</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseEditAnimal" className="btn">
								Close
							</button>
						</form>

						<button
							className="btn btn-primary ml-4"
							onClick={(e) => saveNewAnimal()}
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

export default EditAnimal;
