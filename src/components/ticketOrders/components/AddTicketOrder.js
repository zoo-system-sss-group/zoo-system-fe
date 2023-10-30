import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
// import { addNewTicketOrder } from "../ticketOrderSlice"

const INITIAL_ACCOUNT_OBJ = {
	Code: "",
	Name: "",
	Location: "",
	Description: "",
	Capacity: 1,
};

function AddTicketOrder({ fetch }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [ticketOrderObj, setTicketOrderObj] = useState(INITIAL_ACCOUNT_OBJ);

	const saveNewTicketOrder = () => {
		if (ticketOrderObj.Code.trim() === "") return setErrorMessage("Code is required!");
		if (ticketOrderObj.Name.trim() === "") return setErrorMessage("Name is required!");
		if (ticketOrderObj.Location.trim() === "")
			return setErrorMessage("Location is required!");
		if (ticketOrderObj.Description.trim() === "")
			return setErrorMessage("Description is required!");
		if (ticketOrderObj.Capacity <= 0)
			return setErrorMessage("Capacity must greater than 0!");

		let newTicketOrderObj = {
			Code: ticketOrderObj.Code,
			Name: ticketOrderObj.Name,
			Location: ticketOrderObj.Location,
			Description: ticketOrderObj.Description,
			Capacity: ticketOrderObj.Capacity,
		};
		const data = JSON.stringify(newTicketOrderObj);

		setLoading(true);
		axios
			.post("odata/ticketOrders", data)
			.then((res) => {
				document.getElementById("btnCloseAddTicketOrder").click();
				dispatch(
					showNotification({
						message: "New TicketOrder Added!",
						status: res.status,
					})
				);
				fetch();
			})
			.catch((err) => {
				var msg = err?.response?.data?.value;
				if (msg === undefined) msg = err.message;
				return setErrorMessage(msg);
			})
			.finally(() => setLoading(false));
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setTicketOrderObj({ ...ticketOrderObj, [updateType]: value });
	};

	return (
		<>
			<div className="inline-block float-right">
				<button
					className="btn px-6 btn-sm normal-case btn-primary"
					onClick={() => document.getElementById("btnAddTicketOrder").showModal()}
				>
					Add New
				</button>
				<dialog id="btnAddTicketOrder" className="modal ">
					<div className="modal-box">
						<h3 className="font-bold text-2xl">Add new ticketOrder</h3>
						<div className="form-control w-full ">
							<label className="label mt-4">
								<span className="label-text">Code</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={ticketOrderObj.Code}
								onChange={(e) => updateFormValue("Code", e.target.value)}
								className="input input-bordered w-full "
							/>

							<label className="label mt-4">
								<span className="label-text">Name</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={ticketOrderObj.Name}
								onChange={(e) => updateFormValue("Name", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">Location</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={ticketOrderObj.Location}
								onChange={(e) => updateFormValue("Location", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">Description</span>
							</label>
							<textarea
								type="text"
								placeholder=""
								value={ticketOrderObj.Description}
								onChange={(e) => updateFormValue("Description", e.target.value)}
								className="textarea textarea-bordered h-24"
							/>

							<label className="label mt-4">
								<span className="label-text">Capacity</span>
							</label>
							<input
								type="number"
								placeholder=""
								min="1"
								value={ticketOrderObj.Capacity}
								onChange={(e) => updateFormValue("Capacity", e.target.value)}
								className="input input-bordered w-full"
							/>
							<div className="text-err text-lg">{errorMessage}</div>
						</div>
						<div className="modal-action">
							<form method="dialog">
								<button id="btnCloseAddTicketOrder" className="btn">
									Close
								</button>
							</form>

							<button
								className="btn btn-primary ml-4 "
								onClick={() => saveNewTicketOrder()}
							>
								Create <span className={loading ? " loading" : ""}></span>
							</button>
						</div>
					</div>
					<form method="dialog" className="modal-backdrop">
						<button>close</button>
					</form>
				</dialog>
			</div>
		</>
	);
}

export default AddTicketOrder;
