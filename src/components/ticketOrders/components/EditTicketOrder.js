import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";
import ReactDatePicker from "react-datepicker";

const PAYMENT_METHOD = ["Momo", "Card", "Cash"];
const STATUS = ["Waiting", "Success", "Cancel", "IsUsed"];
const MIN_DATE = new Date();
const MAX_DATE = new Date(MIN_DATE);
MAX_DATE.setDate(MIN_DATE.getDate() + 30);
const INITIAL_TICKETORDER_OBJ = {
	CustomerName: "",
	Email: "",
	PhoneNumber: "",
	EffectiveDate: new Date(),
	PaymentMethod: PAYMENT_METHOD[0],
	Status: "",
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
			PaymentMethod: ticketOrderObj.PaymentMethod,
			Tickets: ticketOrderObj.Tickets,
			Status: ticketOrderObj.Status,
		};
		const data = JSON.stringify(newTicketOrderObj);
		setLoading(true);
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
			<dialog id="btnEditTicketOrder" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Edit ticketOrder</h3>
					<div className="form-control w-full mt-4">
						<label className="label mt-4">
							<span className="label-text">CustomerName</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={ticketOrderObj.CustomerName}
							onChange={(e) => updateFormValue("CustomerName", e.target.value)}
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

						{/* <label className="label mt-4">
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
						/> */}

						<label className="label mt-4">
							<span className="label-text">PaymentMethod</span>
						</label>
						<select
							type="text"
							placeholder=""
							value={ticketOrderObj.PaymentMethod}
							onChange={(e) => updateFormValue("PaymentMethod", e.target.value)}
							className="select select-bordered w-full"
						>
							{PAYMENT_METHOD.map((l, k) => (
								<option key={k} value={l}>
									{l}
								</option>
							))}
						</select>

						<label className="label mt-4">
							<span className="label-text">Status</span>
						</label>
						<select
							type="text"
							placeholder=""
							value={ticketOrderObj.Status}
							onChange={(e) => updateFormValue("Status", e.target.value)}
							className="select select-bordered w-full"
						>
							{STATUS.map((l, k) => (
								<option key={k} value={l}>
									{l}
								</option>
							))}
						</select>

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
							Save <span className={loading ? " loading" : ""}></span>
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
