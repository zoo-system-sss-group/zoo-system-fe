import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/common/Cards/TitleCard";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { showNotification } from "../common/headerSlice";
import EditSpecies from "./components/EditSpecies";
import AddSpecies from "./components/AddSpecies";
import { roleStaffAdmin } from "../../routes/author";
var user = JSON.parse(localStorage.getItem("loginInfo"));

function Species() {
	const dispatch = useDispatch();
	const [species, setSpecies] = useState();
	const [error, setError] = useState("");
	const [idSelect, setIdSelect] = useState();
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		isEnd: false,
	});

	//lay danh sach species
	const fetchSpeciesList = () => {
		axios
			.get(
				`odata/species?$filter=isDeleted eq false&$orderby=CreationDate desc&$skip=${
					(pagination.page - 1) * 10
				}&$top=${pagination.limit}`
			)
			.then((res) => {
				let species = res.data.value;
				if (!pagination.isEnd && species.length < pagination.limit)
					setPagination({ ...pagination, isEnd: true });
				else if (pagination.isEnd && species.length === pagination.limit)
					setPagination({ ...pagination, isEnd: false });
				setSpecies(species);
				setIdSelect(species[0]?.Id);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		fetchSpeciesList();
	}, [pagination]);

	const deleteSpecies = (index) => {
		axios
			.delete(`/odata/species/${index}`)
			.then((res) => {
				dispatch(
					showNotification({
						message: "Species deleted!",
						status: res.status,
					})
				);
				fetchSpeciesList();
			})
			.catch((err) => {
				dispatch(showNotification({ message: err.message, status: 400 }));
			});
	};

	return (
		<>
			<TitleCard
				title="Species table"
				topMargin="mt-2"
				TopSideButtons={roleStaffAdmin.includes(user.role) && <AddSpecies fetch={fetchSpeciesList} />}
			>
				<div className="overflow-x-auto w-full">
					{species != null ? (
						<div>
							<table className="table w-full">
								<thead>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Scientific Name</th>
										<th>Life Span</th>
										<th>Description</th>
										<th>Wild Diet</th>
										<th>Habitat</th>
										<th>Creation Date</th>
										<th>Modification Date</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{species.map((l, k) => {
										return (
											<tr key={k}>
												<td className="min-w-[3rem] max-w-[10rem] whitespace-normal">
													{l.Id}
												</td>
												<td>{l.Name}</td>
												<td>{l.ScientificName}</td>
												<td className="whitespace-nowrap">
													{l.LifeSpan > 1
														? `${l.LifeSpan} years`
														: `${l.LifeSpan} year`}
												</td>
												<td>{l.Description}</td>
												<td>{l.WildDiet}</td>
												<td>{l.Habitat}</td>
												<td>
													{moment(l.CreationDate).format("YYYY-MM-DD HH:mm:ss")}
												</td>
												<td>
													{moment(l.ModificationDate).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</td>
												<td className="flex">
													{roleStaffAdmin.includes(user.role) && (
														<>
															{/* Nut sua species */}
															<button
																className="btn btn-ghost inline"
																onClick={() => {
																	setIdSelect(l.Id);
																	document
																		.getElementById("btnEditSpecies")
																		.showModal();
																}}
															>
																<PencilSquareIcon className="w-5 text-cor3 stroke-2" />
															</button>

															{/* Nut doi status species */}
															<button
																className="btn btn-ghost inline"
																onClick={() => {
																	document
																		.getElementById("btnDeleteSpecies")
																		.showModal();
																	setIdSelect(l.Id);
																}}
															>
																<TrashIcon className="w-5 text-err stroke-2" />
															</button>
															<dialog id="btnDeleteSpecies" className="modal ">
																<div className="modal-box">
																	<h3 className="font-bold text-lg">Confirm</h3>
																	<p className="py-4 text-2xl">
																		Are you want to delete species "{l.Name}"?
																	</p>
																	<div className="modal-action">
																		<form method="dialog">
																			<button className="btn">Close</button>

																			<button
																				className="btn btn-primary ml-4"
																				onClick={() => deleteSpecies(idSelect)}
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
														</>
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							{idSelect && (
								<EditSpecies id={idSelect} fetch={fetchSpeciesList} />
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

export default Species;
