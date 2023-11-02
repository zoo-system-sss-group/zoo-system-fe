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
import EditTrainingDetail from "./components/EditTrainingDetail";
import AddTrainingDetail from "./components/AddTrainingDetail";
import ViewTrainingDetail from "./components/ViewTrainingDetail";
import { roleStaffAdmin } from "../../routes/author";
const user = JSON.parse(localStorage.getItem("loginInfo"));
const ROLE = {
	trainer: "Trainer",
	staff: "Staff",
};
function TrainingDetails() {
	const dispatch = useDispatch();
	const [trainingDetails, setTrainingDetails] = useState();
	const [error, setError] = useState("");
	const [idSelect, setIdSelect] = useState();
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		isEnd: false,
	});
	//lay danh sach trainingDetail
	const fetchTrainingDetailList = () => {
		axios
			.get(
				`odata/trainingdetails?$filter=isDeleted eq false&$orderby=CreationDate desc&$skip=${
					(pagination.page - 1) * 10
				}&$top=${pagination.limit}&$expand=animal,trainer`
			)
			.then((res) => {
				let trainingDetails = res.data.value;
				if (!pagination.isEnd && trainingDetails.length < pagination.limit)
					setPagination({ ...pagination, isEnd: true });
				else if (
					pagination.isEnd &&
					trainingDetails.length === pagination.limit
				)
					setPagination({ ...pagination, isEnd: false });
				setTrainingDetails(trainingDetails);
			})
			.catch((err) => {
				if (err.response.status === 403)
					setError(`${user.role} is not allowed to view TrainingDetails`);
				else setError(err.message);
			});
	};

	useEffect(() => {
		fetchTrainingDetailList();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination]);

	const deleteTrainingDetail = (index) => {
		axios
			.delete(`/odata/trainingDetails/${index}`)
			.then((res) => {
				dispatch(
					showNotification({
						message: "TrainingDetail deleted!",
						status: res.status,
					})
				);
				fetchTrainingDetailList();
			})
			.catch((err) => {
				dispatch(showNotification({ message: err.message, status: 400 }));
			});
	};

	return (
		<>
			<TitleCard
				title="TrainingDetail table"
				topMargin="mt-2"
				TopSideButtons={
					roleStaffAdmin.includes(user.role) && (
						<AddTrainingDetail fetch={fetchTrainingDetailList} />
					)
				}
			>
				<div className="overflow-x-auto w-full">
					{trainingDetails != null ? (
						<div>
							<table className="table w-full">
								<thead>
									<tr>
										<th>ID</th>
										<th>Trainer ID</th>
										<th>Trainer Name</th>
										<th>Animal ID</th>
										<th>Animal Name</th>
										<th>StartDate</th>
										<th>EndDate</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{trainingDetails.map((l) => {
										return (
											<tr key={l.Id}>
												<td className="min-w-[3rem] max-w-[10rem] whitespace-normal">
													{l.Id}
												</td>
												<td>{l.TrainerId}</td>
												<td>{l.Trainer.Fullname}</td>
												<td>{l.AnimalId}</td>
												<td>{l.Animal.Name}</td>
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
													{/* Nut xem trainingDetail */}
													<button
														className="btn btn-ghost inline w-14"
														onClick={() => {
															setIdSelect(l.Id);
															document
																.getElementById("btnViewTrainingDetail")
																.showModal();
														}}
													>
														<EyeIcon className="w-5 text-cor4 stroke-2" />
													</button>

													{/* Nut sua trainingDetail */}
													{roleStaffAdmin.includes(user.role) && (
														<>
															{l.EndDate === null ? (
																<button
																	className="btn btn-ghost inline w-14"
																	onClick={() => {
																		setIdSelect(l.Id);
																		document
																			.getElementById("btnEditTrainingDetail")
																			.showModal();
																	}}
																>
																	<PencilSquareIcon className="w-5 text-cor3 stroke-2" />
																</button>
															) : (
																<div className="w-14"></div>
															)}

															{/* Nut xoa status trainingDetail */}
															<button
																className="btn btn-ghost inline w-14"
																onClick={() => {
																	document
																		.getElementById("btnDeleteTrainingDetail")
																		.showModal();
																	setIdSelect(l.Id);
																}}
															>
																<TrashIcon className="w-5 text-err stroke-2" />
															</button>
														</>
													)}
													<dialog
														id="btnDeleteTrainingDetail"
														className="modal "
													>
														<div className="modal-box">
															<h3 className="font-bold text-lg">Confirm</h3>
															<p className="py-4 text-2xl">
																Are you want to delete trainingDetail "{l.Name}
																"?
															</p>
															<div className="modal-action">
																<form method="dialog">
																	<button className="btn">Close</button>

																	<button
																		className="btn btn-primary ml-4"
																		onClick={() =>
																			roleStaffAdmin.includes(user.role) &&
																			deleteTrainingDetail(idSelect)
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
							{idSelect && <ViewTrainingDetail id={idSelect} />}
							{roleStaffAdmin.includes(user.role) && idSelect && (
								<EditTrainingDetail
									id={idSelect}
									fetch={fetchTrainingDetailList}
								/>
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

export default TrainingDetails;
