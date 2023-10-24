import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/common/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { getCustomersContent } from "./customerSlice";
import {
	CONFIRMATION_MODAL_CLOSE_TYPES,
	MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
const TopSideButtons = () => {
	const dispatch = useDispatch();

	const openAddNewCustomerModal = () => {
		dispatch(
			openModal({
				title: "Add New Customer",
				bodyType: MODAL_BODY_TYPES.CUSTOMER_ADD_NEW,
			})
		);
	};

	return (
		<div className="inline-block float-right">
			<button
				className="btn px-6 btn-sm normal-case btn-primary"
				onClick={() => openAddNewCustomerModal()}
			>
				Add New
			</button>
		</div>
	);
};

function Customers() {
	const { customers } = useSelector((state) => state.customer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCustomersContent());
	}, []);

	const getDummyStatus = (index) => {
		if (index === 1) return <div className="badge badge-success">Active</div>;
		else return <div className="badge badge-error">In Active</div>;
	};
	const getGender = (index) => {
		if (index === 1) return <div className="text-blue-500">Male</div>;
		else return <div className="text-pink-500">Female</div>;
	};

	const maskUUID = (uuid) => {
		if (uuid.length !== 36) {
			return uuid;
		}

		const maskedUUID = uuid.slice(0, 5) + "**************************" + uuid.slice(31);
		return maskedUUID;
	};

	return (
		<>
			<TitleCard
				title="Current Customers"
				topMargin="mt-2"
				TopSideButtons={<TopSideButtons />}
			>
				{/* Customers List in table format loaded from slice after api call */}
				<div className="overflow-x-auto w-full">
					<table className="table w-full">
						<thead>
							<tr>
								<th>ID</th>
								<th>Name</th>
								<th>Email</th>
								<th>Gender</th>
								<th>Status</th>
								<th>Product ID</th>
							</tr>
						</thead>
						<tbody>
							{customers.map((l, k) => {
								return (
									<tr key={k}>
										<td className="min-w-[3rem] max-w-[10rem] whitespace-normal">
											{l.id}
										</td>
										<td>
											<div className="flex items-center space-x-3">
												<div className="avatar">
													<div className="mask mask-squircle w-12 h-12">
														<img src="../../user.png" alt="Avatar" />
													</div>
												</div>
												<div>
													<div className="font-bold">{l.name}</div>
												</div>
											</div>
										</td>
										<td>{l.email}</td>
										<td>{getGender(l.gender)}</td>
										<td>{getDummyStatus(l.status)}</td>
										<td>{maskUUID(l.productId)}</td>
									</tr>
								);
							})}
						</tbody>
					</table>
				</div>
			</TitleCard>
		</>
	);
}

export default Customers;
