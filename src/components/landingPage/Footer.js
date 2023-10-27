import React from "react";
import MediasLink from "../layout/MediasLink";
import Logo from "../layout/Logo";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="bg-cor5 text-cor2">
			<div className="flex justify-between py-8 md:py-12 px-12 md:px-24 lg:px-40 flex-col md:flex-row items-center md:items-start text-center md:text-left">
				<nav className="mt-8 md:mt-0">
					<p className="font-extrabold mb-4">Menu</p>
					<ul className="">
						<li>
							<Link to="/">Home</Link>
						</li>
						<li>
							<Link to="/animals">Animals</Link>
						</li>
						<li>
							<Link to="/news">News</Link>
						</li>
						<li>
							<Link to="/buyticket">buy ticket</Link>
						</li>
					</ul>
				</nav>

				<address className="not-italic mt-8 md:mt-0">
					<div className="mb-0">
						<p className="font-extrabold mb-4">Address</p>
						<span className="block">Cidade - ES</span>
						<span className="block mt-2">Rua Lorem 12 - Ipsum</span>
						<span className="block mt-2">12345-678</span>
					</div>
				</address>

				<address className="not-italic mt-8 md:mt-0">
					<div>
						<p className="font-extrabold mb-4">Contact</p>
						<span className="block">+00 1234-5678</span>
						<span className="block mb-2 mt-2">fzoo@email.com</span>
						<MediasLink />
					</div>
				</address>

				<Logo className="self-center lg:self-start mt-8 md:mt-0" />
			</div>
		</footer>
	);
};

export default Footer;
