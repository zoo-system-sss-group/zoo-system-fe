/** Icons are imported separatly to reduce build time */
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import TicketIcon from "@heroicons/react/24/outline/TicketIcon";
import TagIcon from "@heroicons/react/24/outline/TagIcon";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import PuzzlePieceIcon from "@heroicons/react/24/outline/PuzzlePieceIcon";
import MapIcon from "@heroicons/react/24/outline/MapIcon";
import CubeIcon from "@heroicons/react/24/outline/CubeIcon";
import NewspaperIcon from "@heroicons/react/24/outline/NewspaperIcon";
import ArchiveBoxIcon from "@heroicons/react/24/outline/ArchiveBoxIcon";
import InboxStackIcon from "@heroicons/react/24/outline/InboxStackIcon";
import HomeIcon from "@heroicons/react/24/outline/HomeIcon";
import ClockIcon from "@heroicons/react/24/outline/ClockIcon";
import AnimalIcon from "../assets/animals.svg";
import {roleAll, roleStaffAdmin, roleTrainer} from "./author";

const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
	{
		path: "/management/dashboard",
		icon: <Squares2X2Icon className={iconClasses} />,
		name: "Dashboard",
		role: roleStaffAdmin,
	},
	{
		path: "/management/accounts",
		icon: <UserCircleIcon className={iconClasses} />,
		name: "Accounts",
		role: roleStaffAdmin,
	},
	{
		path: "/management/ticketOrders",
		icon: <TicketIcon className={iconClasses} />,
		name: "Ticket Orders",
		role: roleStaffAdmin,
	},
	{
		path: "/management/news",
		icon: <NewspaperIcon className={iconClasses} />,
		name: "News",
		role: roleStaffAdmin,
	},
	{
		path: "/management/myTraining",
		icon: <HomeIcon className={iconClasses} />,
		name: "My Training",
		role: roleTrainer,
	},
	{
		path: "/management/dietSchedule",
		icon: <ClockIcon className={iconClasses} />,
		name: "Diet Schedule",
		role: roleTrainer,
	},

	{
		path: "", //no url needed as this has submenu
		icon: <CircleStackIcon className={`${iconClasses} inline`} />, // icon component
		name: "Zoo Management", // name that appear in Sidebar
		role: roleAll,
		submenu: [
			{
				path: "/management/animals",
				icon: (
					<img
						src={AnimalIcon}
						className={submenuIconClasses}
						alt="icon_animal"
					/>
				),
				name: "Animals",
				role: roleAll,
			},
			{
				path: "/management/species",
				icon: <TagIcon className={submenuIconClasses} />,
				name: "Species",
				role: roleAll,
			},
			{
				path: "/management/areas",
				icon: <MapIcon className={submenuIconClasses} />,
				name: "Areas",
				role: roleAll,
			},
			{
				path: "/management/cages",
				icon: <CubeIcon className={submenuIconClasses} />,
				name: "Cages",
				role: roleAll,
			},
			{
				path: "/management/diets",
				icon: <ArchiveBoxIcon className={submenuIconClasses} />,
				name: "Diets",
				role: roleAll,
			},
			{
				path: "/management/dietDetails",
				icon: <InboxStackIcon className={submenuIconClasses} />,
				name: "Diet Details",
				role: roleStaffAdmin,
			},
			{
				path: "/management/trainingDetails",
				icon: <PuzzlePieceIcon className={submenuIconClasses} />,
				name: "Training Details",
				role: roleStaffAdmin,
			},
		],
	},
];

export default routes;
