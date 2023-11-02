import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";

const INITIAL_CAGE_OBJ = {
	Id: "",
	Name: "",
	Image: "",
	Description: "",
	Weight: 0,
	Height: 0,
	BirthDate: "",
	SpeciesId: 0,
	Species: {},
	CageHistories: [],
	CreationDate: "",
	DeletionDate: "",
	IsDeleted: false,
};

function ViewAnimal({ id }) {
	const [errorMessage, setErrorMessage] = useState("");
	const [animalObj, setAnimalObj] = useState(INITIAL_CAGE_OBJ);

	useEffect(() => {
		axios
			.get(
				`odata/animals(${id})?$expand=species,cageHistories($expand=cage),dietDetails($filter=DeletionDate eq null;$expand=diet($filter=DeletionDate eq null))`
			)
			.then((res) => {
				setAnimalObj({
					...animalObj,
					...res.data,
				});
			});
	}, [id]);

	return (
		<>
			<dialog id="btnViewAnimal" className="modal ">
				<div className="modal-box max-w-4xl">
					<h3 className="font-bold text-lg">Animal information details</h3>

					<div className="form-control w-full grid grid-cols-2 gap-6">
						<div>
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">ID</span>
								</label>
								<input
									value={animalObj.Id ?? ""}
									className="input input-bordered w-full "
									disabled
								/>
							</div>

							<label className="label mt-4">
								<span className="label-text">Name</span>
							</label>
							<input
								type="text"
								value={animalObj.Name ?? ""}
								className="input input-bordered w-full"
								disabled
							/>

							<label className="label mt-4">
								<span className="label-text">Description</span>
							</label>
							<textarea
								type="text"
								value={animalObj.Description}
								className="textarea textarea-bordered h-24 w-full"
								disabled
							/>

							<div className="flex gap-2">
								<div className="w-full">
									<label className="label mt-4">
										<span className="label-text">Weight</span>
									</label>
									<input
										type="number"
										value={animalObj.Weight ?? 0}
										className="input input-bordered w-full"
										disabled
									/>
								</div>
								<div className="w-full">
									<label className="label mt-4">
										<span className="label-text">Height</span>
									</label>
									<input
										type="number"
										value={animalObj.Height ?? 0}
										className="input input-bordered w-full"
										disabled
									/>
								</div>
							</div>

							<label className="label mt-4">
								<span className="label-text">BirthDate</span>
							</label>
							<input
								type="text"
								value={moment(animalObj.BirthDate).format(
									"YYYY-mm-DD hh:mm:ss"
								)}
								className="input input-bordered w-full"
								disabled
							/>

							<label className="label mt-4">
								<span className="label-text">Species</span>
							</label>
							<input
								type="text"
								value={animalObj.Species.Name ?? ""}
								className="input input-bordered w-full"
								disabled
							/>
						</div>
						<div>
							<label className="label mt-4">
								<span className="label-text">Image</span>
							</label>
							<img
								src={animalObj.Image ?? "../img/noimage.jpg"}
								alt="animal"
								className="border rounded-lg aspect-square object-cover"
							/>

							<div className="flex gap-2">
								<div className="w-full">
									<label className="label mt-4">
										<span className="label-text">CreationDate</span>
									</label>
									<input
										type="text"
										value={moment(animalObj.CreationDate).format(
											"YYYY-mm-DD hh:mm:ss"
										)}
										className="input input-bordered w-full"
										disabled
									/>
								</div>
								<div className="w-full">
									<label className="label mt-4">
										<span className="label-text">ModificationDate</span>
									</label>
									<input
										type="text"
										value={
											animalObj.ModificationDate
												? moment(animalObj.ModificationDate).format(
														"YYYY-mm-DD hh:mm:ss"
												  )
												: ""
										}
										className="input input-bordered w-full"
										disabled
									/>
								</div>
							</div>

							<div className="flex gap-2">
								<div className="w-full">
									<label className="label mt-4">
										<span className="label-text">DeletionDate</span>
									</label>
									<input
										type="text"
										value={animalObj.DeletionDate ? animalObj.DeletionDate : ""}
										className="input input-bordered w-full"
										disabled
									/>
									<div className="text-err text-lg">{errorMessage}</div>
								</div>
								<div className="w-full">
									<label className="label mt-4">
										<span className="label-text">IsDeleted</span>
									</label>
									<input
										type="text"
										value={animalObj.IsDeleted}
										className="input input-bordered w-full"
										disabled
									/>
								</div>
							</div>
						</div>
					</div>

					{animalObj.DietDetails ? (
						<>
							<label className="label mt-4">
								<span className="label-text">Diet Details</span>
							</label>
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
									{animalObj.DietDetails.map((dietDetails) => (
										<tr key={dietDetails.DietId}>
											<th>{dietDetails.DietId}</th>
											<th>{dietDetails.Diet.DietName}</th>
											<th>{dietDetails.Diet.FoodName}</th>
											<th>{dietDetails.Diet.Quantity}</th>
											<th>{dietDetails.Diet.Unit}</th>
											<th>{dietDetails.Diet.TimesPerDay}</th>
											<th>
												{moment(dietDetails.StartDate).format(
													"YYYY-MM-DD hh:mm:ss"
												)}
											</th>
											<th>
												{dietDetails.EndDate ? (
													moment(dietDetails.EndDate).format(
														"YYYY-MM-DD HH:mm:ss"
													)
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

					{animalObj.CageHistories ? (
						<>
							<label className="label mt-4">
								<span className="label-text">Cage Histories</span>
							</label>
							<table className="table">
								<thead>
									<tr>
										<th>CageId</th>
										<th>CageName</th>
										<th>StartDate</th>
										<th>EndDate</th>
									</tr>
								</thead>
								<tbody>
									{animalObj.CageHistories.map((cageHistories) => (
										<tr key={cageHistories.CageId}>
											<th>{cageHistories.CageId}</th>
											<th>{cageHistories.Cage.Name}</th>
											<th>
												{moment(cageHistories.StartDate).format(
													"YYYY-MM-DD hh:mm:ss"
												)}
											</th>
											<th>
												{cageHistories.EndDate ? (
													moment(cageHistories.EndDate).format(
														"YYYY-MM-DD HH:mm:ss"
													)
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
							<button id="btnCloseViewAnimal" className="btn">
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

export default ViewAnimal;
