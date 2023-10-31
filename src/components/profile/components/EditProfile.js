import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";
import { FirebaseImageUpload } from "../../../FirebaseImageUpload/FirebaseImageUpload";

const INITIAL_PROFILE_OBJ = {
	Id: "",
	Username: "",
	Fullname: "",
	Experiences: "",
	Avatar: null,
	Password: "",
};

function EditProfile({ id, fetch }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [profileObj, setProfileObj] = useState(INITIAL_PROFILE_OBJ);
	const [avatar, setAvatar] = useState(null);

	useEffect(() => {
		axios.get(`odata/accounts/${id}`).then((res) => {
			setProfileObj({
				...profileObj,
				...res.data,
			});
			setErrorMessage("");
		});
	}, [id]);

	const saveNewProfile = async () => {
		if (profileObj.Username.trim() === "")
			return setErrorMessage("Username is required!");
		if (profileObj.Fullname.trim() === "")
			return setErrorMessage("Fullname is required!");
		setLoading(true);
		if (avatar !== null) {
			try {
				const url = await FirebaseImageUpload({
					folder: "accounts",
					img: avatar,
				});
				profileObj.Avatar = url;
				uploadProfileData();
			} catch (err) {
				var msg = err?.response?.data?.value;
				if (msg === undefined) msg = "Something go wrong!";
				setErrorMessage(msg);
			}
		} else {
			uploadProfileData();
		}
		setLoading(false);
	};

	const uploadProfileData = () => {
		let newProfileObj = {
			Username: profileObj.Username,
			Fullname: profileObj.Fullname,
			Experiences: profileObj.Experiences,
			Avatar: profileObj.Avatar,
			Password: profileObj.Password,
		};
		const data = JSON.stringify(newProfileObj);
		setLoading(true);
		axios
			.put(`odata/accounts/${profileObj.Id}`, data)
			.then((res) => {
				document.getElementById("btnCloseEditProfile").click();
				dispatch(
					showNotification({
						message: "Edit profile successfully",
						status: res.status,
					})
				);
				fetch();
			})
			.catch((err) => {
				return setErrorMessage(err.response.data.value);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const updateFormValue = (updateType, value) => {
		setErrorMessage("");
		setProfileObj({ ...profileObj, [updateType]: value });
	};

	const onImageChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			setAvatar(e.target.files[0]);
		}
	};

	return (
		<>
			<dialog id="btnEditProfile" className="modal ">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Edit profile</h3>
					<div className="form-control w-full ">
						<label className="label">
							<span className="label-text">ID</span>
						</label>
						<input
							value={profileObj.Id}
							className="input input-bordered w-full "
							disabled
						/>

						<label className="label">
							<span className="label-text">Username</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={profileObj.Username ?? ""}
							onChange={(e) => updateFormValue("Username", e.target.value)}
							className="input input-bordered w-full "
						/>

						<label className="label mt-4">
							<span className="label-text">Fullname</span>
						</label>
						<input
							type="text"
							placeholder=""
							value={profileObj.Fullname ?? ""}
							onChange={(e) => updateFormValue("Fullname", e.target.value)}
							className="input input-bordered w-full"
						/>

						<label className="label mt-4">
							<span className="label-text">Experiences</span>
						</label>
						<textarea
							type="text"
							placeholder=""
							value={profileObj.Experiences ?? ""}
							onChange={(e) => updateFormValue("Experiences", e.target.value)}
							className="textarea textarea-bordered h-24"
						/>

						<label className="label mt-4">
							<span className="label-text">Avatar</span>
						</label>
						<input
							type="file"
							onChange={onImageChange}
							className="file-input file-input-bordered w-full"
							accept="image/png, image/jpg, image/jpeg"
						/>
						<img
							src={
								avatar
									? URL.createObjectURL(avatar)
									: profileObj.Avatar ?? "../img/user.png"
							}
							alt="cage"
							className="mt-2 border rounded-lg min-w-full"
						/>

						<div className="text-err text-lg">{errorMessage}</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseEditProfile" className="btn">
								Close
							</button>
						</form>

						<button
							className="btn btn-primary ml-4"
							onClick={(e) => saveNewProfile()}
						>
							Save <span className={loading ? " loading" : ""}></span>
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

export default EditProfile;
