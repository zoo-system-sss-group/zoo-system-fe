import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";

const INITIAL_ACCOUNT_OBJ = {
	Id: "",
	Username: "",
	Password: "",
	Role: "",
	Avatar: null,
	Fullname: "",
	Experiences: "",
	CreationDate: "",
	DeletionDate: "",
	IsDeleted: false,
};

function ViewAccount({ id }) {
	const [errorMessage, setErrorMessage] = useState("");
	const [accountObj, setAccountObj] = useState(INITIAL_ACCOUNT_OBJ);

	useEffect(() => {
		axios.get(`odata/accounts/${id}`).then((res) => {
			setAccountObj({
				...INITIAL_ACCOUNT_OBJ,
				...res.data,
			});
		});
	}, [id]);

	return (
		<>
			<dialog id="btnViewAccount" className="modal ">
				<div className="modal-box max-w-2xl">
					<h3 className="font-bold text-lg">Account information details</h3>

					<label className="label mt-4">
						<span className="label-text">Avatar</span>
					</label>
					<img
						src={accountObj.Avatar ?? "../img/user.png"}
						alt="avatar"
						className="mt-2 border rounded-lg aspect-square object-cover"
					/>

					<div className="form-control w-full">
						<div className="w-full">
							<label className="label">
								<span className="label-text">ID</span>
							</label>
							<input
								value={accountObj.Id ?? ""}
								className="input input-bordered w-full "
								disabled
							/>
						</div>

						<div className="w-full">
							<label className="label">
								<span className="label-text">Username</span>
							</label>
							<input
								type="text"
								value={accountObj.Username}
								className="input input-bordered w-full "
								disabled
							/>
						</div>
						<label className="label mt-4">
							<span className="label-text">Fullname</span>
						</label>
						<input
							type="text"
							value={accountObj.Fullname}
							className="input input-bordered w-full"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">Role</span>
						</label>
						<input
							type="text"
							value={accountObj.Role}
							className="input input-bordered w-full"
							disabled
						/>

						<label className="label mt-4">
							<span className="label-text">Experiences</span>
						</label>
						<textarea
							type="text"
							value={accountObj.Experiences}
							className="textarea textarea-bordered h-24"
							disabled
						/>

						<div className="flex gap-2">
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">CreationDate</span>
								</label>
								<input
									type="text"
									value={moment(accountObj.CreationDate).format(
										"YYYY-mm-DD hh:mm:ss"
									)}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">ModificationDate</span>
								</label>
								<input
									type="text"
									value={
										accountObj.ModificationDate
											? moment(accountObj.ModificationDate).format(
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
									<span className="label-text">DeletionDate</span>
								</label>
								<input
									type="text"
									value={accountObj.DeletionDate ? accountObj.DeletionDate : ""}
									className="input input-bordered w-full"
									disabled
								/>
								<div className="text-err text-lg">{errorMessage}</div>
							</div>
							<div className="w-full">
								<label className="label mt-4">
									<span className="label-text">IsDeleted</span>
								</label>
								<input
									type="text"
									value={accountObj.IsDeleted}
									className="input input-bordered w-full"
									disabled
								/>
							</div>
						</div>

						<div className="text-err text-lg">{errorMessage}</div>
					</div>
					<div className="modal-action">
						<form method="dialog">
							<button id="btnCloseViewAccount" className="btn">
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

export default ViewAccount;
