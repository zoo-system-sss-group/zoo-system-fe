import { useEffect, useState } from "react";
import moment from "moment";
import TitleCard from "../common/Cards/TitleCard";
import { FireIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
// import FeedAnimal from "./components/FeedAnimal";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import ReactDatePicker from "react-datepicker";
// import ViewDiet from "./components/ViewDiet";
// import AddDiet from "./components/AddDiet";
// import FeedAnimal from "./components/FeedAnimal";

function DietSchedule() {
	const dispatch = useDispatch();
	const [idSelect, setIdSelect] = useState();
	const loginInfoJSON = localStorage.getItem("loginInfo");
	const loginInfo = JSON.parse(loginInfoJSON);
	const [myTraining, setMyTraining] = useState([]);
	const [error, setError] = useState("");
	const [date, setDate] = useState(new Date());

	const fetchMyTrainingList = () => {
		axios
			.get(
				`odata/trainingdetails?filter=TrainerId eq ${loginInfo.id} and EndDate eq null&$expand=animal($expand=species,cageHistories($filter=EndDate eq null;$expand=cage))&$orderby=CreationDate desc`
			)
			.then((res) => {
				let myTraining = res.data.value;
				if (myTraining != null && myTraining.length > 0) {
					const feedHistoryPromises = myTraining.map((l) => {
						return axios.get(`odata/feedhistory?$filter=FeedingDate eq ${moment(date).format("YYYY-MM-DD")} and animalId eq ${l.AnimalId}`);
					});

					Promise.all(feedHistoryPromises)
						.then((feedHistoryResponses) => {
							feedHistoryResponses.forEach((res, index) => {
								myTraining[index].Diet = res.data.value;
							});

							setMyTraining(myTraining);
						})
						.catch((err) => {
							setError(err.message);
						});
				} else {
					setMyTraining(myTraining);
				}
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		fetchMyTrainingList();
	}, [date]);

	const feedAnimal = (feedId) => {
		axios
			.put(`api/feedhistory/${feedId}`)
			.then((res) => {
				dispatch(
					showNotification({
						message: "Feed successfully",
						status: res.status,
					})
				);
				fetchMyTrainingList();
			})
			.catch((err) => {
				dispatch(
					showNotification({
						message: "Feed unsuccessfully" + err,
						status: 404,
					})
				);
			});
	};

	return (
		<>
			<TitleCard
				title="Diet schedule"
				topMargin="mt-2"
				TopSideButtons={
					<ReactDatePicker
						className="input input-bordered w-full"
						dateFormat={"yyyy-MM-dd"}
						name="effectiveDate"
						selected={date}
						onChange={(date) => setDate(date)}
					/>
				}
			>
				<div className="overflow-x-auto w-full">
					{myTraining != null ? (
						<div>
							<table className="table w-full">
								<thead>
									<tr>
										<th>Animal ID</th>
										<th>Animal Name</th>
										<th>Schedule</th>
									</tr>
								</thead>
								<tbody>
									{myTraining.map((l, k) => {
										return (
											<tr key={k}>
												<td className="min-w-[3rem] max-w-[10rem] whitespace-normal">
													{l.AnimalId}
												</td>
												<td>
													<div className="flex items-center space-x-3">
														<div className="mask mask-squircle w-32 h-32">
															<img
																src={l.Animal?.Image ?? "../img/noimage.jpg"}
																alt="animal"
																className="aspect-square object-cover"
															/>
														</div>
														<div>
															<div className="font-bold text-xl">
																{l.Animal.Name}
															</div>
														</div>
													</div>
												</td>
												<td>
													{l.Diet !== null && l.Diet !== undefined && (
														<table className="table w-full">
															<thead>
																<tr>
																	<th>Slot</th>
																	<th>Feed Time</th>
																	<th>Diet ID</th>
																	<th>Status</th>
																	<th>Feed Action</th>
																</tr>
															</thead>
															<tbody>
																{l.Diet.map((feed, k) => (
																	<tr key={k}>
																		<td className="min-w-[1rem] max-w-[2rem] whitespace-normal">
																			{k + 1}
																		</td>
																		<td className="min-w-[3rem] max-w-[6rem] whitespace-normal">
																			{moment(feed.FeedingDate).format("HH:mm")}
																		</td>
																		<td className="min-w-[2rem] max-w-[3rem] whitespace-normal">
																			{feed.DietId}
																		</td>
																		<td className="min-w-[2rem] max-w-[3rem] whitespace-normal">
																			{feed.IsDeleted ? (
																				<span className="text-cor1">Fed</span>
																			) : (
																				<span className="text-err">
																					Not yet
																				</span>
																			)}
																		</td>
																		<td className="min-w-[2rem] max-w-[3rem] whitespace-normal">
																			{!feed.IsDeleted && (!moment(feed.FeedingDate).isBefore()) && (
																				<>
																					<button
																						className="btn btn-ghost inline"
																						onClick={() => {
																							setIdSelect(feed.Id);
																							document
																								.getElementById("btnFeed")
																								.showModal();
																						}}
																					>
																						<FireIcon className="w-6 text-cor1 stroke-2" />
																					</button>
																					<dialog
																						id="btnFeed"
																						className="modal "
																					>
																						<div className="modal-box">
																							<h3 className="font-bold text-lg">
																								Confirm
																							</h3>
																							<p className="py-4 text-2xl">
																								Have you already feed this
																								animal in this slot?
																							</p>
																							<div className="modal-action">
																								<form method="dialog">
																									<button className="btn">
																										Close
																									</button>

																									<button
																										className="btn btn-primary ml-4"
																										onClick={() =>
																											feedAnimal(idSelect)
																										}
																									>
																										Feed
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
																))}
															</tbody>
														</table>
													)}
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							{/* {idSelect && <ViewDiet id={idSelect} />}
							{idSelect && <AddDiet id={idSelect}  fetch={fetchMyTrainingList}/>} */}
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

export default DietSchedule;