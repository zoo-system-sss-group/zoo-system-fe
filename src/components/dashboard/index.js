import DashboardStats from "./components/DashboardStats";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const statsData = [
	{
		title: "Active Accounts",
		value: "0",
		icon: <UserGroupIcon className="w-8 h-8" />,
		description: "",
	},
	{
		title: "Ticket Orders",
		value: "0",
		icon: <CreditCardIcon className="w-8 h-8" />,
		description: "",
	},
	{
		title: "Animals",
		value: "0",
		icon: <CircleStackIcon className="w-8 h-8" />,
		description: "",
	},
	{
		title: "Species",
		value: "0",
		icon: <UsersIcon className="w-8 h-8" />,
		description: "",
	},
];

function Dashboard() {
	const [animals, setAnimals] = useState([]);
	const [ticketOrders, setTitketOrders] = useState([]);
	useEffect(() => {
		axios
			.get("odata/accounts?filter=IsDeleted eq false&$count=true")
			.then((res) => {
				const obj = statsData[0];
				obj.value = res.data["@odata.count"];
			})
			.catch((err) => {});
		axios
			.get("odata/ticketorders?filter=IsDeleted eq false&$count=true")
			.then((res) => {
				const obj = statsData[1];
				obj.value = res.data["@odata.count"];
				setTitketOrders(res.data.value)
			})
			.catch((err) => {});
		axios
			.get("odata/animals?filter=IsDeleted eq false&$count=true")
			.then((res) => {
				const obj = statsData[2];
				obj.value = res.data["@odata.count"];
				setAnimals(res.data.value)
			})
			.catch((err) => {});
		axios
			.get("odata/species?filter=IsDeleted eq false&$count=true")
			.then((res) => {
				const obj = statsData[3];
				obj.value = res.data["@odata.count"];
			})
			.catch((err) => {});
	}, []);

	return (
		<>
			<div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
				{statsData.map((d, k) => {
					return <DashboardStats key={k} {...d} colorIndex={k} />;
				})}
			</div>
			
			<div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
				<LineChart ticketOrders={ticketOrders}/>
				<BarChart animals={animals} />
			</div>


			{/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
				<UserChannels />
				<DoughnutChart />
			</div> */}
		</>
	);
}

export default Dashboard;
