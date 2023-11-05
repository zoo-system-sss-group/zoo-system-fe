import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";

const INITIAL_CAGE_OBJ = {
	Id: "",
	Code: "",
	Name: "",
	Image: "",
	Location: "",
	Description: "",
	Capacity: 0,
	CreationDate: "",
	DeletionDate: "",
	IsDeleted: false,
	CageHistories: [],
	Area: {
		Name: "",
	},
};

function ViewCage({ id }) {
	const [errorMessage, setErrorMessage] = useState("");
	const [cageObj, setCageObj] = useState(INITIAL_CAGE_OBJ);

	useEffect(() => {
		axios
			.get(
				`odata/cages(${id})?$expand=cageHistories($filter=EndDate eq null;$expand=animal),area`
			)
			.then((res) => {
				setCageObj(res.data);
			})
			.catch((err) => {
				setErrorMessage(err);
			});
	}, [id]);

	return (
		<>
			<dialog id="btnViewCage" className="modal ">
				<div className="modal-box max-w-3xl">
					<h3 className="font-bold text-lg">Cage information details</h3>

					<div className="form-control w-full max-w-3xl">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<div className="flex gap-2">
									<div className="w-full">
										<label className="label">
											<span className="label-text">ID</span>
										</label>
										<input
											value={cageObj.Id}
											className="input input-bordered w-full "
											disabled
										/>
									</div>

									<div className="w-full">
										<label className="label">
											<span className="label-text">Code</span>
										</label>
										<input
											type="text"
											value={cageObj.Code}
											className="input input-bordered w-full "
											disabled
										/>
									</div>
								</div>

								<label className="label mt-4">
									<span className="label-text">Name</span>
								</label>
								<input
									type="text"
									value={cageObj.Name}
									className="input input-bordered w-full"
									disabled
								/>

								<label className="label mt-4">
									<span className="label-text">Location</span>
								</label>
								<input
									type="text"
									value={cageObj.Location}
									className="input input-bordered w-full"
									disabled
								/>

								<label className="label mt-4">
									<span className="label-text">Description</span>
								</label>
								<textarea
									type="text"
									value={cageObj.Description}
									className="textarea textarea-bordered w-full h-36"
									disabled
								/>

								<label className="label mt-4">
									<span className="label-text">Area</span>
								</label>
								<input
									type="text"
									value={cageObj.Area.Name}
									className="input input-bordered w-full"
									disabled
								/>

								<label className="label mt-4">
									<span className="label-text">Capacity</span>
								</label>
								<input
									type="number"
									value={cageObj.Capacity}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
							<div>
								<label className="label">
									<span className="label-text">Image</span>
								</label>
								<img
									src={cageObj.Image ?? "../img/noimage.jpg"}
									alt="cage"
									className="border rounded-lg w-full aspect-square object-cover"
								/>

								<label className="label mt-4">
									<span className="label-text">Creation Date</span>
								</label>
								<input
									type="text"
									value={moment(cageObj.CreationDate).format(
										"YYYY-mm-DD hh:mm:ss"
									)}
									className="input input-bordered w-full"
									disabled
								/>
								<label className="label mt-4">
									<span className="label-text">Modification Date</span>
								</label>
								<input
									type="text"
									value={
										cageObj.ModificationDate
											? moment(cageObj.ModificationDate).format(
													"YYYY-mm-DD hh:mm:ss"
											  )
											: ""
									}
									className="input input-bordered w-full"
									disabled
								/>
								<div className="flex gap-2">
									<div className="w-full">
										<label className="label mt-4">
											<span className="label-text">Deletion Date</span>
										</label>
										<input
											type="text"
											value={cageObj.DeletionDate ? cageObj.DeletionDate : ""}
											className="input input-bordered w-full"
											disabled
										/>
									</div>
									<div className="w-full">
										<label className="label mt-4">
											<span className="label-text">Is Deleted</span>
										</label>
										<input
											type="text"
											value={cageObj.IsDeleted}
											className="input input-bordered w-full"
											disabled
										/>
									</div>
								</div>
							</div>
						</div>

						{cageObj.CageHistories ? (
							<>
								<label className="label mt-4">
									<span className="label-text">Current animal in cage</span>
								</label>
								<table className="table">
									<thead>
										<tr>
											<th>Animal Id</th>
											<th>Animal Name</th>
											<th>Animal Status</th>
											<th>Start Date</th>
											<th>End Date</th>
										</tr>
									</thead>
									<tbody>
										{cageObj.CageHistories.map((cageHistories) => (
											<tr key={cageHistories.Id}>
												<th>{cageHistories.AnimalId}</th>
												<th>{cageHistories.Animal.Name}</th>
												<th>{cageHistories.Animal.Status}</th>
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
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseViewCage" className="btn">
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

export default ViewCage;
