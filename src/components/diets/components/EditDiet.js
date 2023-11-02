import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";

const INITIAL_SPECIES_OBJ = {
	Id: "",
	DietName: "",
	FoodName: "",
	Quantity: 0,
	Unit: "",
	TimesPerDay: 0,
};

const UNIT = [
	"Milliliter",
	"Liter",
	"Gallon",
	"Gram",
	"Kilogram",
	"Ounce",
	"Pound",
	"Each",
	"Dozen",
	"Pair",
	"Teaspoon",
	"Tablespoon",
	"Cup",
	"kilograms",
	"liters",
];

function EditDiet({ id, fetch }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [dietObj, setDietObj] = useState(INITIAL_SPECIES_OBJ);

	useEffect(() => {
		axios.get(`odata/diets/${id}`).then((res) => {
			setDietObj({
				...dietObj,
				...res.data,
			});
			setErrorMessage("");
		});
	}, [id]);

	const saveNewDiet = () => {
		if (dietObj.DietName.trim() === "")
			return setErrorMessage("Diet Name is required!");
		if (dietObj.FoodName.trim() === "")
			return setErrorMessage("Food Name is required!");
		if (dietObj.Unit.trim() === "") return setErrorMessage("Unit is required!");
		if (dietObj.Quantity <= 0)
			return setErrorMessage("Quantity must greater than 0!");
		if (dietObj.TimesPerDay <= 0)
			return setErrorMessage("Times Per Day must greater than 0!");

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
			.put(`odata/diets/${dietObj.Id}`, data)
			.then((res) => {
				document.getElementById("btnCloseEditDiet").click();
				dispatch(
					showNotification({
						message: "Edit diet successfully",
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
		setDietObj({ ...dietObj, [updateType]: value });
	};

	return (
		<>
			<dialog id="btnEditDiet" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Edit diet</h3>
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
							<button id="btnCloseEditDiet" className="btn">
								Close
							</button>
						</form>

						<button
							className="btn btn-primary ml-4"
							onClick={(e) => saveNewDiet()}
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

export default EditDiet;
