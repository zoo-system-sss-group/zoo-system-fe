import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import moment from "moment/moment";
import { FirebaseImageUpload } from "../../../FirebaseImageUpload/FirebaseImageUpload";
// import { addNewAnimal } from "../animalSlice"

const INITIAL_ANIMAL_OBJ = {
	Name: "",
	Image: null,
	Description: "",
	Weight: 0,
	BirthDate: moment().format("YYYY-MM-DD"),
	SpeciesId: 0,
	cageHistory: {
		cageId: 0,
	},
};

function AddAnimal({ fetch }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [cages, setCages] = useState([]);
	const [animalObj, setAnimalObj] = useState(INITIAL_ANIMAL_OBJ);
	const [speciesObj, setSpeciesObj] = useState([]);
	const [img, setImg] = useState(null);

	useEffect(() => {
		axios
			.get("odata/cages?$filter=IsDeleted eq false&$select=Id,Name")
			.then((res) => {
				let arr = res.data.value;
				setCages(arr);
				animalObj.cageHistory.cageId = arr[0].Id;
			});
	}, []);

	useEffect(() => {
		axios
			.get(`odata/species?$filter=isDeleted eq false&$select=Id,Name`)
			.then((res) => {
				let arr = Object.values(res.data.value);
				setSpeciesObj([...arr]);
				animalObj.SpeciesId = arr[0].Id;
			});
	}, []);

	const saveNewAnimal = async () => {
		if (animalObj.Name.trim() === "")
			return setErrorMessage("Name is required!");
		if (animalObj.Description.trim() === "")
			return setErrorMessage("Description is required!");
		if (animalObj.Weight <= 0)
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
				if (msg === undefined) msg = "Something go wrong!";
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
			Description: animalObj.Description,
			Weight: animalObj.Weight,
			BirthDate: animalObj.BirthDate,
			SpeciesId: animalObj.SpeciesId,
			Image: animalObj.Image,
			cageHistory: animalObj.cageHistory,
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
			})
			.finally(() => {
				setAnimalObj(INITIAL_ANIMAL_OBJ);
				setImg(null);
			});
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setAnimalObj({ ...animalObj, [updateType]: value });
	};

	const updateCageId = (value) => {
		setErrorMessage("");
		setAnimalObj({
			...animalObj,
			cageHistory: {
				cageId: value,
			},
		});
	};

	const onImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setImg(e.target.files[0]);
		}
	};

	return (
		<>
			<div className="inline-block float-right">
				<button
					className="btn px-6 normal-case btn-primary"
					onClick={() => document.getElementById("addAnimal").showModal()}
				>
					Add New
				</button>
				<dialog id="addAnimal" className="modal ">
					<div className="modal-box">
						<h3 className="font-bold text-lg">Add new animal</h3>
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
								value={animalObj.Description}
								onChange={(e) => updateFormValue("Description", e.target.value)}
								className="textarea textarea-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">Weight</span>
							</label>
							<input
								type="number"
								placeholder=""
								min="1"
								value={animalObj.Weight}
								onChange={(e) => updateFormValue("Weight", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">BirthDate</span>
							</label>
							<input
								type="date"
								placeholder=""
								value={animalObj.BirthDate}
								onChange={(e) => updateFormValue("BirthDate", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">Species</span>
							</label>
							<select
								value={animalObj.SpeciesId}
								onChange={(e) => updateFormValue("SpeciesId", e.target.value)}
								className="select select-bordered w-full"
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
								<span className="label-text">Cage</span>
							</label>
							<select
								value={animalObj.cageHistory.cageId}
								onChange={(e) => updateCageId(e.target.value)}
								className="select select-bordered w-full"
							>
								{cages.length > 0
									? cages.map((l) => (
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
								src={img ? URL.createObjectURL(img) : "../img/noimage.jpg"}
								alt="animal"
								className="mt-2 border rounded-lg min-w-full"
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

export default AddAnimal;
