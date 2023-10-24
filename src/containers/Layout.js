import PageContent from "./PageContent";
import LeftSidebar from "./LeftSidebar";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { removeNotificationMessage } from "../components/common/headerSlice";
import {
	NotificationContainer,
	NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import ModalLayout from "./ModalLayout";

function Layout() {
	const dispatch = useDispatch();
	const { newNotificationMessage, newNotificationStatus } = useSelector(
		(state) => state.header
	);

	useEffect(() => {
		if (newNotificationMessage !== "") {
			if (newNotificationStatus >= 200 && newNotificationStatus < 300)
				NotificationManager.success(newNotificationMessage, "Success");
			else if (newNotificationStatus >= 400 && newNotificationStatus < 500)
				NotificationManager.error(newNotificationMessage, "Client Error");
			else if (newNotificationStatus >= 500 && newNotificationStatus < 600)
				NotificationManager.error(newNotificationMessage, "Server Error");
			else NotificationManager.info(newNotificationMessage, "Information");
			dispatch(removeNotificationMessage());
		}
	}, [newNotificationMessage]);

	return (
		<>
			{/* Left drawer - containing page content and side bar (always open) */}
			<div className="drawer lg:drawer-open">
				<input
					id="left-sidebar-drawer"
					type="checkbox"
					className="drawer-toggle"
				/>
				<PageContent />
				<LeftSidebar />
			</div>

			{/** Notification layout container */}
			<NotificationContainer />

			{/* Modal layout container */}
			<ModalLayout />
		</>
	);
}

export default Layout;
