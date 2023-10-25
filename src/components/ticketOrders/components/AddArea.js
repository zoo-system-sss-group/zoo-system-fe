import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
// import { addNewArea } from "../areaSlice"

const INITIAL_ACCOUNT_OBJ = {
	Code: "",
	Name: "",
	Location: "",
	Description: "",
	Capacity: 1,
};

function AddArea({ fetch }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [areaObj, setAreaObj] = useState(INITIAL_ACCOUNT_OBJ);

	const saveNewArea = () => {
		if (areaObj.Code.trim() === "") return setErrorMessage("Code is required!");
		if (areaObj.Name.trim() === "") return setErrorMessage("Name is required!");
		if (areaObj.Location.trim() === "")
			return setErrorMessage("Location is required!");
		if (areaObj.Description.trim() === "")
			return setErrorMessage("Description is required!");
		if (areaObj.Capacity <= 0)
			return setErrorMessage("Capacity must greater than 0!");

		let newAreaObj = {
			Code: areaObj.Code,
			Name: areaObj.Name,
			Location: areaObj.Location,
			Description: areaObj.Description,
			Capacity: areaObj.Capacity,
		};
		const data = JSON.stringify(newAreaObj);

		setLoading(true);
		axios
			.post("odata/areas", data)
			.then((res) => {
				document.getElementById("btnCloseAddArea").click();
				dispatch(
					showNotification({
						message: "New Area Added!",
						status: res.status,
					})
				);
				fetch();
			})
			.catch((err) => {
				var msg = err?.response?.data?.value;
				if (msg === undefined) msg = err.message;
				return setErrorMessage(msg);
			})
			.finally(() => setLoading(false));
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setAreaObj({ ...areaObj, [updateType]: value });
	};

	return (
		<>
			<div className="inline-block float-right">
				<button
					className="btn px-6 btn-sm normal-case btn-primary"
					onClick={() => document.getElementById("btnAddArea").showModal()}
				>
					Add New
				</button>
				<dialog id="btnAddArea" className="modal ">
					<div className="modal-box">
						<h3 className="font-bold text-2xl">Add new area</h3>
						<div className="form-control w-full ">
							<label className="label mt-4">
								<span className="label-text">Code</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={areaObj.Code}
								onChange={(e) => updateFormValue("Code", e.target.value)}
								className="input input-bordered w-full "
							/>

							<label className="label mt-4">
								<span className="label-text">Name</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={areaObj.Name}
								onChange={(e) => updateFormValue("Name", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">Location</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={areaObj.Location}
								onChange={(e) => updateFormValue("Location", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">Description</span>
							</label>
							<textarea
								type="text"
								placeholder=""
								value={areaObj.Description}
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
								value={areaObj.Capacity}
								onChange={(e) => updateFormValue("Capacity", e.target.value)}
								className="input input-bordered w-full"
							/>
							<div className="text-err text-lg">{errorMessage}</div>
						</div>
						<div className="modal-action">
							<form method="dialog">
								<button id="btnCloseAddArea" className="btn">
									Close
								</button>
							</form>

							<button
								className="btn btn-primary ml-4 "
								onClick={() => saveNewArea()}
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

export default AddArea;
