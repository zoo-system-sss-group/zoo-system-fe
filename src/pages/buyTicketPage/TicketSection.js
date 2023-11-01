import axios from "axios";
import { useEffect, useState } from "react";
import Progress from "./Progress";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

function TicketSection({
	minDate,
	maxDate,
	prevStep,
	nextStep,
	handleChange,
	values,
}) {
	const [total, setTotal] = useState(null);
	const [loading, setLoading] = useState(true);
	const [date, setDate] = useState(new Date(values.effectiveDate));
	useEffect(() => {
		handleChange("effectiveDate", undefined, format(date, "yyyy-MM-dd"))();
	}, [date]);

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
				setLoading(false);
			})
			.catch((e) => {
				setLoading(false);
			});
	}, [values]);
	const handleSub = (input) => (e) => {
		e.preventDefault();
		var node = e.target.nextSibling;
		values[input] = parseInt(values[input]);
		var min = parseInt(node.min);
		if (values[input] <= min) {
			values[input] = min;
			return;
		}
		handleChange([input], node, values[input] - 1)();
	};
	const handleAdd = (input) => (e) => {
		e.preventDefault();
		var node = e.target.previousSibling;
		var max = parseInt(node.max);
		values[input] = parseInt(values[input]);
		if (values[input] >= max) {
			values[input] = max;
			return;
		}
		handleChange([input], node, values[input] + 1)(e);
	};
	useEffect(() => {}, [values]);

	const handleNumberChange = (input) => (e) => {
		var value;
		const node = e.target;
		var min = parseInt(node.min);
		var max = parseInt(node.max);
		try {
			value = parseInt(node.value);
			if (value <= min) value = min;
			if (value >= max) value = max;
		} catch {
			value = min;
		}
		node.value = value;
		return handleChange(input, node, value)(e);
	};

	const ALLOWED_KEYCODES = [8, 37, 38, 39, 40];
	const handleInput = (e) => {
		if (ALLOWED_KEYCODES.includes(e.keyCode) || ("0" <= e.key && e.key <= "9"))
			return;
		e.preventDefault();
	};

	return (
		<form
			className="card card-compact w-full  m-8 md:w-2/3 lg:w-3/5 max-w-[650px] bg-cor4 shadow relative"
			onSubmit={(e) => e.preventDefault()}
		>
			<div className="card-body ">
				<Progress value={1} max={3} />
				<div className="card-title text-cor2">Buy Ticket</div>
				{/* Ticket Type */}
				<div className="form-control  flex flex-row flex-wrap justify-between items-center ">
					<label className="label ">
						<span className="label-text text-lg text-cor2">Adult Tickets</span>
					</label>
					<div className="input-group w-min">
						<span className="btn  font-mono" onClick={handleSub("adultTicket")}>
							-
						</span>
						<input
							className="input w-[60px] text-center"
							type="number"
							onKeyDown={handleInput}
							onChange={handleNumberChange("adultTicket")}
							value={values.adultTicket}
							name="adultTicket"
							min={1}
							max={100}
						/>
						<span className="btn  font-mono" onClick={handleAdd("adultTicket")}>
							+
						</span>
					</div>
					<p className="label-text-alt text-red-600 w-[100%]"></p>
				</div>
				<div className="form-control flex flex-row flex-wrap justify-between">
					<label className="label">
						<span className="label-text text-lg text-cor2">Kid Tickets</span>
					</label>
					<div className="input-group w-min">
						<span className="btn  font-mono" onClick={handleSub("kidTicket")}>
							-
						</span>
						<input
							className="input w-[60px] text-center"
							type="number"
							onKeyDown={handleInput}
							onInput={handleNumberChange("kidTicket")}
							value={values.kidTicket}
							name="kidTicket"
							min={0}
							max={100}
						/>
						<span className="btn  font-mono" onClick={handleAdd("kidTicket")}>
							+
						</span>
					</div>
					<p className="label-text-alt text-red-600 w-[100%]"></p>
				</div>
				<div className="form-control flex flex-row flex-wrap justify-between">
					<label className="label ">
						<span className="label-text text-lg text-cor2">Date</span>
					</label>
					<ReactDatePicker
						className="input"
						wrapperClassName="ms-auto"
						dateFormat={"yyyy-MM-dd"}
						minDate={minDate}
						maxDate={maxDate}
						name="effectiveDate"
						selected={date}
						onChange={(date) => setDate(date)}
					/>
					<label className="label w-full">
						<p className="label-text-alt text-red-600 w-[100%]"></p>
					</label>
				</div>
				<div className="flex flex-row flex-wrap justify-between items-center text-cor2">
					<label className="label">
						<span className="label-text text-lg text-cor2">Total</span>
					</label>
					<span className="text-lg">
						{total?.toLocaleString("en-US", {
							style: "currency",
							currency: "VND",
						})}
					</span>
				</div>
				<span className="label-text-alt text-red-600"></span>
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
						className="btn"
						type="submit"
						onClick={(e) => {
							nextStep();
						}}
					>
						<ArrowRightIcon className="h-6 w-6" />
					</button>
				</div>
			</div>
		</form>
	);
}

export default TicketSection;
