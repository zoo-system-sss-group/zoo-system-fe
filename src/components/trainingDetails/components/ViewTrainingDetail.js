import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";

const INITIAL_TRAININGDETAIL_OBJ = {
	Id: "",
	TrainerId: "",
	AnimalId: "",
	StartDate: "",
	EndDate: "",
	CreationDate: "",
	DeletionDate: "",
	IsDeleted: false,
	Animal: {
		Name: "",
		Image: ""},
	Trainer: {
		Fullname: "",
		Avatar: ""
	},
};

function ViewTrainingDetail({ id }) {
	const [trainingDetailObj, setTrainingDetailObj] = useState(
		INITIAL_TRAININGDETAIL_OBJ
	);

	useEffect(() => {
		axios
			.get(`odata/trainingdetails/${id}?$expand=animal,trainer`)
			.then((res) => {
				setTrainingDetailObj({
					...INITIAL_TRAININGDETAIL_OBJ,
					...res.data.value[0],
				});
			});
	}, [id]);

	return (
		<>
			<dialog id="btnViewTrainingDetail" className="modal ">
				<div className="modal-box max-w-2xl">
					<h3 className="font-bold text-lg">
						Training Detail information details
					</h3>

					<div className="form-control w-full">
						<div className="flex w-full">
							<div className="w-full">
								<label className="label">
									<span className="label-text">Trainer ID</span>
								</label>
								<input
									type="text"
									value={trainingDetailObj.TrainerId}
									className="input input-bordered w-full "
									disabled
								/>

								<label className="label mt-4">
									<span className="label-text">Trainer Name</span>
								</label>
								<input
									type="text"
									value={trainingDetailObj.Trainer.Fullname}
									className="input input-bordered w-full "
									disabled
								/>

								<label className="label mt-4">
									<span className="label-text">Trainer Avatar</span>
								</label>
								<img
									src={trainingDetailObj.Trainer?.Avatar ?? "../img/user.png"}
									alt="trainingDetail"
									className="mt-2 border rounded-lg aspect-square object-cover"
								/>
							</div>
							<div className="divider divider-horizontal">Train</div>
							<div className="w-full">
								<label className="label">
									<span className="label-text">Animal ID</span>
								</label>
								<input
									type="text"
									value={trainingDetailObj.AnimalId}
									className="input input-bordered w-full "
									disabled
								/>

								<label className="label mt-4">
									<span className="label-text">Animal Name</span>
								</label>
								<input
									type="text"
									value={trainingDetailObj.Animal.Name}
									className="input input-bordered w-full"
									disabled
								/>

								<label className="label mt-4">
									<span className="label-text">Animal Image</span>
								</label>
								<img
									src={trainingDetailObj.Animal.Image ?? "../img/noimage.jpg"}
									alt="trainingDetail"
									className="mt-2 border rounded-lg aspect-square object-cover"
								/>
							</div>
						</div>

						<div className="flex gap-2">
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">Start Date</span>
								</label>
								<input
									type="text"
									value={moment(trainingDetailObj.StartDate).format(
										"YYYY-mm-DD hh:mm:ss"
									)}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">End Date</span>
								</label>
								<input
									type="text"
									value={
										trainingDetailObj.EndDate
											? moment(trainingDetailObj.EndDate).format(
													"YYYY-mm-DD hh:mm:ss"
											  )
											: "Not end yet"
									}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
						</div>
						<div className="flex gap-2">
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">Creation Date</span>
								</label>
								<input
									type="text"
									value={moment(trainingDetailObj.CreationDate).format(
										"YYYY-mm-DD hh:mm:ss"
									)}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">Modification Date</span>
								</label>
								<input
									type="text"
									value={
										trainingDetailObj.ModificationDate
											? moment(trainingDetailObj.ModificationDate).format(
													"YYYY-mm-DD hh:mm:ss"
											  )
											: ""
									}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
						</div>

						<div className="flex gap-2">
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">Deletion Date</span>
								</label>
								<input
									type="text"
									value={
										trainingDetailObj.DeletionDate
											? trainingDetailObj.DeletionDate
											: ""
									}
									className="input input-bordered w-full"
									disabled
								/>

							</div>
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">Is Deleted</span>
								</label>
								<input
									type="text"
									value={trainingDetailObj.IsDeleted}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
						</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseViewTrainingDetail" className="btn">
								Close
							</button>
						</form>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default ViewTrainingDetail;
