import React from "react";
import classes from "./Home.module.css";
import { ReactComponent as IconPin } from "../../assets/pin.svg";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<section className="h-screen w-full py-12 flex flex-col text-cor2 bg-[url('/src/assets/img-entrada-2.jpg')] bg-center bg-cover shadow-[inset_0_250px_10px_rgba(9,11,9,0.3)] sm:shadow-[inset_0_250px_70px_rgba(9,11,9,0.3)]">
			<div className="flex flex-col items-center sm:items-stretch flex-1 sm:flex-row text-center sm:text-left pt-28 pb-4 px-6 sm:py-14 sm:px-12">
				<div className="text-center sm:text-left items-center sm:items-start flex flex-col flex-[3_1_0%]">
					<p className="mb-8 text-cor2 sm:text-cor7 max-w-[300px] leading-5">
						The leading FPT-owned zoo and circus combined center.
					</p>

					<h1 className="text-2xl sm:text-5xl leading-8 sm:leading-[4rem] self-end font-extrabold mt-16 sm:mt-auto mb-8 ">
						Welcome to the best zoo in FPT University ecosystem
					</h1>

					<Link
						to="buyticket"
						className="btn btn-primary self-center sm:self-start"
					>
						Buy ticket here!
					</Link>
				</div>

				<div className={classes.aside}>
					<ul>
						<li>
							<span>2506</span>
							<p>animals</p>
						</li>
						<li>
							<span>315</span>
							<p>species</p>
						</li>
						<li>
							<span>+20</span>
							<p>areas</p>
						</li>
					</ul>

					<address className="text-center mt-8 not-italic">
						<span>
							<IconPin className="inline mr-1" />
							D1 Street, Saigon Hi-tech Park, Long Thanh My Ward, Thu Duc City,
							Ho Chi Minh City
						</span>
					</address>
				</div>
			</div>
		</section>
	);
};

export default Home;
