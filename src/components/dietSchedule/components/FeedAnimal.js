import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";

function FeedAnimal({ fetch, myTraining }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [animalIds, setAnimalIds] = useState([]);

	const checkAnimalIdInList = (id) => {
		if (animalIds.includes(id)) {
			return true;
		}
		return false;
	};
	const changeAnimalIdInList = (id) => {
		if (animalIds.includes(id)) {
			const newAnimalIds = animalIds.filter((item) => item !== id);
			setAnimalIds(newAnimalIds);
		} else {
			setAnimalIds([...animalIds, id]);
		}
	};

	const saveNewTraining = () => {
		const feedHistories = [];
		animalIds.forEach((item) => {
			feedHistories.push({ animalId: item });
		});

		const data = JSON.stringify(feedHistories);
		setLoading(true);
		axios
			.post("odata/feedhistory", data)
			.then((res) => {
				document.getElementById("btnCloseAddTraining").click();
				dispatch(
					showNotification({
						message: "Feed successfully!",
						status: res.status,
					})
				);
				fetch();
			})
			.catch((err) => {
				return setErrorMessage(err.response.data.value);
			})
			.finally(() => {
				setAnimalIds([]);
				setLoading(false);
			});
	};

	return (
		<>
			<div className="inline-block float-right">
				<button
					className="btn px-6  normal-case btn-primary"
					onClick={() => document.getElementById("addTraining").showModal()}
				>
					Feed Animals
				</button>
				<dialog id="addTraining" className="modal ">
					<div className="modal-box">
						<h3 className="font-bold text-lg">Feed My Animals</h3>
						<div className="form-control w-full ">
							{myTraining ? (
								<div>
									<table className="table w-full">
										<thead>
											<tr>
												<th>AnimalId</th>
												<th>AnimalName</th>
												<th>Weight</th>
												<th>Height</th>
												<th>Feed</th>
											</tr>
										</thead>
										<tbody>
											{myTraining.map((l, k) => (
												<tr key={l.Id}>
													<td className="min-w-[3rem] max-w-[10rem] whitespace-normal">
														{l.AnimalId}
													</td>
													<td>
														<div className="flex items-center space-x-3">
															<div className="mask mask-squircle w-20 h-20">
																<img
																	className="aspect-square object-cover"
																	src={l.Animal?.Image ?? "../img/noimage.jpg"}
																	alt="animal"
																/>
															</div>
															<div>
																<div className="font-bold">{l.Animal.Name}</div>
															</div>
														</div>
													</td>
													<td>{l.Animal?.Weight}</td>
													<td>{l.Animal?.Height}</td>
													<td>
														<input
															type="checkbox"
															checked={checkAnimalIdInList(l.AnimalId)}
															onChange={() => changeAnimalIdInList(l.AnimalId)}
															className="checkbox checkbox-primary"
														/>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							) : (
								""
							)}
							<div className="text-err text-lg">{errorMessage}</div>
						</div>
						<div className="modal-action">
							<form method="dialog">
								<button id="btnCloseAddTraining" className="btn">
									Close
								</button>
							</form>

							<button
								className="btn btn-primary ml-4"
								onClick={() => saveNewTraining()}
							>
								Feed <span className={loading ? " loading" : ""}></span>
							</button>
						</div>
					</div>
					<form method="dialog" className="modal-backdrop">
						<button>close</button>
					</form>
				</dialog>
			</div>
		</>
	);
}

export default FeedAnimal;
