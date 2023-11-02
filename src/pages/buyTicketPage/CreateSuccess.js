import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiImage } from "../../components/common/ApiImage";
import moment from "moment/moment";
import Progress from "./Progress";

function CreateSuccess({ paymentMethods, values, step, totalStep }) {
	const [loading, SetLoading] = useState(true);
	useEffect(() => {
		if (values) {
			sessionStorage.setItem(`ticket${values.Code}`, JSON.stringify(values));
			SetLoading(false);
		} else SetLoading(true);
	}, [values]);
	return (
		<section className="card card-compact w-full m-8 md:w-2/3 lg:w-3/5 max-w-[650px] bg-cor4 relative shadow  my-10">
			<div className="card-body ">
				<Progress value={step} max={totalStep} />
				<div className="card-title text-cor2">Ticket Created</div>
				{loading ? (
					<div className=" loading h-[400px] m-auto"></div>
				) : (
					<>
						<div className=" flex flex-col px-16 text-cor2 text-lg">
							<div className="w-full text-center flex flex-col items-center bg-[#1b3323] rounded p-6">
								<ApiImage className={"w-[200px]"} value={values.Code} />
								<span className="mt-4">
									<strong>Code:</strong> {values.Code}
								</span>
								<span className="mt-4">
									<strong>CreationDate:</strong>{" "}
									{moment(values.CreationDate).format("YYYY-MM-DD hh:mm:ss")}
								</span>
							</div>
							<div className="flex justify-between my-2 mt-6">
								<div className="w-auto">Customer Name</div>
								<div className="w-auto">{values.CustomerName}</div>
							</div>
							<div className="flex justify-between my-2">
								<div className="w-auto">Phone Number</div>
								<div className="w-auto">{values.PhoneNumber}</div>
							</div>
							<div className="flex justify-between my-2">
								<div className="w-auto">Payment Method</div>
								<div className="w-auto">{values.PaymentMethod}</div>
							</div>
							<div className="flex justify-between my-2">
								<div className="w-auto">Effective Date</div>
								<div className="w-auto">
									{format(new Date(values.EffectiveDate), "dd/MM/yyyy")}
								</div>
							</div>
							<div className="flex justify-between my-2">
								<div className="w-auto">Total Money</div>
								<div className="w-auto">
									{values.TotalMoney?.toLocaleString("en-US", {
										style: "currency",
										currency: "VND",
									})}
								</div>
							</div>
							<div className="flex justify-between my-2">
								<div className="w-auto">Total Ticket</div>
								<div className="w-auto">{values.TotalTicket}</div>
							</div>

							<hr></hr>
							<div className="flex flex-col items-center p-6">
								{paymentMethods.map((payment) => (
									<>
										{payment.value === values.PaymentMethod ? (
											<>
												{payment.display && (
													<div className="card-title">Confirm Payment</div>
												)}
												{payment.display}
											</>
										) : null}
									</>
								))}
							</div>
							<span className="text-xs my-2 ms-[-20px]">
								Ticket Information Has been Sent to your Email & Phone address
							</span>
						</div>
					</>
				)}
				<Link to="/" className="btn">
					Back To Home
				</Link>
				{/* Add other routes for your application */}
			</div>
		</section>
	);
}

export default CreateSuccess;
