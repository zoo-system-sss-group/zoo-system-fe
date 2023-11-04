import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";

const INITIAL_ACCOUNT_OBJ = {
	Id: "",
	Code: "",
	Name: "",
	Location: "",
	Description: "",
	Capacity: 0,
	CreationDate: "",
	DeletionDate: "",
	IsDeleted: false,
};

function ViewArea({ id }) {
	// const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [areaObj, setAreaObj] = useState(INITIAL_ACCOUNT_OBJ);

	useEffect(() => {
		axios
			.get(`odata/areas/${id}`)
			.then((res) => {
				setAreaObj(res.data);
			})
			.catch((err) => setErrorMessage(err));
	}, [id]);

	return (
		<>
			<dialog id="btnViewArea" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Area information details</h3>
					<div className="form-control w-full ">
						<div className="flex gap-2">
							<div>
								<label className="label">
									<span className="label-text">ID</span>
								</label>
								<input
									value={areaObj.Id}
									className="input input-bordered w-full "
									disabled
								/>
							</div>

							<div>
								<label className="label">
									<span className="label-text">Code</span>
								</label>
								<input
									type="text"
									value={areaObj.Code}
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
							value={areaObj.Name}
							className="input input-bordered w-full"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">Location</span>
						</label>
						<input
							type="text"
							value={areaObj.Location}
							className="input input-bordered w-full"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">Description</span>
						</label>
						<textarea
							type="text"
							value={areaObj.Description}
							className="textarea textarea-bordered h-24"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">Capacity</span>
						</label>
						<input
							type="number"
							value={areaObj.Capacity}
							className="input input-bordered w-full"
							disabled
						/>

						<div className="flex gap-2">
							<div>
								<label className="label mt-4">
									<span className="label-text">Creation Date</span>
								</label>
								<input
									type="text"
									value={moment(areaObj.CreationDate).format(
										"YYYY-mm-DD hh:mm:ss"
									)}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
							<div>
								<label className="label mt-4">
									<span className="label-text">Modification Date</span>
								</label>
								<input
									type="text"
									value={
										areaObj.ModificationDate
											? moment(areaObj.ModificationDate).format(
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
							<div>
								<label className="label mt-4">
									<span className="label-text">Deletion Date</span>
								</label>
								<input
									type="text"
									value={areaObj.DeletionDate ? areaObj.DeletionDate : ""}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
							<div>
								<label className="label mt-4">
									<span className="label-text">Is Deleted</span>
								</label>
								<input
									type="text"
									value={areaObj.IsDeleted}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
						</div>

						<div className="text-err text-lg">{errorMessage}</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseViewArea" className="btn">
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

export default ViewArea;
