import DashboardStats from "./components/DashboardStats";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { roleStaffAdmin } from "../../routes/author";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import TicketIcon from "@heroicons/react/24/outline/TicketIcon";
import AnimalIcon from "../../assets/animals.svg";
import TagIcon from "@heroicons/react/24/outline/TagIcon";
const iconClasses = `w-8 h-8`;

const statsData = [
	{
		title: "Active Accounts",
		value: "0",
		icon: <UserCircleIcon className={iconClasses} />,
		description: "",
	},
	{
		title: "Ticket Orders",
		value: "0",
		icon: <TicketIcon className={iconClasses} />,
		description: "",
	},
	{
		title: "Animals",
		value: "0",
		icon: <img src={AnimalIcon} className={iconClasses} alt="icon_animal" />,
		description: "",
	},
	{
		title: "Species",
		value: "0",
		icon: <TagIcon className={iconClasses} />,
		description: "",
	},
];
const user = JSON.parse(localStorage.getItem("loginInfo"));

function Dashboard() {
	const [animals, setAnimals] = useState([]);
	const [ticketOrders, setTitketOrders] = useState([]);
	const fetchData = async () => {
		try {
			const res1 = await axios.get(
				"odata/accounts?filter=IsDeleted eq false&$count=true"
			);
			const obj1 = statsData[0];
			obj1.value = res1.data["@odata.count"];

			const res2 = await axios.get(
				"odata/ticketorders?filter=IsDeleted eq false&$count=true"
			);
			const obj2 = statsData[1];
			obj2.value = res2.data["@odata.count"];
			setTitketOrders(res2.data.value);

			const res3 = await axios.get(
				"odata/animals?filter=IsDeleted eq false&$count=true"
			);
			const obj3 = statsData[2];
			obj3.value = res3.data["@odata.count"];
			setAnimals(res3.data.value);

			const res4 = await axios.get(
				"odata/species?filter=IsDeleted eq false&$count=true"
			);
			const obj4 = statsData[3];
			obj4.value = res4.data["@odata.count"];
		} catch (err) {
			if (err.response && err.response.status === 403) {
				console.log(`${user.role} is not allowed to view Dashboard`);
			} else {
				console.error(err);
			}
		}
	};
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			{roleStaffAdmin.includes(user.role) ? (
				<>
					<div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
						{statsData.map((d, k) => {
							return <DashboardStats key={k} {...d} colorIndex={k} />;
						})}
					</div>

					<div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
						<LineChart ticketOrders={ticketOrders} />
						<BarChart animals={animals} />
					</div>
				</>
			) : (
				(window.location.href = "myTraining")
			)}

			{/* <div className="grid lg:grid-cols-2 mt-4 grid-cols-1 gap-6">
				<UserChannels />
				<DoughnutChart />
			</div> */}
		</>
	);
}

export default Dashboard;
