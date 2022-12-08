import clsx from "clsx";

export default function LoadingPage({ page = true }: { page?: boolean }) {
	return (
		<div className={clsx("flex  items-center justify-center", page ? "h-screen -m-36" : "h-64")}>
			<div
				className={clsx(
					" border border-neutral rounded-xl animate-ping",
					page ? "w-24 h-24" : "w-12 h-12"
				)}
			></div>
           
		</div>
	);
}
