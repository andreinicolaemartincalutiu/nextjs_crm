"use client";
import React, { useEffect, useRef, useState } from "react";
import { createHash } from "crypto";
import ModalServices from "@/components/Services/ModalServices";
import Loader from "@/components/common/Loader";
import useStore from "@/components/common/StoreForSearch";
import InfoPopup from "@/components/common/InfoPopup";
import HandleFileImport from "@/components/common/HandleFileImport";

type service = {
	Id: string,
	Name: string,
	Description: string,
	Price: string,
}

const TableServices = () => {
	const [services, setServices] = useState<service[]>([]);
	const [filteredService, setFilteredService] = useState<service[]>([]);
	const searchTerm = useStore((state: any) => state.searchTerm);
	const setSearchTerm = useStore((state: any) => state.setSearchTerm);
	const userPermissions = sessionStorage.getItem("Level");

	const getServices = async () => {
		try {
			const timestamp = new Date().toISOString();
			await fetch(`api/readService/${timestamp}`, {
				method: "GET",
				cache: "no-store",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(response => {
					if (!response.ok) {
						InfoPopup("Failed to load services");
					}
					return response.json();
				})
				.then(data => {
					setServices(data);
				});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setSearchTerm("");
		getServices();
	}, [setSearchTerm]);

	useEffect(() => {
		const filtered = services.filter((service) =>
			service.Name?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			service.Description?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			service.Price?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "")
		);

		setFilteredService(filtered);
	}, [services, searchTerm]);

	const handleButtonClick = () => {
		const fileInput = document.getElementById("servicesImport") as HTMLInputElement;
		if (fileInput) {
			fileInput.value = "";
			fileInput.click();
		}
	};

	return (
		<div className="rounded-sm border border-stroke bg-white pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
			<div className="flex w-full">
				<h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
					Services
				</h4>
				{userPermissions === createHash("sha512").update("admin", "utf8").digest("hex") ? (
					<div className="w-full flex flex-col items-end">
						<button className="btn" style={{ color: "white", backgroundColor: "#007bff", margin: "3px" }} onClick={handleButtonClick}>
							<svg
								className="fill-current"
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 3V15M12 3L8 7M12 3L16 7M4 20H20M4 20V16M20 20V16"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</button>
						<input
							id="servicesImport"
							type="file"
							style={{ display: "none" }}
							accept=".tsv"
							onChange={(e) => HandleFileImport(e, "se")}
						/>
					</div>
				) : (
					<></>
				)}
			</div>

			<div className="flex flex-col">
				<div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-3">
					<div className="p-2.5 xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Service Name
						</h5>
					</div>
					<div className="p-2.5 text-center xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Description
						</h5>
					</div>
					<div className="p-2.5 text-center xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Price
						</h5>
					</div>
				</div>

				{filteredService?.length > 0 ? (
					<div>
						{filteredService.map((service, key) => (
							<div key={key}>
								<label htmlFor={`my_modal_${key}`} className={`grid grid-cols-3 sm:grid-cols-3 ${key === services.length - 1
									? ""
									: "border-b border-stroke dark:border-strokedark"
									}`}>
									<div className="flex items-center gap-3 p-2.5 xl:p-5">
										<p className="hidden text-black dark:text-white sm:block">
											{service.Name}
										</p>
									</div>

									<div className="flex items-center justify-center p-2.5 xl:p-5">
										<p className="text-black dark:text-white">{service.Description}</p>
									</div>

									<div className="flex items-center justify-center p-2.5 xl:p-5">
										<p className="text-meta-3">{service.Price}</p>
									</div>

								</label>
								{/* {userPermissions === createHash("sha512").update("admin", "utf8").digest("hex") ? ( */}
								<ModalServices Id={service.Id} modalId={`my_modal_${key}`} name={service.Name} description={service.Description} price={service.Price} secondButton={false} />
								{/* ) : (
									<></>
								)} */}
							</div>
						))}
					</div>
				) : (
					<Loader />
				)}
			</div>
		</div >
	);
};

export default TableServices;
