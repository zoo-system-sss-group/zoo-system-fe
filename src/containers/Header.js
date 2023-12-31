import React from "react";
import { useSelector } from "react-redux";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";
import { getRoleBadge } from "../components/accounts";

function Header() {
	const { pageTitle } = useSelector((state) => state.header);
	const loginInfoJSON = localStorage.getItem("loginInfo");
	if (loginInfoJSON == null) window.location.href = "/";
	const loginInfo = JSON.parse(loginInfoJSON);
	function logoutUser() {
		localStorage.clear();
		window.location.href = "/";
	}

	return (
		<>
			<div className="navbar flex justify-between bg-base-100 z-10 shadow-md">
				{/* Menu toogle for mobile view or small screen */}
				<div className="">
					<label
						htmlFor="left-sidebar-drawer"
						className="btn btn-primary drawer-button lg:hidden"
					>
						<Bars3Icon className="h-5 inline-block w-5" />
					</label>
					<h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
				</div>

				<div className="order-last  mr-4">
					{/* Profile icon, opening menu on click */}
					<div>
						<span className="badge badge-ghost badge-lg h-10 flex flex-row shadow-inner">
							<div>{getRoleBadge(loginInfo.role)}</div>
							<div className="divider divider-horizontal m-0"></div>
							<div>{loginInfo.fullname}</div>
						</span>
					</div>
					<div className="dropdown dropdown-end ml-4">
						<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full border-2 border-cor1">
								<img
									src={loginInfo.avatar ?? "../img/user.png"}
									alt="profile"
								/>
							</div>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-compact dropdown-content mt-3 p-2 shadow-md bg-base-100 rounded-box w-52"
						>
							<li className="font-medium text-md">
								<button
									onClick={() => {
										window.location.href = "profile";
									}}
								>
									Profile
								</button>
							</li>
							<li className="font-medium text-md">
								<button
									onClick={() => {
										window.location.href = "/";
									}}
								>
									Home
								</button>
							</li>
							<div className="divider mt-0 mb-0"></div>
							<li className="font-medium text-md">
								<button onClick={logoutUser}>Logout</button>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</>
	);
}

export default Header;
