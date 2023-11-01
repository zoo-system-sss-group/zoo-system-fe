import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import moment from "moment";
import ReactDatePicker from "react-datepicker";

const PAYMENT_METHOD = ["Momo", "Card", "Cash"];
const MIN_DATE = new Date();
const MAX_DATE = new Date(MIN_DATE);
MAX_DATE.setDate(MIN_DATE.getDate() + 30);

const INITIAL_TICKETORDER_OBJ = {
	CustomerName: "",
	Email: "",
	PhoneNumber: "",
	EffectiveDate: new Date(),
	PaymentMethod: PAYMENT_METHOD[3],
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

function AddTicketOrder({ fetch }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [ticketOrderObj, setTicketOrderObj] = useState(INITIAL_TICKETORDER_OBJ);

	const saveNewTicketOrder = () => {
		if (ticketOrderObj.CustomerName.trim() === "")
			return setErrorMessage("Code is required!");
		if (ticketOrderObj.PhoneNumber.trim() === "")
			return setErrorMessage("PhoneNumber is required!");
		if (ticketOrderObj.EffectiveDate === "")
			return setErrorMessage("EffectiveDate is required!");

		let newTicketOrderObj = {
			CustomerName: ticketOrderObj.CustomerName,
			Email: ticketOrderObj.Email,
			PhoneNumber: ticketOrderObj.PhoneNumber,
			EffectiveDate: ticketOrderObj.EffectiveDate,
			Tickets: ticketOrderObj.Tickets,
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

	const updateTicketQuantity = (updateType, value) => {
		setErrorMessage("");
		var newTickets = ticketOrderObj.Tickets;
		if (updateType === newTickets[0].ticketType) {
			newTickets[0].quantity = value;
		} else {
			newTickets[1].quantity = value;
		}
		setTicketOrderObj({ ...ticketOrderObj, Tickets: newTickets });
	};

	return (
		<>
			<div className="inline-block float-right">
				<button
					className="btn px-6  normal-case btn-primary"
					onClick={() =>
						document.getElementById("btnAddTicketOrder").showModal()
					}
				>
					Add New
				</button>
				<dialog id="btnAddTicketOrder" className="modal ">
					<div className="modal-box">
						<h3 className="font-bold text-2xl">Add new ticketOrder</h3>
						<div className="form-control w-full ">
							<label className="label mt-4">
								<span className="label-text">CustomerName</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={ticketOrderObj.CustomerName}
								onChange={(e) =>
									updateFormValue("CustomerName", e.target.value)
								}
								className="input input-bordered w-full "
							/>

							<label className="label mt-4">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder=""
								value={ticketOrderObj.Email}
								onChange={(e) => updateFormValue("Email", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">PhoneNumber</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={ticketOrderObj.PhoneNumber}
								onChange={(e) => updateFormValue("PhoneNumber", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">EffectiveDate</span>
							</label>
							<ReactDatePicker
								className="input input-bordered w-full"
								minDate={MIN_DATE}
								maxDate={MAX_DATE}
								dateFormat={"yyyy-MM-dd"}
								name="effectiveDate"
								selected={ticketOrderObj.EffectiveDate}
								onChange={(date) => updateFormValue("EffectiveDate", date)}
							/>

							<label className="label mt-4">
								<span className="label-text">AdultTicket</span>
							</label>
							<input
								type="number"
								placeholder=""
								min="1"
								value={ticketOrderObj.Tickets[0].quantity}
								onChange={(e) =>
									updateTicketQuantity("AdultTicket", e.target.value)
								}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">ChildrenTicket</span>
							</label>
							<input
								type="number"
								placeholder=""
								min="0"
								value={ticketOrderObj.Tickets[1].quantity}
								onChange={(e) =>
									updateTicketQuantity("ChildrenTicket", e.target.value)
								}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">PaymentMethod</span>
							</label>
							<select
								type="text"
								placeholder=""
								value={ticketOrderObj.PaymentMethod}
								onChange={(e) =>
									updateFormValue("PaymentMethod", e.target.value)
								}
								className="select select-bordered w-full"
							>
								{PAYMENT_METHOD.map((l, k) => (
									<option key={k} value={l}>
										{l}
									</option>
								))}
							</select>

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
