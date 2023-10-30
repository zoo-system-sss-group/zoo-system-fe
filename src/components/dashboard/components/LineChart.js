import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import TitleCard from "../../common/Cards/TitleCard";
import moment from "moment";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

function LineChart({ ticketOrders }) {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
		},
		scales: {
			y: {
				beginAtZero: true,
			},
		},
	};

	const currentDate = new Date();
	const labels = [];
	const count = [];
	for (let i = 0; i < 30; i++) {
		const date = new Date(currentDate);
		date.setDate(currentDate.getDate() - i);
		labels.unshift(moment(date).format("DD/MM"));
		const formattedDate = moment(date).format("DD/MM/YYYY");
		const itemsInDate = ticketOrders.filter(
			(item) => moment(item.CreationDate).format("DD/MM/YYYY") === formattedDate
		);
		count.unshift(itemsInDate.length);
	}

	const data = {
		labels,
		datasets: [
			{
				fill: true,
				label: "Ticket Orders",
				data: count,
				borderColor: "rgb(53, 162, 235)",
				backgroundColor: "rgba(53, 162, 235, 0.5)",
			},
		],
	};

	return (
		<TitleCard title={"Daily ticket order count over the past 30 days"}>
			<Line data={data} options={options} />
		</TitleCard>
	);
}

export default LineChart;
