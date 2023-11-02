import React, { useEffect } from "react";
import { ReactComponent as IconPin } from "../../assets/pin.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const HOME_VALUE = {
	animals: 0,
	species: 0,
	areas: 0,
};
const Home = () => {
	const [homeValue, setHomeValue] = useState(HOME_VALUE);
	useEffect(() => {
		axios
			.all([
				axios.get("odata/animals?$count=true"),
				axios.get("odata/species?$count=true"),
				axios.get("odata/areas?$count=true"),
			])
			.then((res) => {
				let newValue = {
					animals: res[0].data["@odata.count"],
					species: res[1].data["@odata.count"],
					areas: res[2].data["@odata.count"],
				};
				setHomeValue(newValue);
			});
	}, []);

	return (
		<section className="h-screen w-full py-4 flex flex-col text-cor2 bg-[url('/src/assets/img-entrada-2.jpg')] bg-center bg-cover shadow-[inset_0_250px_10px_rgba(9,11,9,0.3)] sm:shadow-[inset_0_250px_70px_rgba(9,11,9,0.3)]">
			<div className="flex flex-col items-center sm:items-stretch flex-1 sm:flex-row text-center sm:text-left pt-14 pb-20 px-6 sm:pt-12 sm:pb-28 sm:px-12">
				<div className="text-center sm:text-left items-center sm:items-start flex flex-col flex-[3_1_0%]">
					<p className="mb-8 text-cor2 sm:text-cor7 max-w-[300px] leading-5">
						The leading FPT-owned zoo and circus combined center.
					</p>

					<h1 className="text-3xl sm:text-5xl leading-8 sm:leading-[4rem] self-end font-extrabold mt-16 sm:mt-auto mb-8 ">
						Welcome to the best zoo in FPT University ecosystem
					</h1>

					<Link
						to="buyticket"
						className="btn btn-primary self-center sm:self-start"
					>
						Buy ticket here!
					</Link>
				</div>

				<div className="flex text-right flex-col justify-between flex-[2_1_0%]">
					<ul className="flex justify-center sm:block text-left sm:text-right">
						<li>
							<span className="text-3xl sm:text-5xl font-extrabold">
								{homeValue.animals}
							</span>
							<p>animals</p>
						</li>
						<li className="mt-0 sm:mt-12 ml-6 sm:ml-0">
							<span className="text-3xl sm:text-5xl font-extrabold">
								{homeValue.species}
							</span>
							<p>species</p>
						</li>
						<li className="mt-0 sm:mt-12 ml-6 sm:ml-0">
							<span className="text-3xl sm:text-5xl font-extrabold">
								{homeValue.areas}
							</span>
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
