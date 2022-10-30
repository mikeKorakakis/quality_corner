import React from "react";

interface Props {
	lines?: number;
}
export default function Skeleton({ lines = 10 }: Props) {
	return (
		<>
			{Array.from({ length: lines }).map((_, index) => (
				<tr key={index} role="status" className="animate-pulse w-full ">
					<td
						className="px-3 text-sm"
						colSpan={20}
					>
						<div className="h-8 my-[-4px] bg-gray-300 rounded-2xl w-full"></div>
					</td>
				</tr>
			))}
		</>
	);
}
