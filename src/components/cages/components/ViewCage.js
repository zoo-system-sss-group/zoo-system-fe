import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
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
};

function ViewCage({ id }) {
	const [errorMessage, setErrorMessage] = useState("");
	const [cageObj, setCageObj] = useState(INITIAL_CAGE_OBJ);

	useEffect(() => {
		axios.get(`odata/cages/${id}`).then((res) => {
			setCageObj({
				...cageObj,
				...res.data,
			});
		});
	}, [id]);

	return (
		<>
			<dialog id="btnViewCage" className="modal ">
				<div className="modal-box max-w-2xl">
					<h3 className="font-bold text-lg">Cage information details</h3>

					<label className="label mt-4">
						<span className="label-text">Image</span>
					</label>
					<img
						src={cageObj.Image ? cageObj.Image : "../img/noimage.jpg"}
						alt="cage"
						className="mt-2 border rounded-lg min-w-full"
					/>

					<div className="form-control w-full">
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
							className="textarea textarea-bordered h-24"
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

						<div className="flex gap-2">
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">CreationDate</span>
								</label>
								<input
									type="text"
									value={moment(cageObj.CreationDate).format(
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
										cageObj.ModificationDate
											? moment(cageObj.ModificationDate).format(
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
									value={cageObj.DeletionDate ? cageObj.DeletionDate : ""}
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
									value={cageObj.IsDeleted}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
						</div>

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
