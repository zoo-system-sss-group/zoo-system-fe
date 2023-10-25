import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/common/Cards/TitleCard";
import { NoSymbolIcon, PencilSquareIcon, EyeIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { showNotification } from "../common/headerSlice";
import EditArea from "./components/EditArea";
import AddArea from "./components/AddArea";
import ViewArea from "./components/ViewArea";

function Areas() {
	const dispatch = useDispatch();
	const [areas, setAreas] = useState();
	const [error, setError] = useState("");
	const [idSelect, setIdSelect] = useState(1);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		isEnd: false,
	});
	console.log("hello");
	//lay danh sach area
	const fetchAreaList = () => {
		axios
			.get(
				`odata/areas?$orderby=CreationDate desc&$skip=${
					(pagination.page - 1) * 10
				}&$top=${pagination.limit}`
			)
			.then((res) => {
				let areas = res.data.value;
				if (!pagination.isEnd && areas.length < pagination.limit)
					setPagination({ ...pagination, isEnd: true });
				else if (pagination.isEnd && areas.length === pagination.limit)
					setPagination({ ...pagination, isEnd: false });
				setAreas(areas);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		fetchAreaList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination]);

	const deactiveArea = (index) => {
		axios
			.delete(`/odata/areas/${index}`)
			.then((res) => {
				dispatch(
					showNotification({
						message: "Area deactive! - " + res.status,
						status: res.status,
					})
				);
				fetchAreaList();
			})
			.catch((err) => {
				dispatch(showNotification({ message: err.message, status: 400 }));
			});
	};

	const getStatus = (isDelete) => {
		if (isDelete === false)
			return <div className="badge badge-success">Active</div>;
		else return <div className="badge badge-error">Deactive</div>;
	};

	return (
		<>
			<TitleCard
				title="Area table"
				topMargin="mt-2"
				TopSideButtons={<AddArea fetch={fetchAreaList} />}
			>
				<div className="overflow-x-auto w-full">
					{areas != null ? (
						<div>
							<table className="table w-full">
								<thead>
									<tr>
										<th>ID</th>
										<th>Code</th>
										<th>Name</th>
										<th>Location</th>
										<th>Description</th>
										<th>Capacity</th>
										<th>CreationDate</th>
										<th>ModificationDate</th>
										<th>Status</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{areas.map((l, k) => {
										return (
											<tr key={k}>
												<td className="min-w-[3rem] max-w-[10rem] whitespace-normal">
													{l.Id}
												</td>
												<td>{l.Code}</td>
												<td>{l.Name}</td>
												<td>{l.Location}</td>
												<td>{l.Description}</td>
												<td>{l.Capacity}</td>
												<td>
													{moment(l.CreationDate).format("YYYY-MM-DD HH:mm:ss")}
												</td>
												<td>
													{moment(l.ModificationDate).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</td>
												<td>{getStatus(l.IsDeleted)}</td>
												<td>
													{/* Nut xem area */}
													<button
														className="btn btn-ghost inline"
														onClick={() => {
															setIdSelect(l.Id);
															document.getElementById("btnViewArea").showModal();
														}}
													>
														<EyeIcon className="w-5 text-cor4 stroke-2" />
													</button>

													{/* Nut sua area */}
													<button
														className="btn btn-ghost inline"
														onClick={() => {
															setIdSelect(l.Id);
															document.getElementById("my_modal_1").showModal();
														}}
													>
														<PencilSquareIcon className="w-5 text-cor3 stroke-2" />
													</button>

													{/* Nut doi status area */}
													<button
														className="btn btn-ghost inline"
														onClick={() => {
															document.getElementById("my_modal_2").showModal();
															setIdSelect(l.Id);
														}}
													>
														<NoSymbolIcon className="w-5 text-err stroke-2" />
													</button>
													<dialog id="my_modal_2" className="modal ">
														<div className="modal-box">
															<h3 className="font-bold text-lg">Confirm</h3>
															<p className="py-4">
																Are you sure you want to deactive this user?
															</p>
															<div className="modal-action">
																<form method="dialog">
																	<button className="btn">Close</button>

																	<button
																		className="btn btn-primary ml-4"
																		onClick={() => deactiveArea(idSelect)}
																	>
																		Deactive
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
							<ViewArea id={idSelect} />
							<EditArea id={idSelect} fetch={fetchAreaList} />

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

export default Areas;
