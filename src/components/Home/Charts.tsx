"use client";
import dynamic from "next/dynamic";
import React from "react";

const ChartOne = dynamic(() => import("@/components/Home/ChartOne"), {
	ssr: false,
});

const ChartTwo = dynamic(() => import("@/components/Home/ChartTwo"), {
	ssr: false,
});

const ChartThree = dynamic(() => import("@/components/Home/ChartThree"), {
	ssr: false,
});

const Charts: React.FC = () => {
	return (
		<div className="grid grid-cols-12 gap-4 md:gap-6 2xl:gap-7.5">
			<div className="col-span-12">
				<ChartOne />
			</div>

			<div className="col-span-12 flex gap-4">
				<div className="flex-1">
					<ChartTwo />
				</div>
				<div className="flex-1">
					<ChartThree />
				</div>
			</div>
		</div>
	);
};

export default Charts;
