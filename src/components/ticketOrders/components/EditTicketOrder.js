import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";

const INITIAL_TICKETORDER_OBJ = {
	CustomerName: "",
	Email: "",
	PhoneNumber: "",
	EffectiveDate: new Date(),
	Tickets: [
		{
			ticketType: "AdultTicket",
			quantity: 0,
		},
		{
			ticketType: "ChildrenTicket",
			quantity: 0,
		},
	],
};

function EditTicketOrder({ id, fetch }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [ticketOrderObj, setTicketOrderObj] = useState(INITIAL_TICKETORDER_OBJ);

	useEffect(() => {
		axios.get(`odata/ticketOrders/${id}`).then((res) => {
			setTicketOrderObj({
				...ticketOrderObj,
				...res.data,
			});
		});
	}, [id]);

	const saveNewTicketOrder = () => {
		if (ticketOrderObj.Code.trim() === "")
			return setErrorMessage("Code is required!");
		if (ticketOrderObj.Name.trim() === "")
			return setErrorMessage("Name is required!");
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
		axios
			.put(`odata/ticketOrders/${ticketOrderObj.Id}`, data)
			.then((res) => {
				document.getElementById("btnCloseEditTicketOrder").click();
				dispatch(
					showNotification({
						message: "Edit ticketOrder successfully",
						status: res.status,
					})
				);
				fetch();
			})
			.catch((err) => {
				return setErrorMessage(err.response.data.value);
			});
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setTicketOrderObj({ ...ticketOrderObj, [updateType]: value });
	};

	return (
		<>
			<dialog id="btnEditTicketOrder" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Edit ticketOrder</h3>
					<div className="form-control w-full mt-4">
						<label className="label">
							<span className="label-text">ID</span>
						</label>
						<input
							value={ticketOrderObj.Id}
							className="input input-bordered w-full "
							disabled
						/>

						<label className="label">
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
							value={ticketOrderObj.Location ? ticketOrderObj.Location : ""}
							onChange={(e) => updateFormValue("Fullname", e.target.value)}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">Description</span>
						</label>
						<textarea
							type="text"
							placeholder=""
							value={
								ticketOrderObj.Description ? ticketOrderObj.Description : ""
							}
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
							<button id="btnCloseEditTicketOrder" className="btn">
								Close
							</button>
						</form>

						<button
							className="btn btn-primary ml-4"
							onClick={(e) => saveNewTicketOrder()}
						>
							Save
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

export default EditTicketOrder;
