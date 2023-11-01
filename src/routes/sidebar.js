/** Icons are imported separatly to reduce build time */
import DocumentTextIcon from "@heroicons/react/24/outline/DocumentTextIcon";
import Squares2X2Icon from "@heroicons/react/24/outline/Squares2X2Icon";
import TicketIcon from "@heroicons/react/24/outline/TicketIcon";
import TagIcon from "@heroicons/react/24/outline/TagIcon";
import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import PuzzlePieceIcon from "@heroicons/react/24/outline/PuzzlePieceIcon";
import MapIcon from "@heroicons/react/24/outline/MapIcon";
import CubeIcon from "@heroicons/react/24/outline/CubeIcon";
import NewspaperIcon from "@heroicons/react/24/outline/NewspaperIcon";
import ArchiveBoxIcon from "@heroicons/react/24/outline/ArchiveBoxIcon";
import AnimalIcon from "../assets/animals.svg";
const iconClasses = `h-6 w-6`;
const submenuIconClasses = `h-5 w-5`;

const routes = [
	{
		path: "/management/dashboard",
		icon: <Squares2X2Icon className={iconClasses} />,
		name: "Dashboard",
	},
	{
		path: "/management/accounts",
		icon: <UserCircleIcon className={iconClasses} />,
		name: "Accounts",
	},
	{
		path: "/management/ticketOrders",
		icon: <TicketIcon className={iconClasses} />,
		name: "Ticket Orders",
	},
	{
		path: "/management/news",
		icon: <NewspaperIcon className={iconClasses} />,
		name: "News",
	},
	{
		path: "/management/training",
		icon: <PuzzlePieceIcon className={iconClasses} />,
		name: "Training",
	},

	{
		path: "", //no url needed as this has submenu
		icon: <DocumentTextIcon className={`${iconClasses} inline`} />, // icon component
		name: "Zoo Management", // name that appear in Sidebar
		submenu: [
			{
				path: "/management/animals",
				icon: <img src={AnimalIcon} className={iconClasses} alt="icon_animal" />,
				name: "Animals",
			},
			{
				path: "/management/species",
				icon: <TagIcon className={iconClasses} />,
				name: "Species",
			},
			{
				path: "/management/areas",
				icon: <MapIcon className={iconClasses} />,
				name: "Areas",
			},
			{
				path: "/management/cages",
				icon: <CubeIcon className={iconClasses} />,
				name: "Cages",
			},
			{
				path: "/management/diets",
				icon: <ArchiveBoxIcon className={iconClasses} />,
				name: "Diets",
			},
		],
	},
];

export default routes;
