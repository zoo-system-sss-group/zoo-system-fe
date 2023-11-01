import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/common/Cards/TitleCard";
import {
	TrashIcon,
	PencilSquareIcon,
	EyeIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { showNotification } from "../common/headerSlice";
import EditTicketOrder from "./components/EditTicketOrder";
import AddTicketOrder from "./components/AddTicketOrder";
import ViewTicketOrder from "./components/ViewTicketOrder";
var user = JSON.parse(localStorage.getItem("loginInfo"));
function TicketOrders() {
	const dispatch = useDispatch();
	const [ticketOrders, setTicketOrders] = useState();
	const [error, setError] = useState("");
	const [search, setSearch] = useState("");
	const [idSelect, setIdSelect] = useState();
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		isEnd: false,
	});
	//lay danh sach ticketOrder
	const fetchTicketOrderList = () => {
		axios
			.get(
				`odata/ticketorders?$filter=isDeleted eq false and (contains(tolower(CustomerName), '${search}') or contains(tolower(Email), '${search}') or contains(PhoneNumber, '${search}'))&$orderby=CreationDate desc&$skip=${
					(pagination.page - 1) * 10
				}&$top=${pagination.limit}`
			)
			.then((res) => {
				let ticketOrders = res.data.value;
				if (!pagination.isEnd && ticketOrders.length < pagination.limit)
					setPagination({ ...pagination, isEnd: true });
				else if (pagination.isEnd && ticketOrders.length === pagination.limit)
					setPagination({ ...pagination, isEnd: false });
				setTicketOrders(ticketOrders);
				setIdSelect(ticketOrders[0].Id);
			})
			.catch((err) => {
				if (err.response && err.response.status === 403)
					setError(`${user.role} Is Not Allowed to view Ticket Orders!`);
				else setError(err.message);
			});
	};

	useEffect(() => {
		fetchTicketOrderList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination]);

	const deleteTicketOrder = (index) => {
		axios
			.delete(`/odata/ticketOrders/${index}`)
			.then((res) => {
				dispatch(
					showNotification({
						message: "Ticket Order deleted!",
						status: res.status,
					})
				);
				fetchTicketOrderList();
			})
			.catch((err) => {
				dispatch(showNotification({ message: err.message, status: 400 }));
			});
	};

	const getPaymentMethod = (paymentMethod) => {
		if (paymentMethod === "ZaloPay")
			return <div className="badge badge-info">{paymentMethod}</div>;
		if (paymentMethod === "Momo")
			return (
				<div className="badge badge-info bg-[#d82d8b] text-white">
					{paymentMethod}
				</div>
			);
		return <div className="badge badge-error">{paymentMethod}</div>;
	};

	const getStatus = (status) => {
		if (status === "Waiting")
			return <div className="badge badge-info">{status}</div>;
		if (status === "Success")
			return <div className="badge badge-success">{status}</div>;
		if (status === "Cancel")
			return <div className="badge badge-error">{status}</div>;
		return <div className="badge badge-warning">{status}</div>;
	};

	return (
		<>
			<TitleCard
				title="Ticket Order table"
				topMargin="mt-2"
				searchInput={
					<div className="join">
						<input
							className="input input-bordered join-item w-96"
							placeholder="Search by Name, Email or PhoneNumber"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<div className="indicator">
							<button
								className="btn join-item"
								onClick={() => fetchTicketOrderList()}
							>
								Search
							</button>
						</div>
					</div>
				}
				TopSideButtons={
					user.role === "Staff" && (
						<AddTicketOrder fetch={fetchTicketOrderList} />
					)
				}
			>
				<div className="overflow-x-auto w-full">
					{ticketOrders != null ? (
						<div>
							<table className="table w-full">
								<thead>
									<tr>
										<th>ID</th>
										<th>Code</th>
										<th>CustomerName</th>
										<th>Email</th>
										<th>PhoneNumber</th>
										<th>EffectiveDate</th>
										<th>PaymentMethod</th>
										<th>TotalTicket</th>
										<th>TotalMoney</th>
										<th>CreationDate</th>
										<th>ModificationDate</th>
										<th>Status</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{ticketOrders.map((l, k) => {
										return (
											<tr key={k}>
												<td className="min-w-[3rem] max-w-[6rem] whitespace-normal">
													{l.Id}
												</td>
												<td>{l.Code}</td>
												<td>{l.CustomerName}</td>
												<td>{l.Email}</td>
												<td>{l.PhoneNumber}</td>
												<td>
													{moment(l.EffectiveDate).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</td>
												<td>{getPaymentMethod(l.PaymentMethod)}</td>
												<td>{l.TotalTicket}</td>
												<td>{l.TotalMoney}</td>
												<td>
													{moment(l.CreationDate).format("YYYY-MM-DD HH:mm:ss")}
												</td>
												<td>
													{moment(l.ModificationDate).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</td>
												<td>{getStatus(l.Status)}</td>
												{user.role === "Staff" && (
													<td className="flex">
														{/* Nut xem ticketOrder */}
														<button
															className="btn btn-ghost inline"
															onClick={() => {
																setIdSelect(l.Id);
																document
																	.getElementById("btnViewTicketOrder")
																	.showModal();
															}}
														>
															<EyeIcon className="w-5 text-cor4 stroke-2" />
														</button>

														{/* Nut sua ticketOrder */}
														<button
															className="btn btn-ghost inline"
															onClick={() => {
																setIdSelect(l.Id);
																document
																	.getElementById("btnEditTicketOrder")
																	.showModal();
															}}
														>
															<PencilSquareIcon className="w-5 text-cor3 stroke-2" />
														</button>

														{/* Nut doi status ticketOrder */}
														<button
															className="btn btn-ghost inline"
															onClick={() => {
																document
																	.getElementById("btnDeleteTicketOrder")
																	.showModal();
																setIdSelect(l.Id);
															}}
														>
															<TrashIcon className="w-5 text-err stroke-2" />
														</button>
														<dialog
															id="btnDeleteTicketOrder"
															className="modal "
														>
															<div className="modal-box">
																<h3 className="font-bold text-lg">Confirm</h3>
																<p className="py-4 text-2xl">
																	Are you want to delete ticketOrder "{l.Name}"?
																</p>
																<div className="modal-action">
																	<form method="dialog">
																		<button className="btn">Close</button>

																		<button
																			className="btn btn-primary ml-4"
																			onClick={() =>
																				deleteTicketOrder(idSelect)
																			}
																		>
																			Delete
																		</button>
																	</form>
																</div>
															</div>
															<form method="dialog" className="modal-backdrop">
																<button>close</button>
															</form>
														</dialog>
													</td>
												)}
											</tr>
										);
									})}
								</tbody>
							</table>
							<ViewTicketOrder id={idSelect} />
							<EditTicketOrder id={idSelect} fetch={fetchTicketOrderList} />

							<div className="w-full flex justify-center">
								<div className="join">
									<button
										className="join-item btn"
										onClick={() => {
											if (pagination.page > 1)
												setPagination({
													...pagination,
													page: pagination.page - 1,
												});
										}}
									>
										«
									</button>
									<button className="join-item btn">
										Page {pagination.page}
									</button>
									<button
										className="join-item btn"
										onClick={() => {
											if (!pagination.isEnd)
												setPagination({
													...pagination,
													page: pagination.page + 1,
												});
										}}
									>
										»
									</button>
								</div>
							</div>
						</div>
					) : (
						<div className="w-full h-96 flex justify-center items-center text-err font-bold text-3xl">
							{error}
						</div>
					)}
				</div>
			</TitleCard>
		</>
	);
}

export default TicketOrders;
