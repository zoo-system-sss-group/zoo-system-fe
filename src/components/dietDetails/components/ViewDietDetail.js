import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";

const INITIAL_TRAININGDETAIL_OBJ = {
	Id: "",
	AnimalId: "",
	DietId: "",
	StartDate: "",
	EndDate: "",
	CreationDate: "",
	DeletionDate: "",
	IsDeleted: false,
	Animal: {
		Name: "",
		Description: "",
		Weight: "",
		Height: "",
		BirthDate: "",
		Status: "",
	},
	Diet: {
		DietName: "",
		FoodName: "",
		Quantity: "",
		Unit: "",
		TimesPerDay: "",
	},
};

function ViewDietDetail({ id }) {
	const [errorMessage, setErrorMessage] = useState("");
	const [dietDetailObj, setDietDetailObj] = useState(
		INITIAL_TRAININGDETAIL_OBJ
	);

	useEffect(() => {
		axios.get(`odata/dietdetails/${id}?$expand=animal,diet`).then((res) => {
			setDietDetailObj({
				...INITIAL_TRAININGDETAIL_OBJ,
				...res.data,
			});
		});
	}, [id]);
	return (
		<>
			<dialog id="btnViewDietDetail" className="modal ">
				<div className="modal-box max-w-2xl">
					<h3 className="font-bold text-lg">Diet Detail information</h3>

					<div className="form-control w-full">
						<div className="flex w-full">
							<div className="w-full">
								<label className="label">
									<span className="label-text">Animal ID</span>
								</label>
								<input
									type="text"
									value={dietDetailObj.AnimalId}
									className="input input-bordered w-full "
									disabled
								/>

								<label className="label mt-4">
									<span className="label-text">Animal Name</span>
								</label>
								<input
									type="text"
									value={dietDetailObj.Animal.Name}
									className="input input-bordered w-full"
									disabled
								/>

								<label className="label mt-4">
									<span className="label-text">Description</span>
								</label>
								<textarea
									type="text"
									value={dietDetailObj.Animal.Description}
									className="textarea textarea-bordered h-24 w-full"
									disabled
								/>
								<div className="flex gap-4 mt-4">
									<div>
										<label className="label">
											<span className="label-text">Weight</span>
										</label>
										<input
											type="text"
											value={dietDetailObj.Animal.Weight ?? "No data"}
											className="input input-bordered w-full"
											disabled
										/>
									</div>
									<div>
										<label className="label">
											<span className="label-text">Height </span>
										</label>
										<input
											type="text"
											value={dietDetailObj.Animal.Height ?? "No data"}
											className="input input-bordered w-full"
											disabled
										/>
									</div>
								</div>
								<div className="flex gap-4 mt-4">
									<div>
										<label className="label">
											<span className="label-text">BirthDate</span>
										</label>
										<input
											type="text"
											value={dietDetailObj.Animal.BirthDate}
											className="input input-bordered w-full"
											disabled
										/>
									</div>
									<div>
										<label className="label">
											<span className="label-text">Status</span>
										</label>
										<input
											type="text"
											value={dietDetailObj.Animal.Status}
											className="input input-bordered w-full"
											disabled
										/>
									</div>
								</div>
							</div>
							<div className="divider divider-horizontal">Feed</div>
							<div className="w-full">
								<label className="label">
									<span className="label-text">Diet ID</span>
								</label>
								<input
									type="text"
									value={dietDetailObj.DietId}
									className="input input-bordered w-full "
									disabled
								/>

								<label className="label mt-4">
									<span className="label-text">Diet Name</span>
								</label>
								<input
									type="text"
									value={dietDetailObj.Diet.DietName}
									className="input input-bordered w-full "
									disabled
								/>

								<label className="label mt-4">
									<span className="label-text">Food Name</span>
								</label>
								<textarea
									type="text"
									value={dietDetailObj.Diet.FoodName}
									className="textarea textarea-bordered w-full h-24"
									disabled
								/>

								<div className="flex gap-4 mt-4">
									<div>
										<label className="label">
											<span className="label-text">Quantity</span>
										</label>
										<input
											type="text"
											value={dietDetailObj.Diet.Quantity}
											className="input input-bordered w-full "
											disabled
										/>
									</div>
									<div>
										<label className="label">
											<span className="label-text">Unit</span>
										</label>
										<input
											type="text"
											value={dietDetailObj.Diet.Unit}
											className="input input-bordered w-full "
											disabled
										/>
									</div>
								</div>
							</div>
						</div>

						<div className="flex gap-2">
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">Start Date</span>
								</label>
								<input
									type="text"
									value={moment(dietDetailObj.StartDate).format(
										"YYYY-mm-DD hh:mm:ss"
									)}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">End Date</span>
								</label>
								<input
									type="text"
									value={
										dietDetailObj.EndDate
											? moment(dietDetailObj.EndDate).format(
													"YYYY-mm-DD hh:mm:ss"
											  )
											: "Not end yet"
									}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
						</div>
						<div className="flex gap-2">
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">Creation Date</span>
								</label>
								<input
									type="text"
									value={moment(dietDetailObj.CreationDate).format(
										"YYYY-mm-DD hh:mm:ss"
									)}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">Modification Date</span>
								</label>
								<input
									type="text"
									value={
										dietDetailObj.ModificationDate
											? moment(dietDetailObj.ModificationDate).format(
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
									<span className="label-text">Deletion Date</span>
								</label>
								<input
									type="text"
									value={
										dietDetailObj.DeletionDate ? dietDetailObj.DeletionDate : ""
									}
									className="input input-bordered w-full"
									disabled
								/>
								<div className="text-err text-lg">{errorMessage}</div>
							</div>
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">Is Deleted</span>
								</label>
								<input
									type="text"
									value={dietDetailObj.IsDeleted}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
						</div>

						<div className="text-err text-lg">{errorMessage}</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseViewDietDetail" className="btn">
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

export default ViewDietDetail;
