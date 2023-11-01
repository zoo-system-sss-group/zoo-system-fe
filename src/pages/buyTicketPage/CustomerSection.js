import Progress from "./Progress";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
function CustomerSection({
	step,
	totalStep,
	nextStep,
	handleChange,
	values,
	paymentMethods,
}) {
	return (
		<form className="card card-compact w-full m-8 md:w-2/3 lg:w-3/5 max-w-[650px] bg-cor4 text-cor2 shadow relative">
			<div className="card-body ">
				<Progress value={0} max={3} />
				<div className="card-title">Your Information</div>
				<div className="flex justify-between gap-6">
					<div className="form-control w-1/2">
						<label className="label">
							<span className="label-text text-inherit">Customer Name</span>
						</label>
						<input
							className="input text-black"
							placeholder="Enter Your Full Name"
							onChange={handleChange("customerName")}
							name="customerName"
							value={values.customerName}
						/>
						<label className="label">
							<span className="label-text-alt text-red-600"></span>
						</label>
					</div>
					<div className="form-control inline-flex w-1/2">
						<label className="label">
							<span className="label-text text-inherit">Phone Number</span>
						</label>
						<input
							className="input text-black"
							placeholder="Enter Your Phone Number"
							onChange={handleChange("phoneNumber")}
							name="phoneNumber"
							value={values.phoneNumber}
						/>
						<label className="label">
							<span className="label-text-alt text-red-600"></span>
						</label>
					</div>
				</div>
				<div className="form-control inline-flex w-1/2">
					<label className="label">
						<span className="label-text text-inherit">Email</span>
					</label>
					<input
						className="input text-black"
						onChange={handleChange("email")}
						placeholder="Enter Your Email"
						value={values.email}
						name="email"
					/>
					<label className="label">
						<span className="label-text-alt text-red-600"></span>
					</label>
				</div>

				<div className="w-auto flex justify-between">
					<button
						className="btn ms-auto"
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							nextStep();
						}}
					>
						<ArrowRightIcon className="h-6 w-6 stroke-2" />
					</button>
				</div>
			</div>
		</form>
	);
}

export default CustomerSection;
