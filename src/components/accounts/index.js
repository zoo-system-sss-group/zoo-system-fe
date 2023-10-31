import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import TitleCard from "../../components/common/Cards/TitleCard";
import { EyeIcon, NoSymbolIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { showNotification } from "../common/headerSlice";
import EditAccount from "./components/EditAccount";
import AddAccount from "./components/AddAccount";
import ViewAccount from "./components/ViewAccount";

function Accounts() {
	const dispatch = useDispatch();
	const [accounts, setAccounts] = useState();
	const [error, setError] = useState("");
	const [search, setSearch] = useState("");
	const [idSelect, setIdSelect] = useState(1);
	const [pagination, setPagination] = useState({
		page: 1,
		limit: 10,
		isEnd: false,
	});

	//lay danh sach account
	const fetchAccountList = () => {
		axios
			.get(
				`odata/accounts?$filter=contains(tolower(Username), '${search}') or contains(tolower(Fullname), '${search}')&$orderby=CreationDate desc&$skip=${(pagination.page - 1) * 10}&$top=${
					pagination.limit
				}`
			)
			.then((res) => {
				let accounts = res.data.value;
				if (!pagination.isEnd && accounts.length < pagination.limit)
					setPagination({ ...pagination, isEnd: true });
				else if (pagination.isEnd && accounts.length === pagination.limit)
					setPagination({ ...pagination, isEnd: false });
				setAccounts(accounts);
			})
			.catch((err) => {
				setError(err.message);
			});
	};

	useEffect(() => {
		fetchAccountList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pagination]);

	const deactiveAccount = (index) => {
		axios
			.delete(`/odata/accounts/${index}`)
			.then((res) => {
				dispatch(
					showNotification({
						message: "Account deactive! - " + res.status,
						status: res.status,
					})
				);
				fetchAccountList();
			})
			.catch((err) => {
				dispatch(showNotification({ message: err.message, status: 400 }));
			});
	};

	const getStatus = (isDelete) => {
		if (isDelete === false)
			return <div className="badge badge-success">Active</div>;
		else return <div className="badge badge-error">Deactive</div>;
	};

	return (
		<>
			<TitleCard
				title="Account table"
				topMargin="mt-2"
				searchInput={<div className="join">
				<input
					className="input input-bordered join-item w-80"
					placeholder="Search by Username or Fullname"
					value={search}
					onChange={(e) => setSearch(e.target.value.toLowerCase())}
				/>
				<div className="indicator">
					<button className="btn join-item" onClick={() => fetchAccountList()}>Search</button>
				</div>
			</div>}
				TopSideButtons={<AddAccount fetch={fetchAccountList}/>}
			>
				<div className="overflow-x-auto w-full">
					{accounts != null ? (
						<div>
							<table className="table w-full">
								<thead>
									<tr>
										<th>ID</th>
										<th>Username</th>
										<th>Role</th>
										<th>Fullname</th>
										<th>Experiences</th>
										<th>CreationDate</th>
										<th>ModificationDate</th>
										<th>Status</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{accounts.map((l, k) => {
										return (
											<tr key={k}>
												<td className="min-w-[3rem] max-w-[10rem] whitespace-normal">
													{l.Id}
												</td>
												<td>
													<div className="flex items-center space-x-3">
														<div className="avatar">
															<div className="mask mask-squircle w-12 h-12">
																<img
																	src={l.Avatar ? l.Avatar : "../img/user.png"}
																	alt="Avatar"
																/>
															</div>
														</div>
														<div>
															<div className="font-bold">{l.Username}</div>
														</div>
													</div>
												</td>
												<td>{l.Role}</td>
												<td>{l.Fullname}</td>
												<td>
													{l.Experiences ? (
														l.Experiences
													) : (
														<span className="italic opacity-40">No data</span>
													)}
												</td>
												<td>
													{moment(l.CreationDate).format("YYYY-MM-DD HH:mm:ss")}
												</td>
												<td>
													{moment(l.ModificationDate).format(
														"YYYY-MM-DD HH:mm:ss"
													)}
												</td>
												<td>{getStatus(l.IsDeleted)}</td>
												<td className="flex">
													{/* Nut xem account */}
													<button
														className="btn btn-ghost inline"
														onClick={() => {
															setIdSelect(l.Id);
															document
																.getElementById("btnViewAccount")
																.showModal();
														}}
													>
														<EyeIcon className="w-5 text-cor4 stroke-2" />
													</button>

													{/* Nut sua account */}
													<button
														className="btn btn-ghost inline"
														onClick={() => {
															setIdSelect(l.Id);
															document.getElementById("my_modal_1").showModal();
														}}
													>
														<PencilSquareIcon className="w-5 text-cor3 stroke-2" />
													</button>

													{/* Nut doi status account */}
													<button
														className="btn btn-ghost inline"
														onClick={() => {
															document.getElementById("btnDeactiveAccount").showModal();
															setIdSelect(l.Id);
														}}
													>
														<NoSymbolIcon className="w-5 text-err stroke-2" />
													</button>
													<dialog id="btnDeactiveAccount" className="modal ">
														<div className="modal-box">
															<h3 className="font-bold text-lg">Confirm</h3>
															<p className="py-4">
																Are you sure you want to deactive this user?
															</p>
															<div className="modal-action">
																<form method="dialog">
																	<button className="btn">Close</button>

																	<button
																		className="btn btn-primary ml-4"
																		onClick={() => deactiveAccount(idSelect)}
																	>
																		Deactive
																	</button>
																</form>
															</div>
														</div>
														<form method="dialog" className="modal-backdrop">
															<button>close</button>
														</form>
													</dialog>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							<ViewAccount id={idSelect} />
							<EditAccount id={idSelect} fetch={fetchAccountList} />

							<div className="w-full flex justify-center">
								<div className="join">
									<button
										className="join-item btn"
										onClick={() => {
											if (pagination.page > 1)
												setPagination({
													...pagination,
													page: pagination.page - 1,
												});
										}}
									>
										«
									</button>
									<button className="join-item btn">
										Page {pagination.page}
									</button>
									<button
										className="join-item btn"
										onClick={() => {
											if (!pagination.isEnd)
												setPagination({
													...pagination,
													page: pagination.page + 1,
												});
										}}
									>
										»
									</button>
								</div>
							</div>
						</div>
					) : (
						<div className="w-full h-96 flex justify-center items-center text-err font-bold text-3xl">
							{error}
						</div>
					)}
				</div>
			</TitleCard>
		</>
	);
}

export default Accounts;
