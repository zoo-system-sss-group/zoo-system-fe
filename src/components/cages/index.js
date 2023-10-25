import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import TitleCard from "../common/Cards/TitleCard";
import {
	TrashIcon,
	PencilSquareIcon,
	EyeIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { showNotification } from "../common/headerSlice";
import EditCage from "./components/EditCage";
import AddCage from "./components/AddCage";
import ViewCage from "./components/ViewCage";

function Cages() {
	const dispatch = useDispatch();
	const [cages, setCages] = useState();
	const [error, setError] = useState("");
	const [idSelect, setIdSelect] = useState(1);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		isEnd: false,
	});
	//lay danh sach cage
	const fetchCageList = () => {
		axios
			.get(
				`odata/cages?$filter=isDeleted eq false&$orderby=CreationDate desc&$skip=${
					(pagination.page - 1) * 10
				}&$top=${pagination.limit}`
			)
			.then((res) => {
				let cages = res.data.value;
				if (!pagination.isEnd && cages.length < pagination.limit)
					setPagination({ ...pagination, isEnd: true });
				else if (pagination.isEnd && cages.length === pagination.limit)
					setPagination({ ...pagination, isEnd: false });
				setCages(cages);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		fetchCageList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination]);

	const deleteCage = (index) => {
		axios
			.delete(`/odata/cages/${index}`)
			.then((res) => {
				dispatch(
					showNotification({
						message: "Cage deleted!",
						status: res.status,
					})
				);
				fetchCageList();
			})
			.catch((err) => {
				dispatch(showNotification({ message: err.message, status: 400 }));
			});
	};

	return (
		<>
			<TitleCard
				title="Cage table"
				topMargin="mt-2"
				TopSideButtons={<AddCage fetch={fetchCageList} />}
			>
				<div className="overflow-x-auto w-full">
					{cages != null ? (
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
										<th>Area ID</th>
										<th>CreationDate</th>
										<th>ModificationDate</th>
										{/* <th>Status</th> */}
										<th></th>
									</tr>
								</thead>
								<tbody>
									{cages.map((l, k) => {
										return (
											<tr key={k}>
												<td className="min-w-[3rem] max-w-[10rem] whitespace-normal">
													{l.Id}
												</td>
												<td>{l.Code}</td>
												<td>
													<div className="flex items-center space-x-3">
														<div className="avatar">
															<div className="mask mask-squircle w-12 h-12">
																<img
																	src={l.Image ? l.Image : "../img/noimage.jpg"}
																	alt="Avatar"
																/>
															</div>
														</div>
														<div>
															<div className="font-bold">{l.Name}</div>
														</div>
													</div>
												</td>
												<td>{l.Location}</td>
												<td>{l.Description}</td>
												<td>{l.Capacity}</td>
												<td>{l.AreaId}</td>
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
													{/* Nut xem cage */}
													<button
														className="btn btn-ghost inline"
														onClick={() => {
															setIdSelect(l.Id);
															document
																.getElementById("btnViewCage")
																.showModal();
														}}
													>
														<EyeIcon className="w-5 text-cor4 stroke-2" />
													</button>

													{/* Nut sua cage */}
													<button
														className="btn btn-ghost inline"
														onClick={() => {
															setIdSelect(l.Id);
															document
																.getElementById("btnEditCage")
																.showModal();
														}}
													>
														<PencilSquareIcon className="w-5 text-cor3 stroke-2" />
													</button>

													{/* Nut doi status cage */}
													<button
														className="btn btn-ghost inline"
														onClick={() => {
															document
																.getElementById("btnDeleteCage")
																.showModal();
															setIdSelect(l.Id);
														}}
													>
														<TrashIcon className="w-5 text-err stroke-2" />
													</button>
													<dialog id="btnDeleteCage" className="modal ">
														<div className="modal-box">
															<h3 className="font-bold text-lg">Confirm</h3>
															<p className="py-4 text-2xl">
																Are you want to delete cage "{l.Name}"?
															</p>
															<div className="modal-action">
																<form method="dialog">
																	<button className="btn">Close</button>

																	<button
																		className="btn btn-primary ml-4"
																		onClick={() => deleteCage(idSelect)}
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
							<ViewCage id={idSelect} />
							<EditCage id={idSelect} fetch={fetchCageList} />

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

export default Cages;
