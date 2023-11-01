import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";

function AddDiet({ id, fetch }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [dietId, setDietId] = useState(1);
	const [diets, setDiets] = useState([]);

	useEffect(() => {
		axios.get("odata/diets?$filter=IsDeleted eq false&$select=Id,DietName").then((res) => {
			setDiets(res.data.value);
		});
	}, []);

	const saveNewDiet = () => {
		let newDietObj = {
			animalId: id,
			dietId: dietId,
		};
		const data = JSON.stringify(newDietObj);
		setLoading(true);
		axios
			.post("odata/dietdetails", data)
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
				setDietId();
				setLoading(false);
			});
	};

	return (
		<>
			<dialog id="btnAddDiet" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Add new diet for animal</h3>
					<div className="form-control w-full ">
						<label className="label mt-4">
							<span className="label-text">Diet</span>
						</label>
						<select
							value={dietId}
							onChange={(e) => setDietId(e.target.value)}
							className="select select-bordered"
						>
							{diets ? diets.map((l) => <option key={l.Id}>{l.DietName}</option>) : ""}
						</select>
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
							Add <span className={loading ? " loading" : ""}></span>
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

export default AddDiet;
