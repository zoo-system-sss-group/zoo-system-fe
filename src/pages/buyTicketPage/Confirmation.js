import axios from "axios";
import { useEffect, useState } from "react";
import "./Confirmation.css";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Progress from "./Progress";

function Confirmation({
	step,
	totalStep,
	prevStep,
	nextStep,
	handleChange,
	values,
	paymentMethods,
}) {
	const [loading, setLoading] = useState(true);
	const [total, setTotal] = useState(0);
	useEffect(() => {
		setLoading(true);
		axios
			.post("/api/ticketorders/total", {
				tickets: [
					{
						ticketType: "AdultTicket",
						quantity: values?.adultTicket ?? 0,
					},
					{
						ticketType: "ChildrenTicket",
						quantity: values?.kidTicket ?? 0,
					},
				],
			})
			.then((resp) => {
				setTotal(resp.data.total);
			})
			.catch((e) => {});
		setLoading(false);
	}, []);
	return (
		<section className="card card-compact w-full m-8 md:w-2/3 lg:w-3/5 max-w-[650px] bg-cor4 relative shadow  my-10">
			<div className="card-body ">
				<Progress value={step} max={totalStep} />
				<div className="card-title text-cor2">Confirm Data</div>
				<div className="">
					<table className="table table-zebra text-cor2">
						<tr className="">
							<th className="text-lg">Customer Name</th>
							<td className="text-lg text-end">{values.customerName}</td>
						</tr>
						<tr className="">
							<th className="text-lg">Phone Number </th>
							<td className="text-lg text-end">{values.phoneNumber}</td>
						</tr>
						<tr className="">
							<th className="text-lg">Email</th>
							<td className="text-lg text-end">{values.email}</td>
						</tr>
						<tr className="">
							<th className="text-lg">Use Date</th>
							<td className="text-lg text-end">{values.effectiveDate}</td>
						</tr>
						<tr className="">
							<th className="text-lg">Adult Tickets</th>
							<td className="text-lg text-end">{values.adultTicket}</td>
						</tr>
						<tr className="border-b">
							<th className="text-lg ">Kid Tickets</th>
							<td className="text-lg text-end">{values.kidTicket}</td>
						</tr>

						<tr className="border-b">
							<th className="text-lg ">Total Price</th>
							<td className="text-lg text-end">
								{loading && <div className="loading mx-6"></div>}
								{total?.toLocaleString("en-US", {
									style: "currency",
									currency: "VND",
								})}
							</td>
						</tr>
					</table>
					<div className="form-control">
						<label className="label">
							<span className="label-text text-cor2 text-lg">
								Payment Method
							</span>
						</label>
						<div className="flex flex-row gap-5 justify-center mt-4">
							{paymentMethods.map((payment, index) => (
								<label
									for={`pay-${[payment.value]}`}
									key={index}
									className={` w-[100px]  border-2 bg-cor2 rounded-md py-2 px-6 flex items-center gap-5 btn`}
								>
									<input
										className="hidden"
										type="radio"
										name="paymentMethod"
										required
										checked={payment.value === values.paymentMethod}
										onChange={handleChange("paymentMethod")}
										id={`pay-${[payment.value]}`}
										value={payment.value}
									/>
									<p className="">{payment.name}</p>
								</label>
							))}
						</div>
						<div className="flex flex-col items-center p-6">
							{paymentMethods.map((payment) => (
								<>
									{payment.value === values.paymentMethod
										? payment.display
										: ""}
								</>
							))}
						</div>
						<label className="label">
							<span className="label-text-alt text-red-600"></span>
						</label>
					</div>
				</div>
				<div className="w-auto flex justify-between">
					<button
						className="btn"
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							prevStep();
						}}
					>
						<ArrowLeftIcon className="h-6 w-6" />
					</button>
					<button
						className="btn ms-auto btn-success"
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							nextStep();
						}}
					>
						Create Ticket
					</button>
				</div>
			</div>
		</section>
	);
}

export default Confirmation;
