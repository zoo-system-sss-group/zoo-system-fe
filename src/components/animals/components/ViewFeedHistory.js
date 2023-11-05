import { useState } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../common/headerSlice";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import TitleCard from "../../common/Cards/TitleCard";
import ReactDatePicker from "react-datepicker";
import { roleStaffAdmin } from "../../../routes/author";
import { FireIcon } from "@heroicons/react/24/outline";
var user = JSON.parse(localStorage.getItem("loginInfo"));

const INITIAL_CAGE_OBJ = {
	Id: "",
	Name: "",
	Image: "",
	Description: "",
	Weight: 0,
	Height: 0,
	BirthDate: "",
	SpeciesId: 0,
	Species: {},
	CageHistories: [],
	CreationDate: "",
	DeletionDate: "",
	IsDeleted: false,
};

function areDatesEqual(date1, date2) {
	return (
		date1.getFullYear() === date2.getFullYear() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getDate() === date2.getDate()
	);
}

function ViewFeedHistory({ id }) {
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [idFeed, setIdFeed] = useState();
	const [feedHistories, setFeedHistories] = useState([]);
	const [date, setDate] = useState(new Date());
	
	const fetchFeedHistoryOfAnimal = () => {
		
		console.log("goi ", date, id);
		axios
			.get(
				`odata/feedhistory?$filter=FeedingDate eq ${moment(date).format(
					"YYYY-MM-DD"
				)} and animalId eq ${id}`
			)
			.then((res) => {
				console.log(res);
				const data = res.data.value;
				setFeedHistories(data);
			})
			.catch((err) => {
				setErrorMessage(err.message);
			});
	};

	useEffect(() => {
		fetchFeedHistoryOfAnimal();
	}, [date, id]);

	const feedAnimal = (feedId) => {
		axios
			.put(`api/feedhistory/${feedId}`)
			.then((res) => {
				dispatch(
					showNotification({
						message: "Feed successfully",
						status: res.status,
					})
				);
				fetchFeedHistoryOfAnimal();
			})
			.catch((err) => {
				dispatch(
					showNotification({
						message: "Feed unsuccessfully" + err,
						status: 404,
					})
				);
			});
	};

	return (
		<dialog id="btnFeedHistory" className="modal">
			<div className="modal-box max-w-4xl">
				<h3 className="font-bold text-lg">Feed History</h3>

				<TitleCard
					title="Diet schedule"
					topMargin="mt-2"
					TopSideButtons={
						<ReactDatePicker
							className="input input-bordered w-full"
							dateFormat={"yyyy-MM-dd"}
							name="effectiveDate"
							selected={date}
							onChange={(date) => setDate(date)}
						/>
					}
				>
					<div className="overflow-x-auto w-full min-h-[32rem]">
						{console.log("feedHistories", feedHistories)}
						{roleStaffAdmin.includes(user.role) &&
						feedHistories != null &&
						feedHistories !== undefined ? (
							<table className="table w-full">
								<thead>
									<tr>
										<th>Slot</th>
										<th>Feed Time</th>
										<th>Diet ID</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									{feedHistories.map((feed, k) => (
										<tr key={k}>
											<td className="min-w-[1rem] max-w-[2rem] whitespace-normal">
												{k + 1}
											</td>
											<td className="min-w-[3rem] max-w-[6rem] whitespace-normal">
												{moment(feed.FeedingDate).format("HH:mm")}
											</td>
											<td className="min-w-[2rem] max-w-[3rem] whitespace-normal">
												{feed.DietId}
											</td>
											<td className="min-w-[2rem] max-w-[3rem] whitespace-normal">
												{feed.IsDeleted ? (
													<span className="text-cor1">Fed</span>
												) : (
													<span className="text-err">Not yet</span>
												)}
											</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<div className="w-full h-96 flex justify-center items-center text-err font-bold text-3xl">
								{errorMessage}
							</div>
						)}
					</div>
				</TitleCard>

				<div className="text-err text-lg">{errorMessage}</div>
				<div className="modal-action">
					<form method="dialog">
						<button id="btnCloseViewAnimal" className="btn">
							Close
						</button>
					</form>
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
}

export default ViewFeedHistory;
