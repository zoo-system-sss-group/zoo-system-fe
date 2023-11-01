import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";

const INITIAL_DIET_OBJ = {
	DietName: "",
	FoodName: "",
	Quantity: 0,
	Unit: "",
	TimesPerDay: 0,
};

const UNIT = [
	"Milliliter (mL)",
	"Liter (L)",
	"Gallon (gal)",
	"Gram (g)",
	"Kilogram (kg)",
	"Ounce (oz)",
	"Pound (lb)",
	"Each (ea)",
	"Dozen (dz)",
	"Pair",
	"Teaspoon (tsp)",
	"Tablespoon (tbsp)",
	"Cup",
];

function AddDiet({ fetch }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [dietObj, setDietObj] = useState(INITIAL_DIET_OBJ);

	const saveNewDiet = () => {
		if (dietObj.DietName.trim() === "")
			return setErrorMessage("DietName is required!");
		if (dietObj.FoodName.trim() === "")
			return setErrorMessage("FoodName is required!");
		if (dietObj.Unit.trim() === "") return setErrorMessage("Unit is required!");
		if (dietObj.Quantity <= 0)
			return setErrorMessage("Quantity must greater than 0!");
		if (dietObj.TimesPerDay <= 0)
			return setErrorMessage("TimesPerDay must greater than 0!");

		let newDietObj = {
			DietName: dietObj.DietName,
			FoodName: dietObj.FoodName,
			Unit: dietObj.Unit,
			Quantity: dietObj.Quantity,
			TimesPerDay: dietObj.TimesPerDay,
		};
		const data = JSON.stringify(newDietObj);
		setLoading(true);
		axios
			.post("odata/diets", data)
			.then((res) => {
				document.getElementById("btnCloseAddDiet").click();
				dispatch(
					showNotification({
						message: "New Diet Added!",
						status: res.status,
					})
				);
				fetch();
			})
			.catch((err) => {
				return setErrorMessage(err.response.data.value);
			})
			.finally(() => {
				setDietObj(INITIAL_DIET_OBJ);
				setLoading(false);
			});
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setDietObj({ ...dietObj, [updateType]: value });
	};

	return (
		<>
			<div className="inline-block float-right">
				<button
					className="btn px-6  normal-case btn-primary"
					onClick={() => document.getElementById("addDiet").showModal()}
				>
					Add New
				</button>
				<dialog id="addDiet" className="modal ">
					<div className="modal-box">
						<h3 className="font-bold text-lg">Add new diet</h3>
						<div className="form-control w-full ">
							<label className="label">
								<span className="label-text">Diet Name</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={dietObj.DietName}
								onChange={(e) => updateFormValue("DietName", e.target.value)}
								className="input input-bordered w-full "
							/>

							<label className="label mt-4">
								<span className="label-text">Food Name</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={dietObj.FoodName}
								onChange={(e) => updateFormValue("FoodName", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">Quantity</span>
							</label>
							<input
								type="number"
								placeholder=""
								min="1"
								value={dietObj.Quantity}
								onChange={(e) => updateFormValue("Quantity", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">Unit</span>
							</label>
							<select
								type="text"
								placeholder=""
								value={dietObj.Unit}
								onChange={(e) => updateFormValue("Unit", e.target.value)}
								className="select select-bordered"
							>
								{UNIT.map((l, k) => (
									<option key={k}>{l}</option>
								))}
							</select>

							<label className="label mt-4">
								<span className="label-text">Times Per Day</span>
							</label>
							<input
								type="number"
								placeholder=""
								min="1"
								value={dietObj.TimesPerDay}
								onChange={(e) => updateFormValue("TimesPerDay", e.target.value)}
								className="input input-bordered w-full"
							/>
							<div className="text-err text-lg">{errorMessage}</div>
						</div>
						<div className="modal-action">
							<form method="dialog">
								<button id="btnCloseAddDiet" className="btn">
									Close
								</button>
							</form>

							<button
								className="btn btn-primary ml-4"
								onClick={() => saveNewDiet()}
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

export default AddDiet;
