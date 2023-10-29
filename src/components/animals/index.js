import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/common/Cards/TitleCard";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { showNotification } from "../common/headerSlice";
import EditAnimal from "./components/EditAnimal";
import AddAnimal from "./components/AddAnimal";

function Animals() {
	const dispatch = useDispatch();
	const [animals, setAnimals] = useState();
	const [error, setError] = useState("");
	const [idSelect, setIdSelect] = useState(1);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		isEnd: false,
	});

	//lay danh sach animal
	const fetchAnimalList = () => {
		axios
			.get(
				`odata/animals?$filter=IsDeleted eq false&$orderby=CreationDate desc&$skip=${
					(pagination.page - 1) * 10
				}&$top=${pagination.limit}`
			)
			.then((res) => {
				let animals = res.data.value;
				if (!pagination.isEnd && animals.length < pagination.limit)
					setPagination({ ...pagination, isEnd: true });
				else if (pagination.isEnd && animals.length === pagination.limit)
					setPagination({ ...pagination, isEnd: false });
				setAnimals(animals);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		fetchAnimalList();
	}, [pagination]);

	const deleteAnimal = (index) => {
		axios
			.delete(`/odata/animals/${index}`)
			.then((res) => {
				dispatch(
					showNotification({
						message: "Animal deleted!",
						status: res.status,
					})
				);
				fetchAnimalList();
			})
			.catch((err) => {
				dispatch(showNotification({ message: err.message, status: 400 }));
			});
	};

	return (
		<>
			<TitleCard
				title="Animal table"
				topMargin="mt-2"
				TopSideButtons={<AddAnimal fetch={fetchAnimalList} />}
			>
				<div className="overflow-x-auto w-full">
					{animals != null ? (
						<div>
							<table className="table w-full">
								<thead>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Description</th>
										<th>Weight</th>
										<th>BirthDate</th>
										<th>SpeciesId</th>
										<th>CreationDate</th>
										<th>ModificationDate</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{animals.map((l, k) => {
										return (
											<tr key={k}>
												<td className="min-w-[3rem] max-w-[10rem] whitespace-normal">
													{l.Id}
												</td>
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
												<td>{l.Description}</td>
												<td>{l.Weight}</td>
												<td>{moment(l.BirthDate).format("yyyy-MM-DD")}</td>
												<td>{l.SpeciesId}</td>
												<td>
													{moment(l.CreationDate).format("YYYY-MM-DD HH:mm:ss")}
												</td>
												<td>
													{moment(l.ModificationDate).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</td>
												<td>
													{/* Nut sua animal */}
													<button
														className="btn btn-ghost inline"
														onClick={() => {
															setIdSelect(l.Id);
															document.getElementById("my_modal_1").showModal();
														}}
													>
														<PencilSquareIcon className="w-5 text-cor3 stroke-2" />
													</button>

													{/* Nut doi status animal */}
													<button
														className="btn btn-ghost inline"
														onClick={() => {
															document.getElementById("my_modal_2").showModal();
															setIdSelect(l.Id);
														}}
													>
														<TrashIcon className="w-5 text-err stroke-2" />
													</button>
													<dialog id="my_modal_2" className="modal ">
														<div className="modal-box">
															<h3 className="font-bold text-lg">Confirm</h3>
															<p className="py-4 text-2xl">
																Are you sure you want to delete animal {l.Name}?
															</p>
															<div className="modal-action">
																<form method="dialog">
																	<button className="btn">Close</button>

																	<button
																		className="btn btn-primary ml-4"
																		onClick={() => deleteAnimal(idSelect)}
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
							<EditAnimal id={idSelect} fetch={fetchAnimalList} />

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

export default Animals;
