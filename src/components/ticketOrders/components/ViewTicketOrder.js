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

function ViewTicketOrder({ id }) {
	// const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [ticketOrderObj, setTicketOrderObj] = useState(INITIAL_ACCOUNT_OBJ);

	useEffect(() => {
		axios.get(`odata/ticketOrders/${id}`).then((res) => {
			setTicketOrderObj({
				...ticketOrderObj,
				...res.data,
			});
		});
	}, [id]);

	return (
		<>
			<dialog id="btnViewTicketOrder" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">TicketOrder information details</h3>
					<div className="form-control w-full ">
						<div className="flex gap-2">
							<div>
								<label className="label">
									<span className="label-text">ID</span>
								</label>
								<input
									value={ticketOrderObj.Id}
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
									value={ticketOrderObj.Code}
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
							value={ticketOrderObj.Name}
							className="input input-bordered w-full"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">Location</span>
						</label>
						<input
							type="text"
							value={ticketOrderObj.Location}
							className="input input-bordered w-full"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">Description</span>
						</label>
						<textarea
							type="text"
							value={ticketOrderObj.Description}
							className="textarea textarea-bordered h-24"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">Capacity</span>
						</label>
						<input
							type="number"
							value={ticketOrderObj.Capacity}
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
									value={moment(ticketOrderObj.CreationDate).format(
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
										ticketOrderObj.ModificationDate
											? moment(ticketOrderObj.ModificationDate).format(
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
									value={ticketOrderObj.DeletionDate ? ticketOrderObj.DeletionDate : ""}
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
									value={ticketOrderObj.IsDeleted}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
						</div>

						<div className="text-err text-lg">{errorMessage}</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseViewTicketOrder" className="btn">
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

export default ViewTicketOrder;
