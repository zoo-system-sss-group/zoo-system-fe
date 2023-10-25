import Footer from "../components/landingPage/Footer";
import Header from "../components/landingPage/Header";
import image from "../assets/an-2.jpg";
import GuestLayout from "../components/layout/GuestLayout";
import {FaceFrownIcon}  from '@heroicons/react/24/solid'

import { useEffect, useState } from "react";
import axios from "axios";

function Animals() {
	const [errorMessage, setErrorMessage] = useState("Something gone wrong");
	const [animals, setAnimals] = useState();

	useEffect(() => {
		axios
			.get("odata/animals")
			.then((res) => {
				setAnimals(res.value);
			})
			.catch((err) => setErrorMessage("Something wrong when fetching data"));
	}, []);
	return (
		<div>
			<Header />
			<GuestLayout title="All animals">
				{/* container all animals */}
				{animals != null ? (
					<div>
						<div className="mx-8 mb-6">
							<div className="card w-64 bg-cor4 shadow-xl">
								<figure>
									<img
										className="w-full h-40 object-cover"
										src={image}
										alt="Tiger"
									/>
								</figure>
								<div className="card-body px-4 py-6">
									<h2 className="card-title text-cor2">Tiger</h2>
									<p className="text-cor7">
										If a dog chews shoes whose shoes does he choose?
									</p>
								</div>
							</div>
						</div>
						{/* paging */}
						<div className="flex justify-center">
							<div className="join  mb-8 outline">
								<button className="join-item btn">1</button>
								<button className="join-item btn">2</button>
								<button className="join-item btn btn-disabled">...</button>
								<button className="join-item btn">99</button>
								<button className="join-item btn">100</button>
							</div>
						</div>
					</div>
				) : (
					<div className="h-[32rem] flex flex-col items-center">
						<FaceFrownIcon className="mt-12 block w-48 h-48"/>
						<div className="text-3xl font-medium text-err">{errorMessage}</div>
					</div>
				)}
			</GuestLayout>
			<Footer />
		</div>
	);
}

export default Animals;
