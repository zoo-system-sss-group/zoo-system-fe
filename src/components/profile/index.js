import { useEffect, useState } from "react";
import moment from "moment";
import TitleCard from "../common/Cards/TitleCard";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import EditProfile from "./components/EditProfile";

function Profile() {
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

	const getRoleBadge = (role) => {
		if (role === "Staff")
			return <div className="badge badge-lg badge-error">{role}</div>;
		if (role === "Trainer")
			return <div className="badge badge-lg badge-info">{role}</div>;
		if (role === "Admin")
			return <div className="badge badge-lg badge-accent">{role}</div>;
		else return <div className="badge badge-lg badge-outline">{role}</div>;
	};

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
						<div className="rounded-lg shadow-xl py-4">
							<div className="container mx-auto">
								<div className="flex flex-col w-full lg:flex-row">
									<div className="grid flex-grow">
										<div className="text-center">
											<img
												src={profile.Avatar ?? "../img/user.png"}
												alt="User Profile"
												className="mask mask-squircle mx-auto w-80 aspect-square object-cover"
											/>
											<h2 className="text-3xl font-semibold mt-4">
												{profile.Fullname}
											</h2>
											<p className="text-lg mt-2">
												{getRoleBadge(profile.Role)}
											</p>
										</div>
									</div>
									<div className="divider lg:divider-horizontal text-cor1"></div>
									<div className="grid flex-grow border-1 border-cor4 bg-emerald-50 px-4 rounded-[1.75rem] overflow-hidden shadow-inner">
										<dl className="sm:divide-y sm:divide-cor1">
											<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
												<dt className="text-lg font-semibold text-cor4">ID</dt>
												<dd className="mt-1 text-lg sm:mt-0 sm:col-span-2">
													{profile.Id ?? ""}
												</dd>
											</div>
											<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
												<dt className="text-lg font-semibold text-cor4">
													Username
												</dt>
												<dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
													{profile.Username ?? ""}
												</dd>
											</div>
											<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
												<dt className="text-lg font-semibold text-cor4">
													Fullname
												</dt>
												<dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
													{profile.Fullname ?? ""}
												</dd>
											</div>
											<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
												<dt className="text-lg font-semibold text-cor4">
													Experiences
												</dt>
												<dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
													{profile.Experiences ?? (
														<span className="italic text-cor4">No data</span>
													)}
												</dd>
											</div>
											<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
												<dt className="text-lg font-semibold text-cor4">
													Creation Date
												</dt>
												<dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
													{moment(profile.CreationDate ?? "").format(
														"YYYY-MM-DD hh:mm:ss"
													)}
												</dd>
											</div>

											<div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
												<dt className="text-lg font-semibold text-cor4">
													Modification Date
												</dt>
												<dd className="mt-1 text-lg text-gray-900 sm:mt-0 sm:col-span-2">
													{moment(profile.ModificationDate ?? "").format(
														"YYYY-MM-DD hh:mm:ss"
													)}
												</dd>
											</div>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>
					{profile && <EditProfile id={profile?.Id} fetch={fetchProfile} />}
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
