"use client";
import { ApexOptions } from "apexcharts";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import InfoPopup from "@/components/common/InfoPopup";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
	ssr: false,
});

interface Stat {
	Date: string;
	clients: string;
	companies: string;
}

const ChartOne: React.FC = () => {
	const [statsData, setStatsData] = useState<Stat[]>([]);
	const [xAxisMetric, setxAxisMetric] = useState<any>([]);
	const [valuesClients, setValuesClients] = useState<any>([]);
	const [valuesCompanies, setValuesCompanies] = useState<any>([]);

	const getNamesOfLast7Days = (dateStr: string): string[] => {
		const date = new Date(dateStr);
		const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		const last7Days: string[] = [];
		for (let i = 6; i >= 0; i--) {  // Start from 6 and move backwards to 0
			const pastDate = new Date(date);
			pastDate.setDate(date.getDate() - i);
			last7Days.push(daysOfWeek[pastDate.getDay()]);
		}
		return last7Days;
	};

	const daysUntilOneMonthBefore = (dateString: string) => {
		// Parse the input date string
		const givenDate = new Date(dateString);

		// Check for invalid date
		if (isNaN(givenDate.getTime())) {
			throw new Error("Invalid date format");
		}

		// Subtract one month from the given date
		const oneMonthBefore = new Date(givenDate);
		oneMonthBefore.setMonth(oneMonthBefore.getMonth() - 1);

		// Calculate the difference in days
		const differenceInTime = givenDate.getTime() - oneMonthBefore.getTime();
		const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);

		return Math.round(differenceInDays);
	};

	const getDatesOfLast30Days = (date: string) => {
		const inputDate = new Date(date);
		const datesArray = [];

		for (let i = daysUntilOneMonthBefore(date); i >= 0; i--) {
			const pastDate = new Date(inputDate);
			pastDate.setDate(inputDate.getDate() - i);

			const day = pastDate.getDate().toString().padStart(2, '0');
			const month = (pastDate.getMonth() + 1).toString().padStart(2, '0');

			datesArray.push(`${day}.${month}`);
		}
		return datesArray;
	};

	const getNamesOfLast12Months = (dateString: string) => {
		const date = new Date(dateString);
		const months = [
			"Jan", "Feb", "Mar", "Apr", "May", "Jun",
			"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
		];

		let result = [];
		for (let i = 12; i > 0; i--) {
			let d = new Date(date);
			d.setMonth(date.getMonth() - i);
			result.push(months[d.getMonth()]);
		}

		return result;
	};

	const getAttributesOfLastNObjects = (attribute: keyof Stat, noOfObjects: number) => {
		return statsData.slice(0, noOfObjects).map(obj => obj[attribute]).reverse();
	};

	const getLastDatasOfMonths = (key: keyof Stat) => {
		const lastDatesMap: Stat[] = [];

		let leng = statsData.length;
		let count = 0;
		for (let i = 0; i < leng && count < 12; ++i) {
			const date = new Date(statsData[i].Date.split('T')[0]);

			const year = date.getFullYear();
			const month = date.getMonth();

			// Get the next month's first day and subtract one day to get the last day of the current month
			const lastDayOfMonth = new Date(year, month + 1, 0);
			const yyyy = lastDayOfMonth.getFullYear();
			const mm = String(lastDayOfMonth.getMonth() + 1).padStart(2, '0'); // Months are 0-based
			const dd = String(lastDayOfMonth.getDate()).padStart(2, '0');

			const lastDateString = `${yyyy}-${mm}-${dd}`;

			if (statsData[i].Date.includes(lastDateString)) {
				++count;
				lastDatesMap.push(statsData[i]);
			}
		}

		// Fill missing months with default values
		const date = new Date(lastDatesMap[0].Date);
		for (let i = lastDatesMap.length; i < 12; i++) {

			const currentMonth = new Date(date);
			currentMonth.setMonth(date.getMonth() - i);

			// Set the date to the last day of the current month
			currentMonth.setMonth(currentMonth.getMonth() + 1); // Move to the next month
			currentMonth.setDate(0); // Set to the last day of the previous month (which is the current month)

			// Add the formatted end of the month date to the array
			lastDatesMap.push({ Date: currentMonth.toISOString().split('T')[0], clients: "0", companies: "0" });
		}

		let separatedResults = [];

		for (let i = lastDatesMap.length - 1; i >= 0; --i) {
			separatedResults.push(
				lastDatesMap[i][key]
			);
		}

		return separatedResults;
	};

	useEffect(() => {
		const getStats = async () => {
			try {
				const timestamp = new Date().toISOString();
				await fetch(`/api/readStats_addedDeletedClientsCompanies/${timestamp}`, {
					method: "GET",
					cache: "no-store",
					headers: {
						"Content-Type": "application/json",
					}
				}).then(response => response.json())
					.then(data => {
						setStatsData(data.response);
						setxAxisMetric(getNamesOfLast7Days(data.response[0].Date));
						setValuesClients(data.response.slice(0, 7).map((obj: any) => obj.clients).reverse());
						setValuesCompanies(data.response.slice(0, 7).map((obj: any) => obj.companies).reverse());
					})
			} catch (error) {
				InfoPopup("Database connection error");
			}
		};
		getStats();
	}, []);

	let options: ApexOptions = {
		legend: {
			show: false,
			position: "top",
			horizontalAlign: "left",
		},
		colors: ["#3C50E0", "#80CAEE"],
		chart: {
			fontFamily: "Satoshi, sans-serif",
			height: 335,
			type: "area",
			dropShadow: {
				enabled: true,
				color: "#623CEA14",
				top: 10,
				blur: 4,
				left: 0,
				opacity: 0.1,
			},

			toolbar: {
				show: false,
			},
		},
		responsive: [
			{
				breakpoint: 1024,
				options: {
					chart: {
						height: 300,
					},
				},
			},
			{
				breakpoint: 1366,
				options: {
					chart: {
						height: 350,
					},
				},
			},
		],
		stroke: {
			width: [2, 2],
			curve: "straight",
		},
		grid: {
			xaxis: {
				lines: {
					show: true,
				},
			},
			yaxis: {
				lines: {
					show: true,
				},
			},
		},
		dataLabels: {
			enabled: false,
		},
		markers: {
			size: 4,
			colors: "#fff",
			strokeColors: ["#3056D3", "#80CAEE"],
			strokeWidth: 3,
			strokeOpacity: 0.9,
			strokeDashArray: 0,
			fillOpacity: 1,
			discrete: [],
			hover: {
				size: undefined,
				sizeOffset: 5,
			},
		},
		xaxis: {
			type: "category",
			categories: xAxisMetric,
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
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
	};

	const series = [
		{
			name: "Total Clients",
			data: valuesClients,
		},
		{
			name: "Total Companies",
			data: valuesCompanies,
		},
	];

	return (
		<div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
			<div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
				<div className="flex w-full flex-wrap gap-3 sm:gap-5">
					<div className="flex min-w-47.5">
						<span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-primary">
							<span className="block h-2.5 w-full max-w-2.5 rounded-full bg-primary"></span>
						</span>
						<div className="w-full">
							<p className="font-semibold text-primary">Total Clients</p>
						</div>
					</div>
					<div className="flex min-w-47.5">
						<span className="mr-2 mt-1 flex h-4 w-full max-w-4 items-center justify-center rounded-full border border-secondary">
							<span className="block h-2.5 w-full max-w-2.5 rounded-full bg-secondary"></span>
						</span>
						<div className="w-full">
							<p className="font-semibold text-secondary">Total Companies</p>
						</div>
					</div>
				</div>
				<div className="flex w-full max-w-45 justify-end">
					<div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
						<button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
							onClick={() => {
								setxAxisMetric(getNamesOfLast7Days(statsData[0].Date));
								setValuesClients(getAttributesOfLastNObjects("clients", 7));
								setValuesCompanies(getAttributesOfLastNObjects("companies", 7));
							}}
						>
							Week
						</button>
						<button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
							onClick={() => {
								setxAxisMetric(getDatesOfLast30Days(statsData[0].Date.split('T')[0]));
								setValuesClients(getAttributesOfLastNObjects("clients", daysUntilOneMonthBefore(statsData[0].Date.split('T')[0]) + 1));
								setValuesCompanies(getAttributesOfLastNObjects("companies", daysUntilOneMonthBefore(statsData[0].Date.split('T')[0]) + 1));
							}}
						>
							Month
						</button>
						<button className="rounded px-3 py-1 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark"
							onClick={() => {
								setxAxisMetric(getNamesOfLast12Months(statsData[0].Date));
								setValuesClients(getLastDatasOfMonths("clients"));
								setValuesCompanies(getLastDatasOfMonths("companies"));
							}}
						>
							Year
						</button>
					</div>
				</div>
			</div>

			<div>
				<div id="chartOne" className="-ml-5">
					<ReactApexChart
						options={options}
						series={series}
						type="area"
						height={350}
						width={"100%"}
					/>
				</div>
			</div>
		</div>
	);
};

export default ChartOne;
