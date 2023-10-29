import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
// import { addNewNews } from "../newsSlice"

const INITIAL_NEWS_OBJ = {
	Code: "",
	Name: "",
	Location: "",
	Description: "",
	Capacity: 1,
};

function AddNews({ fetch }) {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [newsObj, setNewsObj] = useState(INITIAL_NEWS_OBJ);

	const saveNewNews = () => {
		if (newsObj.Code.trim() === "") return setErrorMessage("Code is required!");
		if (newsObj.Name.trim() === "") return setErrorMessage("Name is required!");
		if (newsObj.Location.trim() === "")
			return setErrorMessage("Location is required!");
		if (newsObj.Description.trim() === "")
			return setErrorMessage("Description is required!");
		if (newsObj.Capacity <= 0)
			return setErrorMessage("Capacity must greater than 0!");

		let newNewsObj = {
			Code: newsObj.Code,
			Name: newsObj.Name,
			Location: newsObj.Location,
			Description: newsObj.Description,
			Capacity: newsObj.Capacity,
		};
		const data = JSON.stringify(newNewsObj);

		setLoading(true);
		axios
			.post("odata/newss", data)
			.then((res) => {
				document.getElementById("btnCloseAddNews").click();
				dispatch(
					showNotification({
						message: "New News Added!",
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
		setNewsObj({ ...newsObj, [updateType]: value });
	};

	return (
		<>
			<div className="inline-block float-right">
				<button
					className="btn px-6 btn-sm normal-case btn-primary"
					onClick={() => document.getElementById("btnAddNews").showModal()}
				>
					Add New
				</button>
				<dialog id="btnAddNews" className="modal ">
					<div className="modal-box">
						<h3 className="font-bold text-2xl">Add new news</h3>
						<div className="form-control w-full ">
							<label className="label mt-4">
								<span className="label-text">Code</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={newsObj.Code}
								onChange={(e) => updateFormValue("Code", e.target.value)}
								className="input input-bordered w-full "
							/>

							<label className="label mt-4">
								<span className="label-text">Name</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={newsObj.Name}
								onChange={(e) => updateFormValue("Name", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">Location</span>
							</label>
							<input
								type="text"
								placeholder=""
								value={newsObj.Location}
								onChange={(e) => updateFormValue("Location", e.target.value)}
								className="input input-bordered w-full"
							/>

							<label className="label mt-4">
								<span className="label-text">Description</span>
							</label>
							<textnews
								type="text"
								placeholder=""
								value={newsObj.Description}
								onChange={(e) => updateFormValue("Description", e.target.value)}
								className="textnews textnews-bordered h-24"
							/>

							<label className="label mt-4">
								<span className="label-text">Capacity</span>
							</label>
							<input
								type="number"
								placeholder=""
								min="1"
								value={newsObj.Capacity}
								onChange={(e) => updateFormValue("Capacity", e.target.value)}
								className="input input-bordered w-full"
							/>
							<div className="text-err text-lg">{errorMessage}</div>
						</div>
						<div className="modal-action">
							<form method="dialog">
								<button id="btnCloseAddNews" className="btn">
									Close
								</button>
							</form>

							<button
								className="btn btn-primary ml-4 "
								onClick={() => saveNewNews()}
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

export default AddNews;
