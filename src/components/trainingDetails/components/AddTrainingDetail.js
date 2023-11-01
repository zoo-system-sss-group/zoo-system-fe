import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { FirebaseImageUpload } from "../../../FirebaseImageUpload/FirebaseImageUpload";

const INITIAL_CAGE_OBJ = {
	Code: "",
	Name: "",
	Location: "",
	Description: "",
	Capacity: 1,
	Image: "",
	AreaId: 0,
};

function AddTrainingDetail({ fetch }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [trainingDetailObj, setTrainingDetailObj] = useState(INITIAL_CAGE_OBJ);
	const [areaObj, setAreaObj] = useState([]);
	const [img, setImg] = useState(null);

	useEffect(() => {
		axios
			.get(`odata/areas?$filter=isDeleted eq false&$select=Id,Code,Name`)
			.then((res) => {
				let arr = Object.values(res.data.value);
				setAreaObj([...arr]);
				trainingDetailObj.AreaId = arr[0].Id;
			});
	}, []);

	const saveNewTrainingDetail = async () => {
		if (trainingDetailObj.Code.trim() === "") return setErrorMessage("Code is required!");
		if (trainingDetailObj.Name.trim() === "") return setErrorMessage("Name is required!");
		if (trainingDetailObj.Location.trim() === "")
			return setErrorMessage("Location is required!");
		if (trainingDetailObj.Description.trim() === "")
			return setErrorMessage("Description is required!");
		if (trainingDetailObj.Capacity <= 0)
			return setErrorMessage("Capacity must be greater than 0!");

		setLoading(true);
		if (img !== null) {
			try {
				const url = await FirebaseImageUpload({ folder: "trainingDetails", img: img });
				trainingDetailObj.Image = url;
				uploadTrainingDetailData();
			} catch (err) {
				var msg = err?.response?.data?.value;
				if (msg === undefined) msg = "Something go wrong!";
				setErrorMessage(msg);
			}
		} else {
			uploadTrainingDetailData();
		}
		setLoading(false);
	};

	const uploadTrainingDetailData = () => {
		let newTrainingDetailObj = {
			Code: trainingDetailObj.Code,
			Name: trainingDetailObj.Name,
			Location: trainingDetailObj.Location,
			Description: trainingDetailObj.Description,
			Capacity: trainingDetailObj.Capacity,
			Image: trainingDetailObj.Image,
			AreaId: trainingDetailObj.AreaId,
		};

		const data = JSON.stringify(newTrainingDetailObj);
		axios
			.post("odata/trainingDetails", data)
			.then((res) => {
				document.getElementById("btnCloseAddTrainingDetail").click();
				dispatch(
					showNotification({
						message: "New TrainingDetail Added!",
						status: res.status,
					})
				);
				fetch();
			})
			.catch((err) => {
				var msg = err?.response?.data?.value;
				if (msg === undefined) msg = err.message;
				setErrorMessage(msg);
			})
			.finally(() => {
				setTrainingDetailObj(INITIAL_CAGE_OBJ);
				setImg(null);
			});
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setTrainingDetailObj({ ...trainingDetailObj, [updateType]: value });
	};

	const onImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setImg(e.target.files[0]);
		}
	};

	return (
		<>
			<div className="inline-block float-right">
				<button
					className="btn px-6  normal-case btn-primary"
					onClick={() => document.getElementById("btnAddTrainingDetail").showModal()}
				>
					Add New
				</button>
				<dialog id="btnAddTrainingDetail" className="modal">
					<div className="modal-box max-w-2xl">
						<h3 className="font-bold text-2xl">Add new trainingDetail</h3>
						<div className="form-control w-full grid grid-cols-2 gap-6">
							<div className="">
								<label className="label mt-4">
									<span className="label-text">Code</span>
								</label>
								<input
									type="text"
									placeholder=""
									value={trainingDetailObj.Code}
									onChange={(e) => updateFormValue("Code", e.target.value)}
									className="input input-bordered w-full "
								/>

								<label className="label mt-4">
									<span className="label-text">Name</span>
								</label>
								<input
									type="text"
									placeholder=""
									value={trainingDetailObj.Name}
									onChange={(e) => updateFormValue("Name", e.target.value)}
									className="input input-bordered w-full"
								/>

								<label className="label mt-4">
									<span className="label-text">Location</span>
								</label>
								<textarea
									type="text"
									placeholder=""
									value={trainingDetailObj.Location}
									onChange={(e) => updateFormValue("Location", e.target.value)}
									className="textarea textarea-bordered w-full"
								/>

								<label className="label mt-4">
									<span className="label-text">Description</span>
								</label>
								<textarea
									type="text"
									placeholder=""
									value={trainingDetailObj.Description}
									onChange={(e) =>
										updateFormValue("Description", e.target.value)
									}
									className="textarea textarea-bordered h-24 w-full"
								/>

								<label className="label mt-4">
									<span className="label-text">Capacity</span>
								</label>
								<input
									type="number"
									placeholder=""
									min="1"
									value={trainingDetailObj.Capacity}
									onChange={(e) => updateFormValue("Capacity", e.target.value)}
									className="input input-bordered w-full"
								/>
							</div>

							<div className="">
								<label className="label mt-4">
									<span className="label-text">Area</span>
								</label>
								<select
									type="text"
									placeholder=""
									value={trainingDetailObj.AreaId}
									onChange={(e) => updateFormValue("AreaId", e.target.value)}
									className="select select-bordered w-full"
								>
									{areaObj.length > 0
										? areaObj.map((l) => (
												<option key={l.Id} value={l.Id}>
													{l.Name}
												</option>
										  ))
										: ""}
								</select>

								<label className="label mt-4">
									<span className="label-text">Image</span>
								</label>
								<input
									type="file"
									onChange={onImageChange}
									className="file-input file-input-bordered w-full"
									accept="image/png, image/jpg, image/jpeg"
								/>
								<img
									src={img ? URL.createObjectURL(img) : "../img/noimage.jpg"}
									alt="trainingDetail"
									className="mt-2 border rounded-lg min-w-full"
								/>
							</div>
						</div>
						<div className="text-err text-lg">{errorMessage}</div>
						<div className="modal-action">
							<form method="dialog">
								<button id="btnCloseAddTrainingDetail" className="btn">
									Close
								</button>
							</form>

							<button
								className="btn btn-primary ml-4 "
								onClick={() => saveNewTrainingDetail()}
							>
								Create <span className={loading ? " loading" : ""}></span>
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

export default AddTrainingDetail;
