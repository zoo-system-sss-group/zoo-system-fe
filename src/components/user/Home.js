import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
import classes from "./Home.module.css";
import { Link } from "react-router-dom";
AOS.init();

function Home() {
	return (
		<div className="">
			<div className="max-w-screen-xl px-8 mx-auto flex flex-col lg:flex-row items-start font-semibold">
				{/* Left Col */}
				<div className="flex flex-col w-full lg:w-6/12 justify-center lg:pt-28 items-start text-center lg:text-left mb-5 md:mb-0">
					<h1
						data-aos="fade-right"
						data-aos-once="true"
						className="my-4 text-[3.5rem] font-bold leading-tight text-indigo-900"
					>
						Family’s Medical Kit
					</h1>
					<p
						data-aos="fade-down"
						data-aos-once="true"
						data-aos-delay="300"
						className="leading-normal text-2xl mb-8"
					>
						Solution for family's medical problems
					</p>
					<div
						data-aos="fade-up"
						data-aos-once="true"
						data-aos-delay="700"
						className="w-full md:flex items-center justify-center lg:justify-start md:space-x-5"
					>
						<Link
							className="lg:mx-0 bg-red-500 text-white text-xl font-bold rounded-full py-4 px-9 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out"
							to="/Product"
						>
							Buy now
						</Link>
						<span className="text-2xl">Just for <span className="text-red-500">150.000 VND</span></span>
					</div>
					<div
						data-aos="fade-right"
						data-aos-once="true"
						data-aos-delay="1000"
						className="text-base flex mx-0 md:block pt-7"
					>
						<div>
							<img className="inline h-10" src="check.svg" alt="" />
							Experienced pharmacists
						</div>
						<div>
							<img className="inline h-10" src="check.svg" alt="" />
							Quality Medicines
						</div>
						<div>
							<img className="inline h-10" src="check.svg" alt="" />
							Affordable Prices
						</div>
					</div>
				</div>
				{/* Right Col */}
				<div className="w-full lg:w-6/12 relative">
					<img
						data-aos="fade-up"
						data-aos-once="true"
						className="w-full mx-auto my-16 h-full"
						src="home.png"
						alt="home"
					/>
					<div
						data-aos="fade-up"
						data-aos-delay="500"
						data-aos-once="true"
						className={`absolute bottom-10 -left-4 sm:left-2 sm:bottom-10 lg:-left-4 ${classes.floating}`}
					>
						<img className="h-20 sm:h-28" src="userplus.png" alt="" />
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
