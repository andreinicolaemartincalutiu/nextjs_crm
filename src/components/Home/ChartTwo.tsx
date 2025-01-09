"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import InfoPopup from "@/components/common/InfoPopup";
import Loader from "../common/Loader";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

const options: ApexOptions = {
	colors: ["#3C50E0", "#80CAEE", "#8800CC"],
	chart: {
		fontFamily: "Satoshi, sans-serif",
		type: "bar",
		height: 335,
		stacked: false,
		toolbar: {
			show: false,
		},
		zoom: {
			enabled: false,
		},
	},

	responsive: [
		{
			breakpoint: 1536,
			options: {
				plotOptions: {
					bar: {
						borderRadius: 0,
						columnWidth: "35%",
					},
				},
			},
		},
	],
	plotOptions: {
		bar: {
			horizontal: false,
			borderRadius: 0,
			columnWidth: "35%",
			borderRadiusApplication: "end",
			borderRadiusWhenStacked: "last",
		},
	},
	dataLabels: {
		enabled: false,
	},

	xaxis: {
		categories: ["Client SMS", "Client Email", "Company Email"],
	},

	yaxis: {
		forceNiceScale: true,  // Ensures nice rounding
		decimalsInFloat: 0,    // Ensures no decimal places
		labels: {
			formatter: function (value) {
				return Math.round(value).toString();  // Ensures only whole numbers
			}
		}
	},

	legend: {
		position: "top",
		horizontalAlign: "left",
		fontFamily: "Satoshi",
		fontWeight: 500,
		fontSize: "14px",

		markers: {
			radius: 99,
		},
	},
	fill: {
		opacity: 1,
	},
};

interface ChartTwoState {
	series: {
		name: string;
		data: number[];
	}[];
}

interface DailyTotals {
	TotalClientSMS: any,
	TotalClientEmail: any,
	TotalCompanyEmail: any
}

const ChartTwo: React.FC = () => {
	const [dailyTotals, setDailyTotals] = useState<DailyTotals>();
	const series = [
		{
			name: "Client SMS",
			data: [dailyTotals?.TotalClientSMS, 0, 0],
		},
		{
			name: "Client Email",
			data: [0, dailyTotals?.TotalClientEmail, 0],
		},
		{
			name: "Company Email",
			data: [0, 0, dailyTotals?.TotalCompanyEmail],
		},
	];

	const getData = async () => {
		try {
			await fetch(`/api/readDailyTotals`, {
				method: "GET",
			}).then(response => {
				if (!response.ok) {
					InfoPopup("Failed to load clients");
				}
				return response.json()
			})
				.then(dailyTotals => {
					console.log(dailyTotals);
					console.log(dailyTotals[0]);
					console.log(dailyTotals[0][0].TotalClientSMS);
					console.log(dailyTotals[0][0].TotalCompanyEmail);
					setDailyTotals(dailyTotals[0][0]);
				})
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		console.log(dailyTotals?.TotalClientSMS);
		getData();
	}, []);

	return (
		<div className="h-full col-span-12 rounded-sm border border-stroke bg-white p-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
			<div className="mb-4 justify-between gap-4 sm:flex">
				<div>
					<h4 className="text-xl font-semibold text-black dark:text-white">
						Daily Activity
					</h4>
				</div>
				<div>
					<div className="relative z-20 inline-block">
					</div>
				</div>
			</div>

			<div>
				<div id="chartTwo" className="-mb-9 -ml-5">

					{dailyTotals?.TotalClientSMS === undefined ?
						<Loader />
						:
						<ReactApexChart
							options={options}
							series={series}
							type="bar"
							height={350}
							width={"100%"}
						/>
					}
				</div>
			</div>
		</div>
	);
};

export default ChartTwo;
