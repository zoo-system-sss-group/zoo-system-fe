import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";

const INITIAL_CAGE_OBJ = {
	animalId: 0,
	dietId: 0,
};

function AddDietDetail({ fetch }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [dietDetailObj, setDietDetailObj] = useState(INITIAL_CAGE_OBJ);
	const [diets, setDiets] = useState([]);
	const [animals, setAnimals] = useState([]);

	useEffect(() => {
		axios
			.get(`odata/animals?$filter=IsDeleted eq false&$select=Id,Name`)
			.then((res) => {
				let arr = Object.values(res.data.value);
				setAnimals(arr);
				dietDetailObj.animalId = arr[0].Id;
			});
		axios
			.get(`odata/diets?$filter=IsDeleted eq false&$select=Id,DietName`)
			.then((res) => {
				let arr = Object.values(res.data.value);
				setDiets(arr);
				dietDetailObj.dietId = arr[0].Id;
			});
	}, []);

	const saveNewDietDetail = () => {
		if (dietDetailObj.dietId === 0)
			return setErrorMessage("dietId is required!");
		if (dietDetailObj.animalId === 0)
			return setErrorMessage("animalId is required!");

		setLoading(true);

		let newDietDetailObj = {
			dietId: dietDetailObj.dietId,
			animalId: dietDetailObj.animalId,
		};

		const data = JSON.stringify(newDietDetailObj);
		axios
			.post("odata/dietDetails", data)
			.then((res) => {
				document.getElementById("btnCloseAddDietDetail").click();
				dispatch(
					showNotification({
						message: "New DietDetail Added!",
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
				setDietDetailObj(INITIAL_CAGE_OBJ);
				setLoading(false);
			});
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setDietDetailObj({ ...dietDetailObj, [updateType]: value });
	};

	return (
		<>
			<div className="inline-block float-right">
				<button
					className="btn px-6  normal-case btn-primary"
					onClick={() =>
						document.getElementById("btnAddDietDetail").showModal()
					}
				>
					Add New
				</button>
				<dialog id="btnAddDietDetail" className="modal">
					<div className="modal-box max-w-2xl">
						<h3 className="font-bold text-2xl">Add new dietDetail</h3>
						<div className="form-control">
							<label className="label mt-4">
								<span className="label-text">Choose Animal</span>
							</label>
							<select
								type="text"
								placeholder=""
								value={dietDetailObj.animalId}
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

							<label className="label mt-4">
								<span className="label-text">Choose Diet</span>
							</label>
							<select
								type="text"
								placeholder=""
								value={dietDetailObj.dietId}
								onChange={(e) => updateFormValue("dietId", e.target.value)}
								className="select select-bordered w-full"
							>
								{diets.length > 0
									? diets.map((l) => (
											<option key={l.Id} value={l.Id}>
												{l.DietName}
											</option>
									  ))
									: ""}
							</select>
						</div>
						<div className="text-err text-lg">{errorMessage}</div>
						<div className="modal-action">
							<form method="dialog">
								<button id="btnCloseAddDietDetail" className="btn">
									Close
								</button>
							</form>

							<button
								className="btn btn-primary ml-4 "
								onClick={() => saveNewDietDetail()}
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

export default AddDietDetail;
