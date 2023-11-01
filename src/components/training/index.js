import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import TitleCard from "../common/Cards/TitleCard";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { showNotification } from "../common/headerSlice";
import EditTraining from "./components/EditTraining";
import AddTraining from "./components/AddTraining";

function Training() {
	const dispatch = useDispatch();
	const [training, setTraining] = useState();
	const [error, setError] = useState("");
	const [idSelect, setIdSelect] = useState(1);

	const loginInfoJSON = localStorage.getItem("loginInfo");
	const loginInfo = JSON.parse(loginInfoJSON);

	//lay danh sach training
	const fetchTrainingList = () => {
		axios
			.get(
				`odata/trainingdetails?filter=TrainerId eq ${loginInfo.id} and EndDate eq null&$expand=animal&$orderby=CreationDate desc`
			)
			.then((res) => {
				let training = res.data.value;
				setTraining(training);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		fetchTrainingList();
	}, []);

	const deleteTraining = (index) => {
		axios
			.delete(`/odata/training/${index}`)
			.then((res) => {
				dispatch(
					showNotification({
						message: "Training deleted!",
						status: res.status,
					})
				);
				fetchTrainingList();
			})
			.catch((err) => {
				dispatch(showNotification({ message: err.message, status: 400 }));
			});
	};

	return (
		<>
			<TitleCard
				title="Training table"
				topMargin="mt-2"
				TopSideButtons={<AddTraining fetch={fetchTrainingList} />}
			>
				<div className="overflow-x-auto w-full">
					{training != null ? (
						<div>
							<table className="table w-full">
								<thead>
									<tr>
										<th>AnimalId</th>
										<th>AnimalName</th>
										<th>Status</th>
										<th>StartDate</th>
										<th>EndDate</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{training.map((l, k) => {
										return (
											<tr key={k}>
												<td className="min-w-[3rem] max-w-[10rem] whitespace-normal">
													{l.AnimalId}
												</td>
												<td>
													<div className="flex items-center space-x-3">
														<div className="mask mask-squircle w-20 h-20">
															<img
																src={l.Animal?.Image ?? "../img/user.png"}
																alt="animal"
															/>
														</div>
														<div>
															<div className="font-bold">{l.Animal.Name}</div>
														</div>
													</div>
												</td>
												<td>{l.Animal?.Status}</td>
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
													{/* Nut sua training */}
													<button
														className="btn btn-ghost inline"
														onClick={() => {
															setIdSelect(l.Id);
															document
																.getElementById("btnEditTraining")
																.showModal();
														}}
													>
														<PencilSquareIcon className="w-5 text-cor3 stroke-2" />
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							{/* <EditTraining id={idSelect} fetch={fetchTrainingList} /> */}
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

export default Training;
