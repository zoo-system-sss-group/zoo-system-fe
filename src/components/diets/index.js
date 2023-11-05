import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import TitleCard from "../common/Cards/TitleCard";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { showNotification } from "../common/headerSlice";
import EditDiet from "./components/EditDiet";
import AddDiet from "./components/AddDiet";
import { roleStaffAdmin } from "../../routes/author";

const user = JSON.parse(localStorage.getItem("loginInfo"));

function Diets() {
	const dispatch = useDispatch();
	const [diets, setDiets] = useState();
	const [search, setSearch] = useState("");
	const [error, setError] = useState("");
	const [idSelect, setIdSelect] = useState();
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		isEnd: false,
	});

	//lay danh sach diets
	const fetchDietList = () => {
		axios
			.get(
				`odata/diets?$filter=isDeleted eq false and (contains(tolower(DietName), '${search}') or contains(tolower(FoodName), '${search}'))&$orderby=CreationDate desc&$skip=${
					(pagination.page - 1) * 10
				}&$top=${pagination.limit}`
			)
			.then((res) => {
				let diets = res.data.value;
				if (!pagination.isEnd && diets.length < pagination.limit)
					setPagination({ ...pagination, isEnd: true });
				else if (pagination.isEnd && diets.length === pagination.limit)
					setPagination({ ...pagination, isEnd: false });
				setDiets(diets);
				setIdSelect(diets[0]?.Id);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		fetchDietList();
	}, [pagination]);

	const deleteDiet = (index) => {
		axios
			.delete(`/odata/diets/${index}`)
			.then((res) => {
				dispatch(
					showNotification({
						message: "Diet deleted!",
						status: res.status,
					})
				);
				fetchDietList();
			})
			.catch((err) => {
				dispatch(showNotification({ message: err.message, status: 400 }));
			});
	};

	return (
		<>
			<TitleCard
				title="Diet table"
				topMargin="mt-2"
				searchInput={
					<div className="join">
						<input
							className="input input-bordered join-item w-72"
							placeholder="Search by diet or food name"
							value={search}
							onChange={(e) => setSearch(e.target.value.toLowerCase())}
						/>
						<div className="indicator">
							<button
								className="btn join-item"
								onClick={() => fetchDietList()}
							>
								Search
							</button>
						</div>
					</div>
				}
				TopSideButtons={
					roleStaffAdmin.includes(user.role) && (
						<AddDiet fetch={fetchDietList} />
					)
				}
			>
				<div className="overflow-x-auto w-full">
					{diets != null ? (
						<div>
							<table className="table w-full">
								<thead>
									<tr>
										<th>ID</th>
										<th>Diet Name</th>
										<th>Food Name</th>
										<th>Quantity</th>
										<th>Unit</th>
										<th>Times Per Day</th>
										<th>Creation Date</th>
										<th>Modification Date</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{diets.map((l, k) => {
										return (
											<tr key={k}>
												<td className="min-w-[3rem] max-w-[10rem] whitespace-normal">
													{l.Id}
												</td>
												<td>{l.DietName}</td>
												<td>{l.FoodName}</td>
												<td>{l.Quantity}</td>
												<td>{l.Unit}</td>
												<td>{l.TimesPerDay}</td>
												<td>
													{moment(l.CreationDate).format("YYYY-MM-DD HH:mm:ss")}
												</td>
												<td>
													{moment(l.ModificationDate).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</td>
												{roleStaffAdmin.includes(user.role) && (
													<>
														<td className="flex">
															{/* Nut sua diets */}
															<button
																className="btn btn-ghost inline"
																onClick={() => {
																	setIdSelect(l.Id);
																	document
																		.getElementById("btnEditDiet")
																		.showModal();
																}}
															>
																<PencilSquareIcon className="w-5 text-cor3 stroke-2" />
															</button>

															{/* Nut doi status diets */}

															<button
																className="btn btn-ghost inline"
																onClick={() => {
																	document
																		.getElementById("btnDeleteDiet")
																		.showModal();
																	setIdSelect(l.Id);
																}}
															>
																<TrashIcon className="w-5 text-err stroke-2" />
															</button>
															<dialog id="btnDeleteDiet" className="modal ">
																<div className="modal-box">
																	<h3 className="font-bold text-lg">Confirm</h3>
																	<p className="py-4 text-2xl">
																		Are you want to delete diet "{l.DietName}"?
																	</p>
																	<div className="modal-action">
																		<form method="dialog">
																			<button className="btn">Close</button>

																			<button
																				className="btn btn-primary ml-4"
																				onClick={() =>
																					roleStaffAdmin.includes(user.role) &&
																					deleteDiet(idSelect)
																				}
																			>
																				Delete
																			</button>
																		</form>
																	</div>
																</div>
																<form
																	method="dialog"
																	className="modal-backdrop"
																>
																	<button>close</button>
																</form>
															</dialog>
														</td>
													</>
												)}
											</tr>
										);
									})}
								</tbody>
							</table>
							{roleStaffAdmin.includes(user.role) && idSelect && (
								<>
									<EditDiet id={idSelect} fetch={fetchDietList} />
								</>
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

export default Diets;
