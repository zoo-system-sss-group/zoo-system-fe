import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";
import { FirebaseImageUpload } from "../../../FirebaseImageUpload/FirebaseImageUpload";

const INITIAL_TRAININGDETAIL_OBJ = {
	TrainerId: "",
	AnimalId: "",
	StartDate: null,
	EndDate: null,
};

function EditTrainingDetail({ id, fetch }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [check, setCheck] = useState(false);
	const [trainingDetailObj, setTrainingDetailObj] = useState(
		INITIAL_TRAININGDETAIL_OBJ
	);
	// const [trainers, setTrainers] = useState([]);
	// const [animals, setAnimals] = useState([]);

	useEffect(() => {
		// axios
		// 	.get(
		// 		`odata/accounts?$filter=IsDeleted eq false and Role eq 'Trainer'&$select=Id,Fullname`
		// 	)
		// 	.then((res) => {
		// 		let arr = Object.values(res.data.value);
		// 		setTrainers(arr);
		// 	});
		// axios
		// 	.get(`odata/animals?$filter=IsDeleted eq false&$select=Id,Name`)
		// 	.then((res) => {
		// 		let arr = Object.values(res.data.value);
		// 		setAnimals(arr);
		// 	});
		axios.get(`odata/trainingDetails/${id}?$expand=Animal,Trainer`).then((res) => {
			setTrainingDetailObj({
				...INITIAL_TRAININGDETAIL_OBJ,
				...res.data.value[0],
			});
		});
	}, [id]);

	const saveNewTrainingDetail = () => {
		if (trainingDetailObj.trainerId === 0)
			return setErrorMessage("trainerId is required!");
		if (trainingDetailObj.animalId === 0)
			return setErrorMessage("animalId is required!");

		if (check) trainingDetailObj.EndDate = new Date();

		setLoading(true);

		let newTrainingDetailObj = {
			trainerId: trainingDetailObj.TrainerId,
			animalId: trainingDetailObj.AnimalId,
			// startDate: trainingDetailObj.startDate,
			endDate: trainingDetailObj.EndDate,
		};
		const data = JSON.stringify(newTrainingDetailObj);
		axios
			.put(`odata/trainingDetails/${trainingDetailObj.Id}`, data)
			.then((res) => {
				document.getElementById("btnCloseEditTrainingDetail").click();
				dispatch(
					showNotification({
						message: "Edit trainingDetail successfully",
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
				setCheck(false);
				setTrainingDetailObj(INITIAL_TRAININGDETAIL_OBJ);
			});
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setTrainingDetailObj({ ...trainingDetailObj, [updateType]: value });
	};

	return (
		<>
			<dialog id="btnEditTrainingDetail" className="modal ">
				<div className="modal-box max-w-2xl">
					<h3 className="font-bold text-lg">Edit trainingDetail</h3>
					<div className="form-control w-full mt-4">
						{/* <label className="label mt-4">
							<span className="label-text">Choose Trainer</span>
						</label>
						<select
							type="text"
							placeholder=""
							value={trainingDetailObj.TrainerId}
							onChange={(e) => updateFormValue("TrainerId", e.target.value)}
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
							value={trainingDetailObj.AnimalId}
							onChange={(e) => updateFormValue("AnimalId", e.target.value)}
							className="select select-bordered w-full"
						>
							{animals.length > 0
								? animals.map((l) => (
										<option key={l.Id} value={l.Id}>
											{l.Name}
										</option>
								  ))
								: ""}
						</select> */}

						<label className="label cursor-pointer mt-4">
							<span className="label-text text-lg text-err">
								Do you want this trainer to stop training this animal?
							</span>
							<input
								type="checkbox"
								checked={check}
								className="checkbox checkbox-error"
								onChange={() => setCheck(!check)}
							/>
						</label>

						<div className="text-err text-lg">{errorMessage}</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseEditTrainingDetail" className="btn">
								Close
							</button>
						</form>
						<button
							className="btn btn-primary ml-4"
							onClick={(e) => saveNewTrainingDetail()}
						>
							Save
						</button>{" "}
						<span className={loading ? " loading" : ""}></span>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default EditTrainingDetail;
