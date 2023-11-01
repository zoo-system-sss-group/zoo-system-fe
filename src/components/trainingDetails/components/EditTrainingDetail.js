import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";
import { FirebaseImageUpload } from "../../../FirebaseImageUpload/FirebaseImageUpload";

const INITIAL_CAGE_OBJ = {
	Id: "",
	Code: "",
	Name: "",
	Location: "",
	Description: "",
	Capacity: 1,
	Image: "",
	AreaId: 0,
};

function EditTrainingDetail({ id, fetch }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
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

		axios.get(`odata/trainingDetails/${id}`).then((res) => {
			setTrainingDetailObj({
				...trainingDetailObj,
				...res.data,
			});
		});
	}, [id]);

	const saveNewTrainingDetail = async () => {
		if (trainingDetailObj.Code.trim() === "") return setErrorMessage("Code is required!");
		if (trainingDetailObj.Name.trim() === "") return setErrorMessage("Name is required!");
		if (trainingDetailObj.Location.trim() === "")
			return setErrorMessage("Location is required!");
		if (trainingDetailObj.Description.trim() === "")
			return setErrorMessage("Description is required!");
		if (trainingDetailObj.Capacity <= 0)
			return setErrorMessage("Capacity must greater than 0!");

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

	const onImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setImg(e.target.files[0]);
		}
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
			.put(`odata/trainingDetails/${trainingDetailObj.Id}`, data)
			.then((res) => {
				document.getElementById("btnCloseEditTrainingDetail").click();
				dispatch(
					showNotification({
						message: "Edit trainingDetail successfully",
						status: res.status,
					})
				);
				fetch();
			})
			.catch((err) => {
				return setErrorMessage(err.response.data.value);
			});
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setTrainingDetailObj({ ...trainingDetailObj, [updateType]: value });
	};

	return (
		<>
			<dialog id="btnEditTrainingDetail" className="modal ">
				<div className="modal-box max-w-2xl">
					<h3 className="font-bold text-lg">Edit trainingDetail</h3>
					<div className="form-control w-full mt-4">
						<label className="label">
							<span className="label-text">ID</span>
						</label>
						<input
							value={trainingDetailObj.Id}
							className="input input-bordered w-full "
							disabled
						/>

						<label className="label">
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
						<input
							type="text"
							placeholder=""
							value={trainingDetailObj.Location ? trainingDetailObj.Location : ""}
							onChange={(e) => updateFormValue("Fullname", e.target.value)}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">Description</span>
						</label>
						<textarea
							type="text"
							placeholder=""
							value={trainingDetailObj.Description ? trainingDetailObj.Description : ""}
							onChange={(e) => updateFormValue("Description", e.target.value)}
							className="textarea textarea-bordered h-24"
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
							src={
								img
									? URL.createObjectURL(img)
									: trainingDetailObj.Image
									? trainingDetailObj.Image
									: "../img/noimage.jpg"
							}
							alt="trainingDetail"
							className="mt-2 border rounded-lg min-w-full"
						/>

						<div className="text-err text-lg">{errorMessage}</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseEditTrainingDetail" className="btn">
								Close
							</button>
						</form>

						<button
							className="btn btn-primary ml-4"
							onClick={(e) => saveNewTrainingDetail()}
						>
							Save
						</button> <span className={loading ? " loading" : ""}></span>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default EditTrainingDetail;
