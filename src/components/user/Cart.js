import { useEffect, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import InputText from "../../components/Input/InputText";
import TextAreaInput from "../../components/Input/TextAreaInput";
import ErrorText from "../../components/Typography/ErrorText";
import axios from "axios";

const INITIAL_ORDER_OBJ = {
	custormerName: "",
	phoneNumber: "",
	address: "",
	payment: 0,
	quantity: 0,
	total: 0,
	status: 1,
	sellDate: null,
};

function Cart() {
	var amount = localStorage.getItem("data");

	let navigate = useNavigate();
	useEffect(() => {
		if (isNaN(amount) || amount <= 0) {
			return navigate("/home");
		}
	}, [amount]);

	var total = amount * 150000;
	const totalFormat = total.toLocaleString("it-IT", {
		style: "currency",
		currency: "VND",
	});

	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [order, setOrder] = useState(INITIAL_ORDER_OBJ);

	const createNewOrder = () => {
		if (order.custormerName.trim() === "")
			return setErrorMessage("Name is required!");
		else if (order.phoneNumber.trim() === "")
			return setErrorMessage("Phone is required!");
		else if (order.address.trim() === "")
			return setErrorMessage("Address is required!");
		else {
			var date = new Date();

			let newOrder = {
				custormerName: order.custormerName,
				phoneNumber: order.phoneNumber,
				address: order.address,
				payment: order.payment,
				quantity: amount,
				total: total,
				status: 1,
				sellDate: new Date(
					date.getTime() - date.getTimezoneOffset() * 60000
				).toJSON(),
			};
			let data = JSON.stringify(newOrder);
			console.log("data", data);
			const config = {
				headers: {
					"Content-Type": "application/json",
				},
			};
			const response = axios
				.post("api/Order", data, config)
				.then((res) => {
					if (res.status === 200) {
						return navigate("/paymentSuccess");
					} else {
						return navigate("/home");
					}
				})
				.catch((err) => setErrorMessage("Error in order"));
		}
	};

	const updateFormValue = ({ updateType, value }) => {
		setErrorMessage("");
		setOrder({ ...order, [updateType]: value });
	};

	return (
		<div className="bg-mintcream">
			<div className="max-w-screen-xl px-8 mx-auto flex flex-col gap-8 lg:flex-row items-start pt-16 pb-20">
				{/* <!--Left Col--> */}
				<div className="flex flex-col w-full lg:w-9/24 justify-center items-start text-center">
					<h1 className="text-4xl font-bold">Cart</h1>
					<div>
						<img
							className="mt-4"
							src="product1.png"
							width="500"
							height="600"
							alt=""
						/>
						<div className="mt-4 text-2xl flex justify-center w-full">
							<span className="">Quantity: </span>
							<span className="ml-2">{amount}</span>
						</div>
					</div>
				</div>
				{/* <!--Right Col--> */}
				<div className="w-full lg:w-15/24 text-left">
					<div className="w-7/12 mx-auto ">
						<h1 className="text-3xl font-bold">Information</h1>
						<InputText
							type="text"
							defaultValue={order.custormerName}
							updateType="custormerName"
							containerStyle="mt-4"
							labelTitle="Name"
							updateFormValue={updateFormValue}
							placeholder="Your name"
						/>
						<InputText
							type="text"
							defaultValue={order.phoneNumber}
							updateType="phoneNumber"
							containerStyle="mt-4"
							labelTitle="Phone"
							updateFormValue={updateFormValue}
							placeholder="Your phone"
						/>
						<TextAreaInput
							type="text"
							defaultValue={order.address}
							updateType="address"
							containerStyle="mt-4"
							labelTitle="Address"
							updateFormValue={updateFormValue}
							placeholder="Your address"
						/>
						<label
							className="block text-md font-medium mb-1 mt-4"
							htmlFor="payment"
						>
							Payment
						</label>
						<input
							className="h-4 w-4"
							type="radio"
							id="COD"
							name="payment"
							value="COD"
							checked
						/>
						<span className="text-lg ml-1">COD</span> <br />
						<div className="text-2xl font-medium mt-3 text-purple-900">
							Total: {totalFormat}
						</div>
						<button
							className="bg-red-500 text-white h-14 w-52 text-xl font-semibold rounded-xl text-center mt-4"
							onClick={createNewOrder}
						>
							Order
						</button>
						<ErrorText styleClass="text-xl font-semibold mt-4">
							{errorMessage}
						</ErrorText>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Cart;
