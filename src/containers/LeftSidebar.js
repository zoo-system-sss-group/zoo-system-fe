import routes from "../routes/sidebar";
import { NavLink, Routes, Link, useLocation } from "react-router-dom";
import SidebarSubmenu from "./SidebarSubmenu";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
import { useDispatch } from "react-redux";
import Logo from "../components/layout/Logo";

function LeftSidebar() {
	const location = useLocation(); //hook lấy path của trang hiện tại

	const dispatch = useDispatch();

	const close = (e) => {
		document.getElementById("left-sidebar-drawer").click();
	};

	return (
		<div className="drawer-side ">
			<label
				htmlFor="left-sidebar-drawer"
				aria-label="close sidebar"
				className="drawer-overlay"
			></label>
			<ul className="menu pt-2 w-60 min-h-full bg-base-100 text-base-content">
				<button
					className="btn btn-ghost bg-base-300 btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
					onClick={() => close()}
				>
					<XMarkIcon className="h-5 inline-block w-5" />
				</button>

				<li className="mb-2 font-semibold text-xl">
					<Link to={"/app/dashboard"}>
						<Logo className="self-center lg:self-start mt-8 md:mt-0" />
					</Link>{" "}
				</li>
				{routes.map((route, k) => {
					return (
						<li className="" key={k}>
							{route.submenu ? (
								<SidebarSubmenu {...route} />
							) : (
								<NavLink
									end
									to={route.path}
									className={({ isActive }) =>
										`${isActive ? "font-semibold  bg-base-200" : "font-normal"}`
									}
								>
									{route.icon} {route.name}
									{location.pathname === route.path ? (
										<span
											className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
											aria-hidden="true"
										></span>
									) : null}
								</NavLink>
							)}
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export default LeftSidebar;
