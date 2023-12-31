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
import EditDietDetail from "./components/EditDietDetail";
import AddDietDetail from "./components/AddDietDetail";
import ViewDietDetail from "./components/ViewDietDetail";
import { roleStaffAdmin } from "../../routes/author";
const user = JSON.parse(localStorage.getItem("loginInfo"));
function DietDetails() {
	const dispatch = useDispatch();
	const [dietDetails, setDietDetails] = useState();
	const [error, setError] = useState("");
	const [search, setSearch] = useState("");
	const [idSelect, setIdSelect] = useState();
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		isEnd: false,
	});
	//lay danh sach dietDetail
	const fetchDietDetailList = () => {
		axios
			.get(
				search
					? `odata/dietdetails?$filter=isDeleted eq false and animalId eq ${search}&$orderby=CreationDate desc&$skip=${
							(pagination.page - 1) * 10
					  }&$top=${pagination.limit}&$expand=Animal,Diet`
					: `odata/dietdetails?$filter=isDeleted eq false&$orderby=CreationDate desc&$skip=${
							(pagination.page - 1) * 10
					  }&$top=${pagination.limit}&$expand=Animal,Diet`
			)
			.then((res) => {
				let dietDetails = res.data.value;
				if (!pagination.isEnd && dietDetails.length < pagination.limit)
					setPagination({ ...pagination, isEnd: true });
				else if (pagination.isEnd && dietDetails.length === pagination.limit)
					setPagination({ ...pagination, isEnd: false });
				setDietDetails(dietDetails);
				setIdSelect(dietDetails[0]?.Id);
			})
			.catch((err) => {
				if (err.response.status === 403)
					setError(`${user.role} is not allowed to view Diet Details`);
				else setError(err.message);
			});
	};

	useEffect(() => {
		fetchDietDetailList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination]);

	const deleteDietDetail = (index) => {
		axios
			.delete(`/odata/dietDetails/${index}`)
			.then((res) => {
				dispatch(
					showNotification({
						message: "Diet Detail deleted!",
						status: res.status,
					})
				);
				fetchDietDetailList();
			})
			.catch((err) => {
				dispatch(showNotification({ message: err.message, status: 400 }));
			});
	};

	return (
		<>
			<TitleCard
				title="Diet Detail table"
				topMargin="mt-2"
				searchInput={
					<div className="join">
						<input
							type="number"
							className="input input-bordered join-item w-48"
							placeholder="Search by Animal ID"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
						<div className="indicator">
							<button
								className="btn join-item"
								onClick={() => fetchDietDetailList()}
							>
								Search
							</button>
						</div>
					</div>
				}
				TopSideButtons={
					roleStaffAdmin.includes(user.role) && (
						<AddDietDetail fetch={fetchDietDetailList} />
					)
				}
			>
				<div className="overflow-x-auto w-full">
					{dietDetails != null ? (
						<div>
							<table className="table w-full">
								<thead>
									<tr>
										<th>ID</th>
										<th>Animal ID</th>
										<th>Animal Name</th>
										<th>Diet ID</th>
										<th>Diet Name</th>
										<th>Start Date</th>
										<th>End Date</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{dietDetails.map((l) => {
										return (
											<tr key={l.Id}>
												<td className="min-w-[3rem] max-w-[10rem] whitespace-normal">
													{l.Id}
												</td>
												<td>{l.AnimalId}</td>
												<td>{l.Animal.Name}</td>
												<td>{l.DietId}</td>
												<td>{l.Diet.DietName}</td>
												<td>
													{moment(l.StartDate).format("YYYY-MM-DD HH:mm:ss")}
												</td>
												<td>
													{l.EndDate ? (
														moment(l.EndDate).format("YYYY-MM-DD HH:mm:ss")
													) : (
														<span className="text-cor1 font-semibold">
															Not end yet
														</span>
													)}
												</td>
												<td className="flex">
													{/* Nut xem dietDetail */}
													<button
														className="btn btn-ghost inline w-14"
														onClick={() => {
															setIdSelect(l.Id);
															document
																.getElementById("btnViewDietDetail")
																.showModal();
														}}
													>
														<EyeIcon className="w-5 text-cor4 stroke-2" />
													</button>

													{/* Nut sua dietDetail */}
													{roleStaffAdmin.includes(user.role) && (
														<>
															{l.EndDate === null ? (
																<button
																	className="btn btn-ghost inline w-14"
																	onClick={() => {
																		setIdSelect(l.Id);
																		document
																			.getElementById("btnEditDietDetail")
																			.showModal();
																	}}
																>
																	<PencilSquareIcon className="w-5 text-cor3 stroke-2" />
																</button>
															) : (
																<div className="w-14"></div>
															)}

															{/* Nut xoa status dietDetail */}
															<button
																className="btn btn-ghost inline w-14"
																onClick={() => {
																	document
																		.getElementById("btnDeleteDietDetail")
																		.showModal();
																	setIdSelect(l.Id);
																}}
															>
																<TrashIcon className="w-5 text-err stroke-2" />
															</button>
														</>
													)}
													<dialog id="btnDeleteDietDetail" className="modal ">
														<div className="modal-box">
															<h3 className="font-bold text-lg">Confirm</h3>
															<p className="py-4 text-2xl">
																Are you want to delete this diet detail?
															</p>
															<div className="modal-action">
																<form method="dialog">
																	<button className="btn">Close</button>

																	<button
																		className="btn btn-primary ml-4"
																		onClick={() =>
																			roleStaffAdmin.includes(user.role) &&
																			deleteDietDetail(idSelect)
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
											</tr>
										);
									})}
								</tbody>
							</table>
							{idSelect && <ViewDietDetail id={idSelect} />}
							{roleStaffAdmin.includes(user.role) && idSelect && (
								<EditDietDetail id={idSelect} fetch={fetchDietDetailList} />
							)}

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

export default DietDetails;
