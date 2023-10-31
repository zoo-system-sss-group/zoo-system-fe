import React, { useEffect, useState } from "react";
import LayoutSections from "../layout/LayoutSections";
import Slider from "../layout/Slider";
import axios from "axios";
import { Animal } from "../../app/class/Animal";
import { Link } from "react-router-dom";
const Animals = () => {
	const [animals, setAnimals] = useState([]);
	useEffect(() => {
		axios
			.get("/odata/animals?$top=5&$expand=species")
			.then((resp) => {
				var animalData = resp.data.value;
				const animals = animalData.map((data) => new Animal(data));
				setAnimals(animals);
			})
			.catch((err) => {
				setAnimals([]);
			});
	}, []);
	if (animals)
		return (
			<section className="bg-cor1 bg-[url('/src/assets/bg.png')] bg-cover flex flex-col sm:flex-row pt-0 sm:pt-16 pb-16">
				<LayoutSections title="All Animals" className="lg:order-1">
					<p className="max-w-[450px]">
						Meet Our Amazing Animals: Lions, Tigers, Elephants, and More!
					</p>

					<Link to="/animals" className="btn btn-accent mt-4">
						See all animals
					</Link>
				</LayoutSections>
				<Slider className="sm:h-[360px] lg:h-[400px]">
					{animals.map((animal) => (
						<li key={animal.id} className="p-4 rounded-xl bg-cor4 text-co">
							<img
								className="w-full object-cover mb-4 h-[250px] md:h-[180px]"
								src={animal.src ? animal.src : "img/noimage.jpg"}
								alt={animal.Species.Name}
							/>
							<h3 className="text-base mb-4 font-medium capitalize text-cor2">
								{animal.Species.Name}
							</h3>

							<p className="text-cor7">{animal.Description}</p>
						</li>
					))}
				</Slider>
			</section>
		);
};

export default Animals;
