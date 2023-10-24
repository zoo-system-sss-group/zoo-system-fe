import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

function About() {
	return (
		<div>
			<div className="max-w-screen-xl px-8 mx-auto flex justify-center flex-col gap-12 lg:flex-row items-start items-center pt-20 pb-10">
				{/* <!--Left Col--> */}
				<div
					data-aos="fade-right"
					data-aos-once="true"
					className="flex flex-col w-2/3 lg:w-1/2 justify-center items-end text-center ml-auto"
				>
					<img className="w-2/3" src="about1.png" alt="about1" />
				</div>
				{/* <!--Right Col--> */}
				<div
					data-aos="fade-left"
					data-aos-once="true"
					className="h-full lg:w-1/2"
				>
					<p className="text-lg font-medium w-2/3">
						We are a group of FPT University students who have developed an
						innovative solution called "Dr. Med" aimed at providing medical
						benefits to everyone.
					</p>
				</div>
			</div>
			<div className="max-w-screen-xl px-8 mx-auto flex flex-col gap-12 lg:flex-row items-start items-center ">
				<div
					data-aos="fade-right"
					data-aos-once="true"
					className="h-full lg:w-1/2"
				>
					<p className="text-lg font-medium w-2/3 text-right ml-auto mr-0">
						Our goal is to make healthcare more accessible and empower
						individuals to take control of their own well-being.
					</p>
				</div>
				<div
					data-aos="fade-left"
					data-aos-once="true"
					className=" flex flex-col w-2/3 lg:w-1/2 aspect-video justify-center items-start text-center"
				>
					<img
						className="w-2/3 h-3/4 object-cover rounded-3xl"
						src="about2.png"
						alt="about2"
					/>
				</div>
			</div>
		</div>
	);
}
export default About;
