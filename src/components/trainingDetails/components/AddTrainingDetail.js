import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { FirebaseImageUpload } from "../../../FirebaseImageUpload/FirebaseImageUpload";

const INITIAL_CAGE_OBJ = {
	trainerId: 0,
	animalId: 0,
};

function AddTrainingDetail({ fetch }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [trainingDetailObj, setTrainingDetailObj] = useState(INITIAL_CAGE_OBJ);
	const [trainers, setTrainers] = useState([]);
	const [animals, setAnimals] = useState([]);

	useEffect(() => {
		axios
			.get(
				`odata/accounts?$filter=IsDeleted eq false and Role eq 'Trainer'&$select=Id,Fullname`
			)
			.then((res) => {
				let arr = Object.values(res.data.value);
				setTrainers(arr);
				trainingDetailObj.trainerId = arr[0]?.Id;
			});
		axios
			.get(`odata/animals?$filter=IsDeleted eq false&$select=Id,Name`)
			.then((res) => {
				let arr = Object.values(res.data.value);
				setAnimals(arr);
				trainingDetailObj.animalId = arr[0]?.Id;
			});
	}, []);

	const saveNewTrainingDetail = () => {
		if (trainingDetailObj.trainerId === 0)
			return setErrorMessage("trainerId is required!");
		if (trainingDetailObj.animalId === 0)
			return setErrorMessage("animalId is required!");

		setLoading(true);

		let newTrainingDetailObj = {
			trainerId: trainingDetailObj.trainerId,
			animalId: trainingDetailObj.animalId,
		};

		const data = JSON.stringify(newTrainingDetailObj);
		axios
			.post("odata/trainingDetails", data)
			.then((res) => {
				document.getElementById("btnCloseAddTrainingDetail").click();
				dispatch(
					showNotification({
						message: "New TrainingDetail Added!",
						status: res.status,
					})
				);
				fetch();
			})
			.catch((err) => {
				var msg = err?.response?.data?.value;
				if (msg === undefined) msg = err.message;
				setErrorMessage(msg);
			})
			.finally(() => {
				setTrainingDetailObj(INITIAL_CAGE_OBJ);
				setLoading(false);
			});
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setTrainingDetailObj({ ...trainingDetailObj, [updateType]: value });
	};

	return (
		<>
			<div className="inline-block float-right">
				<button
					className="btn px-6  normal-case btn-primary"
					onClick={() =>
						document.getElementById("btnAddTrainingDetail").showModal()
					}
				>
					Add New
				</button>
				<dialog id="btnAddTrainingDetail" className="modal">
					<div className="modal-box max-w-2xl">
						<h3 className="font-bold text-2xl">Add new trainingDetail</h3>
						<div className="form-control">
							<label className="label mt-4">
								<span className="label-text">Choose Trainer</span>
							</label>
							<select
								type="text"
								placeholder=""
								value={trainingDetailObj.trainerId}
								onChange={(e) => updateFormValue("trainerId", e.target.value)}
								className="select select-bordered w-full"
							>
								{trainers.length > 0
									? trainers.map((l) => (
											<option key={l.Id} value={l.Id}>
												{l.Fullname}
											</option>
									  ))
									: ""}
							</select>

							<label className="label mt-4">
								<span className="label-text">Choose Animal</span>
							</label>
							<select
								type="text"
								placeholder=""
								value={trainingDetailObj.animalId}
								onChange={(e) => updateFormValue("animalId", e.target.value)}
								className="select select-bordered w-full"
							>
								{animals.length > 0
									? animals.map((l) => (
											<option key={l.Id} value={l.Id}>
												{l.Name}
											</option>
									  ))
									: ""}
							</select>
						</div>
						<div className="text-err text-lg">{errorMessage}</div>
						<div className="modal-action">
							<form method="dialog">
								<button id="btnCloseAddTrainingDetail" className="btn">
									Close
								</button>
							</form>

							<button
								className="btn btn-primary ml-4 "
								onClick={() => saveNewTrainingDetail()}
							>
								Add <span className={loading ? " loading" : ""}></span>
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

export default AddTrainingDetail;
