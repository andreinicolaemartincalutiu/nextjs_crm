"use client";
import ChartOne from "@/components/Home/ChartOne";
import ChartTwo from "@/components/Home/ChartTwo";
import dynamic from "next/dynamic";
import React from "react";

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
