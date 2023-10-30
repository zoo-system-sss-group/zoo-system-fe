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

function TicketOrders() {
	const dispatch = useDispatch();
	const [ticketOrders, setTicketOrders] = useState();
	const [error, setError] = useState("");
	const [idSelect, setIdSelect] = useState(1);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		isEnd: false,
	});
	//lay danh sach ticketOrder
	const fetchTicketOrderList = () => {
		axios
			.get(
				`odata/ticketorders?$filter=isDeleted eq false&$orderby=CreationDate desc&$skip=${
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
			})
			.catch((err) => {
				setError(err.message);
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

	return (
		<>
			<TitleCard
				title="Ticket Order table"
				topMargin="mt-2"
				TopSideButtons={<AddTicketOrder fetch={fetchTicketOrderList} />}
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
												<td>{l.PaymentMethod}</td>
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
												{/* <td>{getStatus(l.IsDeleted)}</td> */}
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
													<dialog id="btnDeleteTicketOrder" className="modal ">
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
																		onClick={() => deleteTicketOrder(idSelect)}
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
