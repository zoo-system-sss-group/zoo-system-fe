import Subtitle from "../Typography/Subtitle";

function TitleCard({
	title,
	children,
	topMargin,
	searchInput,
	TopSideButtons,
}) {
	return (
		<div
			className={
				"card w-full p-4 bg-base-100 shadow-xl " + (topMargin || "mt-6")
			}
		>
			{/* Title for Card */}
			<Subtitle styleClass={TopSideButtons ? "" : ""}>
				<span className="inline-block mt-2 ml-2">{title}</span>

				{/* Top side button, show only if present */}
				{TopSideButtons && (
					<div className="inline-block float-right">{TopSideButtons}</div>
				)}
				{searchInput && (
					<div className="inline-block float-right mr-4">{searchInput}</div>
				)}
			</Subtitle>

			<div className="divider mt-2"></div>

			{/** Card Body */}
			<div className="h-full w-full pb-6 bg-base-100">{children}</div>
		</div>
	);
}

export default TitleCard;
