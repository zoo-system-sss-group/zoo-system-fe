import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import TitleCard from "../common/Cards/TitleCard";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import EditProfile from "./components/EditProfile";

function Profile() {
	const dispatch = useDispatch();
	const [profile, setProfile] = useState();
	const [error, setError] = useState("");

	const loginInfoJSON = localStorage.getItem("loginInfo");
	const loginInfo = JSON.parse(loginInfoJSON);
	const fetchProfile = () => {
		axios
			.get(`odata/accounts/${loginInfo.id}`)
			.then((res) => {
				let profile = res.data;
				setProfile(profile);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	return (
		<>
			{profile != null ? (
				<TitleCard
					title="My Profile"
					topMargin="mt-2"
					TopSideButtons={
						<div className="inline-block float-right">
							<button
								className=""
								onClick={() => {
									document.getElementById("btnEditProfile").showModal();
								}}
							>
								<span className="btn  btn-primary">
									<PencilSquareIcon className="w-5 stroke-2" />
									Edit
								</span>
							</button>
						</div>
					}
				>
					<div className="overflow-x-auto w-full">
						<div className="rounded-lg shadow-lg py-4">
							<div className="container mx-auto">
								<div className="flex flex-col w-full lg:flex-row">
									<div className="grid flex-grow">
										<div className="text-center">
											<img
												src={profile.Avatar ?? "../img/user.png"}
												alt="User Profile"
												className="mask mask-squircle mx-auto w-48 aspect-square object-cover"
											/>
											<h2 className="text-2xl font-semibold mt-2">
												{profile.Fullname}
											</h2>
											<p className="text-lg">{profile.Role}</p>
										</div>
									</div>
									<div className="divider lg:divider-horizontal text-cor1"></div>
									<div className="grid flex-grow border-2 border-cor1  p-4 rounded-lg">
										<div className="grid grid-cols-3 gap-4 text-lg">
											<div className="col-span-1">
												<div>ID</div>
												<div>Role</div>
												<div>Username</div>
												<div>Fullname</div>
												<div>Experiences</div>
												<div>Creation Date</div>
												<div>Modification Date</div>
											</div>
											<div className="col-span-2">
												<div>{profile.Id ?? ""}</div>
												<div>{profile.Role ?? ""}</div>
												<div>{profile.Username ?? ""}</div>
												<div>{profile.Fullname ?? ""}</div>
												<div>
													{profile.Experiences ?? (
														<span className="italic text-gray-500">
															No data
														</span>
													)}
												</div>
												<div>
													{moment(profile.CreationDate ?? "").format(
														"YYYY-MM-DD hh:mm:ss"
													)}
												</div>
												<div>
													{moment(profile.ModificationDate ?? "").format(
														"YYYY-MM-DD hh:mm:ss"
													)}
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<EditProfile id={profile?.Id} fetch={fetchProfile} />
				</TitleCard>
			) : (
				<div className="w-full h-96 flex justify-center items-center text-err font-bold text-3xl">
					{error}
				</div>
			)}
		</>
	);
}

export default Profile;
