"use client";
import { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import useStore from "@/components/common/StoreForSearch";

type status = {
	Date: string,
	clientSMS: string,
	clientEmail: string,
	companyEmail: string,
	Name: string,
}

type stat = {
	Date: string,
	clientAdded: string,
	clientRemoved: string,
	companyAdded: string,
	companyRemoved: string,
}

const TableHome = () => {
	const [statuses, setStatuses] = useState<status[]>([]);
	const [stats, setStats] = useState<stat[]>([]);
	const [filteredStatus, setFilteredStatus] = useState<status[]>([]);
	const searchTerm = useStore((state) => state.searchTerm);
	const setSearchTerm = useStore((state) => state.setSearchTerm);

	const getEmailSMSstatuses = async () => {
		try {
			const timestamp = new Date().toISOString();
			await fetch(`/api/readStatus_emailSMS/${timestamp}`, {
				method: "GET",
				cache: "no-store",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(response => response.json())
				.then(data => {
					setStatuses(data);
					// console.log(data);
				})
		} catch (error) {
			// console.log(error);
		}
		// console.log(statuses);
	}

	const getAddedDeletedClientsCompaniesStats = async () => {
		try {
			const timestamp = new Date().toISOString();
			await fetch(`/api/readStats_addedDeletedClientsCompanies/${timestamp}`, {
				method: "GET",
				cache: "no-store",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then(response => response.json())
				.then(data => {
					setStats(data);
					// console.log(data);
				})
		} catch (error) {
			// console.log(error);
		}
		// console.log(stats);
	}

	useEffect(() => {
		setSearchTerm("");
		getEmailSMSstatuses();
		getAddedDeletedClientsCompaniesStats();
		// console.log(stats);
	}, [setSearchTerm]);

	useEffect(() => {
		const filtered = statuses.filter((status) =>
			status.Date?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			status.clientSMS?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			status.clientEmail?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			status.companyEmail?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			status.Name?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "")
		);

		setFilteredStatus(filtered);
	}, [searchTerm, statuses]);

	return (
		<div className="rounded-sm border border-stroke bg-white pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
			<h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
				Emails and SMS sent
			</h4>

			<div className="flex flex-col">
				<div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
					<div className="p-2.5 xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Date
						</h5>
					</div>
					<div className="p-2.5 text-center xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Client SMS
						</h5>
					</div>
					<div className="p-2.5 text-center xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Client Email
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Company Email
						</h5>
					</div>
					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Name
						</h5>
					</div>
				</div>
				{filteredStatus?.length > 0 ? (
					<div>
						{filteredStatus.map((status, key) => (
							<div key={key}>
								<label htmlFor={`my_modal_${key}`} className={`grid grid-cols-3 sm:grid-cols-5 ${key === statuses.length - 1
									? ""
									: "border-b border-stroke dark:border-strokedark"
									}`} key={key}>

									<div className="flex items-center gap-3 p-2.5 xl:p-5">
										<p className="hidden text-black dark:text-white sm:block">
											{status.Date.split('T')[0]}
										</p>
									</div>

									<div className="flex items-center justify-center p-2.5 xl:p-5">
										<p className="text-black dark:text-white">{status.clientSMS}</p>
									</div>

									<div className="flex items-center justify-center p-2.5 xl:p-5">
										<p className="text-meta-3">{status.clientEmail}</p>
									</div>

									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-meta-5">{status.companyEmail}</p>
									</div>

									<div className="flex items-center justify-center p-2.5 xl:p-5">
										<p className="text-black dark:text-white">{status.Name}</p>
									</div>

								</label>
								{/* <ModalCompany companyId={company.CompanyId} modalId={`my_modal_${key}`} companyName={company.CompanyName} TVA={company.TVA} shareholders={company.Shareholders}
									CIF={company.CIF} COM={company.COM} headquarter={company.Headquarter} subsidiary={company.Subsidiary}
									mainActivity={company.MainActivity} secondaryActivity={company.SecondaryActivity} interests={company.Interests} secondButton={false} /> */}
							</div>
						))}
					</div>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default TableHome;
