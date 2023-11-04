import { useState } from "react";
import { formatVndCurrency } from "../../../utils/MyUtils";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";

const INITIAL_ACCOUNT_OBJ = {
	Id: "",
	Code: "",
	CustomerName: "",
	Email: "",
	PhoneNumber: "",
	EffectiveDate: "",
	PaymentMethod: "",
	TotalMoney: 0,
	TotalTicket: 0,
	Status: "",
	CreationDate: "",
	ModificationDate: "",
	DeletionDate: "",
	IsDeleted: false,
	Tickets: [],
};

function ViewTicketOrder({ id }) {
	const [errorMessage, setErrorMessage] = useState("");
	const [ticketOrderObj, setTicketOrderObj] = useState(INITIAL_ACCOUNT_OBJ);
	useEffect(() => {
		if (id !== null) {
			axios.get(`odata/ticketOrders(${id})?$expand=tickets`).then((res) => {
				setTicketOrderObj({
					...ticketOrderObj,
					...res.data,
				});
			});
		}
	}, [id]);

	return (
		<>
			<dialog id="btnViewTicketOrder" className="modal ">
				<div className="modal-box max-w-2xl">
					<h3 className="font-bold text-lg">TicketOrder information details</h3>
					<div className="form-control w-full ">
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
							value={ticketOrderObj.Code}
							className="input input-bordered w-full "
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">CustomerName</span>
						</label>
						<input
							type="text"
							value={ticketOrderObj.CustomerName}
							className="input input-bordered w-full"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">Email</span>
						</label>
						<input
							type="email"
							value={ticketOrderObj.Email}
							className="input input-bordered w-full"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">PhoneNumber</span>
						</label>
						<input
							type="text"
							value={ticketOrderObj.PhoneNumber}
							className="input input-bordered w-full"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">EffectiveDate</span>
						</label>
						<input
							type="text"
							value={moment(ticketOrderObj.EffectiveDate).format(
								"YYYY-mm-DD hh:mm:ss"
							)}
							className="input input-bordered w-full"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">PaymentMethod</span>
						</label>
						<input
							type="text"
							value={ticketOrderObj.PaymentMethod}
							className="input input-bordered w-full"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">TotalMoney</span>
						</label>
						<input
							type="text"
							value={formatVndCurrency(ticketOrderObj.TotalMoney)}
							className="input input-bordered w-full"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">TotalTicket</span>
						</label>
						<input
							type="number"
							value={ticketOrderObj.TotalTicket}
							className="input input-bordered w-full"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">Status</span>
						</label>
						<input
							type="text"
							value={ticketOrderObj.Status}
							className="input input-bordered w-full"
							disabled
						/>
						{ticketOrderObj.Tickets ? (
							<>
								<label className="label mt-4">
									<span className="label-text">Tickets</span>
								</label>
								<table className="table">
									<thead>
										<tr>
											<th>Code</th>
											<th>TicketType</th>
											<th>Price</th>
											<th>IsActive</th>
										</tr>
									</thead>
									<tbody>
										{ticketOrderObj.Tickets.map((ticket) => (
											<tr key={ticket.Id}>
												<th>{ticket.Code}</th>
												<td>{ticket.TicketType}</td>
												<td>{formatVndCurrency(ticket.Price)}</td>
												<td>{ticket.IsActive ? "Active" : "Deactive"}</td>
											</tr>
										))}
									</tbody>
								</table>
							</>
						) : (
							""
						)}

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
									value={
										ticketOrderObj.DeletionDate
											? ticketOrderObj.DeletionDate
											: ""
									}
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
