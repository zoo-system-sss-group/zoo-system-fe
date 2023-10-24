import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Bars3Icon from "@heroicons/react/24/outline/Bars3Icon";


function Header() {
	const dispatch = useDispatch();
	const { pageTitle } = useSelector((state) => state.header);

	function logoutUser() {
		localStorage.clear();
		window.location.href = "/";
	}

	return (
		<>
			<div className="navbar flex justify-between bg-base-100  z-10 shadow-md ">
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
					<div className="dropdown dropdown-end ml-4">
						<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full border border-gray-500">
								<img src="/user.png" alt="profile" />
							</div>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
						>
							{/* <div className="divider mt-0 mb-0"></div> */}
							<li>
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