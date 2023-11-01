export default function Progress({ value, max }) {
	return (
		<>
			<progress
				className="progress progress-success w-full h-6"
				value={value}
				max={max}
			></progress>
		</>
	);
}
