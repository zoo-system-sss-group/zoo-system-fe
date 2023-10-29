import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
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

function ViewNews({ id }) {
	// const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [newsObj, setNewsObj] = useState(INITIAL_ACCOUNT_OBJ);

	useEffect(() => {
		axios.get(`odata/newss/${id}`).then((res) => {
			setNewsObj({
				...newsObj,
				...res.data,
			});
		});
	}, [id]);

	return (
		<>
			<dialog id="btnViewNews" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">News information details</h3>
					<div className="form-control w-full ">
						<div className="flex gap-2">
							<div>
								<label className="label">
									<span className="label-text">ID</span>
								</label>
								<input
									value={newsObj.Id}
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
									value={newsObj.Code}
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
							value={newsObj.Name}
							className="input input-bordered w-full"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">Location</span>
						</label>
						<input
							type="text"
							value={newsObj.Location}
							className="input input-bordered w-full"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">Description</span>
						</label>
						<textnews
							type="text"
							value={newsObj.Description}
							className="textnews textnews-bordered h-24"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">Capacity</span>
						</label>
						<input
							type="number"
							value={newsObj.Capacity}
							className="input input-bordered w-full"
							disabled
						/>

						<div className="flex gap-2">
							<div>
								<label className="label mt-4">
									<span className="label-text">CreationDate</span>
								</label>
								<input
									type="text"
									value={moment(newsObj.CreationDate).format(
										"YYYY-mm-DD hh:mm:ss"
									)}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
							<div>
								<label className="label mt-4">
									<span className="label-text">ModificationDate</span>
								</label>
								<input
									type="text"
									value={
										newsObj.ModificationDate
											? moment(newsObj.ModificationDate).format(
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
									<span className="label-text">DeletionDate</span>
								</label>
								<input
									type="text"
									value={newsObj.DeletionDate ? newsObj.DeletionDate : ""}
									className="input input-bordered w-full"
									disabled
								/>
								<div className="text-err text-lg">{errorMessage}</div>
							</div>
							<div>
								<label className="label mt-4">
									<span className="label-text">IsDeleted</span>
								</label>
								<input
									type="text"
									value={newsObj.IsDeleted}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
						</div>

						<div className="text-err text-lg">{errorMessage}</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseViewNews" className="btn">
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

export default ViewNews;
