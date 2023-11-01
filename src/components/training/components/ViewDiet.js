import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";

function ViewDiet({ id }) {
	const [errorMessage, setErrorMessage] = useState("");
	const [dietObj, setDietObj] = useState([]);

	useEffect(() => {
		axios
			.get(`odata/dietdetails?filter=AnimalId eq ${id}&expand=Diet`)
			.then((res) => {
				setDietObj(res.data.value);
			});
	}, [id]);

	return (
		<>
			<dialog id="btnViewDiet" className="modal ">
				<div className="modal-box max-w-4xl">
					<h3 className="font-bold text-lg">Animal Diet Details</h3>

					{dietObj ? (
						<>
							{/* <label className="label mt-4">
								<span className="label-text">Diet Details</span>
							</label> */}
							<table className="table">
								<thead>
									<tr>
										<th>DietId</th>
										<th>DietName</th>
										<th>FoodName</th>
										<th>Quantity</th>
										<th>Unit</th>
										<th>TimesPerDay</th>
										<th>StartDate</th>
										<th>EndDate</th>
									</tr>
								</thead>
								<tbody>
									{dietObj.map((diet) => (
										<tr key={diet.Id}>
											<th>{diet.DietId}</th>
											<th>{diet.Diet.DietName}</th>
											<th>{diet.Diet.FoodName}</th>
											<th>{diet.Diet.Quantity}</th>
											<th>{diet.Diet.Unit}</th>
											<th>{diet.Diet.TimesPerDay}</th>
											<th>
												{moment(diet.StartDate).format("YYYY-MM-DD hh:mm:ss")}
											</th>
											<th>
												{diet.EndDate ? (
													moment(diet.EndDate).format("YYYY-MM-DD HH:mm:ss")
												) : (
													<span className="text-cor1 font-semibold">
														Not end yet
													</span>
												)}
											</th>
										</tr>
									))}
								</tbody>
							</table>
						</>
					) : (
						""
					)}
					<div className="text-err text-lg">{errorMessage}</div>

					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseViewDiet" className="btn">
								Close
							</button>
						</form>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default ViewDiet;
