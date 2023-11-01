import { useEffect, useState } from "react";
import moment from "moment";
import TitleCard from "../common/Cards/TitleCard";
import { EyeIcon, PlusCircleIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import ViewDiet from "./components/ViewDiet";
import AddDiet from "./components/AddDiet";

function MyTraining() {
	const [myTraining, setMyTraining] = useState();
	const [error, setError] = useState("");
	const [idSelect, setIdSelect] = useState(1);

	const loginInfoJSON = localStorage.getItem("loginInfo");
	const loginInfo = JSON.parse(loginInfoJSON);

	//lay danh sach myTraining
	const fetchMyTrainingList = () => {
		axios
			.get(
				`odata/myTrainingdetails?filter=TrainerId eq ${loginInfo.id} and EndDate eq null&$expand=animal($expand=species,cageHistories($filter=EndDate eq null;$expand=cage))&$orderby=CreationDate desc`
			)
			.then((res) => {
				let myTraining = res.data.value;
				setMyTraining(myTraining);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		fetchMyTrainingList();
	}, []);

	return (
		<>
			<TitleCard
				title="MyTraining table"
				topMargin="mt-2"
			>
				<div className="overflow-x-auto w-full">
					{myTraining != null ? (
						<div>
							<table className="table w-full">
								<thead>
									<tr>
										<th>AnimalId</th>
										<th>AnimalName</th>
										<th>Description</th>
										<th>Weight</th>
										<th>Height</th>
										<th>BirthDate</th>
										<th>Status</th>
										<th>Species</th>
										<th>Cage Recent</th>
										<th>StartDate</th>
										<th>EndDate</th>
										<th></th>
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
														<div className="mask mask-squircle w-20 h-20">
															<img
																src={l.Animal?.Image ?? "../img/noimage.jpg"}
																alt="animal"
															/>
														</div>
														<div>
															<div className="font-bold">{l.Animal.Name}</div>
														</div>
													</div>
												</td>
												<td>{l.Animal?.Description}</td>
												<td>{l.Animal?.Weight}</td>
												<td>{l.Animal?.Height}</td>
												<td>{moment(l.Animal?.BirthDate).format("YYYY-MM-DD")}</td>
												<td>{l.Animal?.Status}</td>
												<td>{l.Animal?.Species.Name}</td>
												<td>{l.Animal?.CageHistories[0]?.Cage.Name}</td>
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
													{/* Nut xem account */}
													<button
														className="btn btn-ghost inline"
														onClick={() => {
															setIdSelect(l.Id);
															document
																.getElementById("btnViewDiet")
																.showModal();
														}}
													>
														<EyeIcon className="w-5 text-cor4 stroke-2" />
													</button>
													
													{/* Nut them diet */}
													<button
														className="btn btn-ghost inline"
														onClick={() => {
															setIdSelect(l.Id);
															document
																.getElementById("btnAddDiet")
																.showModal();
														}}
													>
														<PlusCircleIcon className="w-6 text-cor1 stroke-2" />
													</button>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							<ViewDiet id={idSelect} />
							<AddDiet id={idSelect}  fetch={fetchMyTrainingList}/>
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

export default MyTraining;
