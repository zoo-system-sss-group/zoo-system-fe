import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Product() {
	const [amount, setAmount] = useState(1);

	const handleChangeAmount = (e) => {
		setAmount(e.target.value);
	};

	useEffect(() => {
		localStorage.setItem("data", amount);
	}, [amount]);

	const [image, setImage] = useState("product1.png");

	const changeImage = (value) => {
		setImage(value);
	};

	return (
		<div>
			<div className="max-w-screen-xl px-8 mx-auto flex flex-col gap-8 lg:flex-row items-start py-20">
				{/* <!--Left Col--> */}
				<div className="flex flex-col w-full lg:w-9/24 justify-center items-start text-center">
					<div className="flex justify-center w-full h-[26rem]">
						<img src={image} alt="product" className="w-full h-full object-cover rounded-3xl" />
					</div>
					<div className="flex justify-center gap-4 mt-8 w-full">
						<div className="cursor-pointer">
							<img
								src="product2.png"
								className=""
								alt="product"
								onClick={(e) => changeImage("product1.png")}
							/>
						</div>
						<div className="cursor-pointer">
							<img
								src="product3.png"
								className=""
								alt="product"
								onClick={(e) => changeImage("product3.png")}
							/>
						</div>
						<div className="cursor-pointer">
							<img
								src="product4.png"
								className=""
								alt="product"
								onClick={(e) => changeImage("product4.png")}
							/>
						</div>
					</div>
				</div>
				{/* <!--Right Col--> */}
				<div className="w-full lg:w-15/24 relative ">
					<h1 className="text-5xl font-semibold">Family’s Medical Kit</h1>
					<div className="text-4xl font-medium mt-6 text-purple-900">
						<span className="border-t-4 border-purple-900">150.000</span>
						<span>VND</span>
					</div>
					<div className="text-lg mt-4">
						<p>
							<span className="font-bold">This box contain:</span> 1 Paracetamol
							box, 1 Oresol box, 1 Pantenol cream, 1 Betadine, 1 eugika, 1
							decolgen, 1efferalgan, 3 bandages, Medicated Oil, some medical
							instruments.
						</p>
						<p>
							<span className="font-bold">Weight:</span> 1.5kg
						</p>
						<p>
							<span className="font-bold">Area:</span> 60cm * 30cm * 30cm
						</p>
						<p className="py-4 text-red-500">
							If you need any changes made to the box, please chat with us
							before making a purchase.
						</p>
					</div>
					<div className="mt-4 text-2xl gap-4">
						<span className="">Quantity: </span>
						<input
							className="ml-2 text-center"
							type="number"
							value={amount}
							onChange={handleChangeAmount}
							style={{ width: "50px" }}
							min="1"
						/>
					</div>
					<div className="flex justify-center mt-8">
						<Link
							to={"/cart"}
							className="bg-red-500 text-white h-14 w-52 text-xl font-semibold rounded-xl text-center flex justify-center flex-col"
						>
							Add to cart
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
export default Product;
