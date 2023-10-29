import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";

const INITIAL_NEWS_OBJ = {
	Id: "",
	Code: "",
	Name: "",
	Location: "",
	Description: "",
	Capacity: 0
};

function EditNews({ id, fetch }) {
	// const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [newsObj, setNewsObj] = useState(INITIAL_NEWS_OBJ);

	useEffect(() => {
		axios.get(`odata/newss/${id}`).then((res) => {
			setNewsObj({
				...newsObj,
				...res.data,
			});
		});
	}, [id]);

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
		axios
			.put(`odata/newss/${newsObj.Id}`, data)
			.then((res) => {
				document.getElementById("btnCloseEditNews").click();
				dispatch(
					showNotification({
						message: "Edit news successfully",
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
		setNewsObj({ ...newsObj, [updateType]: value });
	};

	return (
		<>
			<dialog id="btnEditNews" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Edit news</h3>
					<div className="form-control w-full mt-4">
						<label className="label">
							<span className="label-text">ID</span>
						</label>
						<input
							value={newsObj.Id}
							className="input input-bordered w-full "
							disabled
						/>

						<label className="label">
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
							value={newsObj.Location ? newsObj.Location : ""}
							onChange={(e) => updateFormValue("Fullname", e.target.value)}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">Description</span>
						</label>
						<textnews
							type="text"
							placeholder=""
							value={newsObj.Description ? newsObj.Description : ""}
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
							<button id="btnCloseEditNews" className="btn">
								Close
							</button>
						</form>

						<button
							className="btn btn-primary ml-4"
							onClick={(e) => saveNewNews()}
						>
							Save
						</button>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default EditNews;
