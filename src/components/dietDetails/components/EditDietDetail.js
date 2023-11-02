import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";

const INITIAL_TRAININGDETAIL_OBJ = {
	DietId: "",
	AnimalId: "",
	StartDate: null,
	EndDate: null,
};

function EditDietDetail({ id, fetch }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [check, setCheck] = useState(false);
	const [dietDetailObj, setDietDetailObj] = useState(
		INITIAL_TRAININGDETAIL_OBJ
	);
	// const [diets, setDiets] = useState([]);
	// const [animals, setAnimals] = useState([]);

	useEffect(() => {
		// axios
		// 	.get(
		// 		`odata/accounts?$filter=IsDeleted eq false and Role eq 'Diet'&$select=Id,Fullname`
		// 	)
		// 	.then((res) => {
		// 		let arr = Object.values(res.data.value);
		// 		setDiets(arr);
		// 	});
		// axios
		// 	.get(`odata/animals?$filter=IsDeleted eq false&$select=Id,Name`)
		// 	.then((res) => {
		// 		let arr = Object.values(res.data.value);
		// 		setAnimals(arr);
		// 	});
		axios.get(`odata/dietDetails/${id}?$expand=Animal,Diet`).then((res) => {
			setDietDetailObj({
				...INITIAL_TRAININGDETAIL_OBJ,
				...res.data,
			});
		});
	}, [id]);

	const saveNewDietDetail = () => {
		if (dietDetailObj.dietId === 0)
			return setErrorMessage("dietId is required!");
		if (dietDetailObj.animalId === 0)
			return setErrorMessage("animalId is required!");

		if (check) dietDetailObj.EndDate = new Date();

		setLoading(true);

		let newDietDetailObj = {
			dietId: dietDetailObj.DietId,
			animalId: dietDetailObj.AnimalId,
			// startDate: dietDetailObj.startDate,
			endDate: dietDetailObj.EndDate,
		};
		const data = JSON.stringify(newDietDetailObj);
		axios
			.put(`odata/dietDetails/${dietDetailObj.Id}`, data)
			.then((res) => {
				document.getElementById("btnCloseEditDietDetail").click();
				dispatch(
					showNotification({
						message: "Edit dietDetail successfully",
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
				setDietDetailObj(INITIAL_TRAININGDETAIL_OBJ);
			});
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setDietDetailObj({ ...dietDetailObj, [updateType]: value });
	};

	return (
		<>
			<dialog id="btnEditDietDetail" className="modal ">
				<div className="modal-box max-w-2xl">
					<h3 className="font-bold text-lg">Edit dietDetail</h3>
					<div className="form-control w-full mt-4">
						{/* <label className="label mt-4">
							<span className="label-text">Choose Diet</span>
						</label>
						<select
							type="text"
							placeholder=""
							value={dietDetailObj.DietId}
							onChange={(e) => updateFormValue("DietId", e.target.value)}
							className="select select-bordered w-full"
						>
							{diets.length > 0
								? diets.map((l) => (
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
							value={dietDetailObj.AnimalId}
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
								Do you want this animal stop eating this diet?
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
							<button id="btnCloseEditDietDetail" className="btn">
								Close
							</button>
						</form>
						<button
							className="btn btn-primary ml-4"
							onClick={(e) => saveNewDietDetail()}
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

export default EditDietDetail;
