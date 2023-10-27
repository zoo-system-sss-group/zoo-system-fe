import React from "react";
import LayoutSections from "../layout/LayoutSections";
import ImgActivity1 from "../../assets/at-1.jpg";
import ImgActivity2 from "../../assets/at-2.jpg";
import ImgActivity3 from "../../assets/at-3.jpg";
import ImgActivity4 from "../../assets/at-4.jpg";
import Slider from "../layout/Slider";
import { Link } from "react-router-dom";

const activities = [
	{
		src: ImgActivity1,
		id: "at1",
		name: "Escalada",
		descricao:
			"Morbi ac ipsum elit. Cras id sem id neque blandit molestie. Nunc malesuada sit amet arcu id pellentesque.",
	},
	{
		src: ImgActivity2,
		id: "at2",
		name: "Restaurante",
		descricao:
			"Sed ac enim in purus tempor mattis. Morbi luctus lobortis eleifend.",
	},
	{
		src: ImgActivity3,
		id: "at3",
		name: "Espaço kids",
		descricao:
			"Nullam blandit nisi nec enim faucibus, in consequat nisi varius. Fusce aliquam facilisis feugiat. Etiam volutpat finibus ex.",
	},
	{
		src: ImgActivity4,
		id: "at4",
		name: "Animais",
		descricao:
			"Aliquam erat volutpat. Suspendisse lobortis lacus eu metus viverra vulputate.",
	},
];

const News = () => {
	return (
		<section className="bg-cor4 text-cor2 flex flex-col sm:flex-row pt-0 sm:pt-16 pb-16 ">
			<LayoutSections title="News">
				<p className="mb-8 w-max-[450px]">
					News news news news news news news news
				</p>
				<Link to="/news" className="btn btn-primary">
					Read news
				</Link>
			</LayoutSections>
			<Slider>
				{activities.map((activity) => (
					<li key={activity.id} className="bg-[#1b3323] p-4 h-full rounded-xl">
						<img
							className="h-[180px] w-full md:h-[250px] object-cover mb-4"
							src={activity.src}
							alt={activity.name}
						/>
						<h3 className="mb-4 text-base font-medium">{activity.name}</h3>
						<p className="text-cor7">{activity.descricao}</p>
					</li>
				))}
			</Slider>
		</section>
	);
};

export default News;
