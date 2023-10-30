import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import TitleCard from "../../common/Cards/TitleCard";
import moment from "moment/moment";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

function BarChart({ animals }) {
	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
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
		const itemsInDate = animals.filter(
			(item) => moment(item.CreationDate).format("DD/MM/YYYY") === formattedDate
		);
		count.unshift(itemsInDate.length);
	}

	const data = {
		labels,
		datasets: [
			{
				label: "animal",
				data: count,
				backgroundColor: "rgba(255, 99, 132, 1)",
			},
		],
	};

	return (
		<TitleCard title={"Daily animal count over the past 30 days"}>
			<Bar options={options} data={data} />
		</TitleCard>
	);
}

export default BarChart;
