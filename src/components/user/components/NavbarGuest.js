import { Link, useLocation } from "react-router-dom";

function NavbarGuest() {
	const location = useLocation(); 
	return (
		<>
			<div className="navbar bg-base-100">
				<div className="navbar-start">
					<div className="dropdown">
						<label tabIndex={0} className="btn btn-ghost lg:hidden">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h8m-8 6h16"
								/>
							</svg>
						</label>
						<ul
							tabIndex={0}
							className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<Link to="/home">Home</Link>
							</li>
							<li>
								<Link to="/product">product</Link>
							</li>
							<li>
								<Link to="/about">About us</Link>
							</li>
						</ul>
					</div>
					<Link className="btn btn-ghost normal-case text-xl" to={"/home"}>
						<img className="w-10" src="/logo.png" alt="Medkit Logo" />
						Medkit
					</Link>
				</div>
				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal px-3 gap-4 text-lg ">
						<li className={location.pathname === '/home' ? "font-bold" : ""}>
							<Link to="/home">Home</Link>
						</li>
						<li className={(location.pathname === '/product' || location.pathname === '/cart') ? "font-bold" : ""}>
							<Link to="/product">Product</Link>
						</li>
						<li className={location.pathname === '/about' ? "font-bold" : ""}>
							<Link to="/about">About us</Link>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

export default NavbarGuest;
