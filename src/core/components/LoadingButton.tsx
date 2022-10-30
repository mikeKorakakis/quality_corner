import clsx from "clsx";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface Props {
	onClick?: (e: any) => any;    
	children?: React.ReactNode;
	className?: string;
	type?: "button" | "submit" | "reset" | undefined;
	disabled?: boolean;
	loading?: boolean;
}
const disabled_style = "cursor-not-allowed disabled:opacity-50";
const loading_style = "inline-flex transition ease-in-out duration-150 cursor-not-allowed ";
export default function Button(props: Props & ButtonHTMLAttributes<HTMLButtonElement>) {
	const { children, loading, disabled, type = "button", className, ...rest } = props;

	return (
		<button
			{...rest}
			type={type}
			className={clsx(className, disabled && disabled_style, loading && loading_style)}
			// className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-indigo-500 hover:bg-indigo-400 transition ease-in-out duration-150 cursor-not-allowed"
			disabled={disabled}
		>
			{loading && (
				<svg
					className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			)}
			{children}
		</button>
	);
}
