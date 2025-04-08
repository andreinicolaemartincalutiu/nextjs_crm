"use client";
import React, { useEffect, useRef, useState } from "react";
import { createHash } from "crypto";
import ModalCompany from "@/components/CompanyInfo/ModalCompany";
import Loader from "@/components/common/Loader";
import useStore from "@/components/common/StoreForSearch";
import InfoPopup from "@/components/common/InfoPopup";
import HandleFileImport from "@/components/common/HandleFileImport";
import ModalEmail from "@/components/CompanyInfo/ModalEmail";
import ModalPDF from "@/components/common/ModalPDF";

type company = {
	CompanyId: string,
	CompanyName: string,
	TVA: string,
	Shareholders: string,
	CIF: string,
	COM: string,
	Headquarter: string,
	Subsidiary: string,
	MainActivity: string,
	SecondaryActivity: string,
	Interests: string,
	Email: string,
	Region: string,
	Employees: string,
	StatusEmail: string,
	DataYear: string,
	Profit: string,
	Loss: string,
	Turnover: string,
	Capital: string,
	Liabilities: string,
	Assets: string,
	IsActive: string
}

const TableCompanyInfo = () => {
	const userPermissions = sessionStorage.getItem("Level");
	const [companies, setCompanies] = useState<company[]>([]);
	const [filteredCompany, setFilteredCompany] = useState<company[]>([]);
	const searchTerm = useStore((state: any) => state.searchTerm);
	const setSearchTerm = useStore((state: any) => state.setSearchTerm);
	const [offerServicesArray, setOfferServicesArray] = useState<string[]>([]);
	const [discountPercent, setDiscountPercent] = useState<string>("");
	const [offerDescription, setOfferDescription] = useState<string>("");

	const getCompanies = async () => {
		let companiesArray: { CompanyId: String, CompanyName: String }[] = [];
		try {
			const timestamp = new Date().toISOString();
			await fetch(`/api/readCompanyInfo/${timestamp}`, {
				method: "GET",
				cache: "no-store",
				headers: {
					"Content-Type": "application/json",
				}
			})
				.then(response => {
					if (!response.ok) {
						InfoPopup("Failed to load companies info");
					}
					return response.json()
				})
				.then(data => {
					setCompanies(data);
					data.forEach((element: any) => {
						companiesArray.push({ CompanyId: element.CompanyId, CompanyName: element.CompanyName })
					});
					sessionStorage.setItem("companiesArray", JSON.stringify(companiesArray));
				})
		} catch (error) {
			InfoPopup("Connection error");
		}
	};

	useEffect(() => {
		setSearchTerm("");
		getCompanies();
	}, [setSearchTerm]);

	useEffect(() => {
		const filtered = companies.filter((company) =>
			company.CompanyName?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.TVA?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.Shareholders?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.CIF?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.COM?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.Headquarter?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.Subsidiary?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.MainActivity?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.SecondaryActivity?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.Interests?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.Email?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.Region?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.Employees?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.StatusEmail?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.DataYear?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.Profit?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.Loss?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.Turnover?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.Capital?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.Liabilities?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.Assets?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "") ||
			company.IsActive?.toString()?.toLowerCase()?.includes(searchTerm?.toLowerCase() ?? "")
		);

		setFilteredCompany(filtered);
	}, [companies, searchTerm]);

	const handleButtonClick = () => {
		const fileInput = document.getElementById("companiesImport") as HTMLInputElement;
		if (fileInput) {
			fileInput.value = "";
			fileInput.click();
		}
	};

	const handleDataFromChild = (offerServicesArray: string[], discountPercent: string, offerDescription: string) => {
		setOfferServicesArray(offerServicesArray);
		setDiscountPercent(discountPercent);
		setOfferDescription(offerDescription);
	};

	return (
		<div className="rounded-sm border border-stroke bg-white pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
			<div className="flex w-full">
				<h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
					Companies
				</h4>

				<div className="w-full flex flex-col items-end">
					<h6>
						<label htmlFor="modalEmail" className="btn" style={{ color: "white", backgroundColor: "#007bff", margin: "3px" }} title="Email">
							<svg
								className="fill-current"
								width="22"
								height="22"
								viewBox="0 0 22 22"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
									fill=""
								/>
							</svg>
						</label>
						<ModalEmail modalId="modalEmail" modalId2="modalPDF" filteredCompanies={filteredCompany} offerServicesArray={offerServicesArray}
							discountPercent={discountPercent} offerDescription={offerDescription} />
						<ModalPDF modalId="modalPDF" handleDataFromChild={handleDataFromChild} />


						{userPermissions === createHash("sha512").update("admin", "utf8").digest("hex") ? (
							<>
								<button className="btn" style={{ color: "white", backgroundColor: "#007bff", margin: "3px" }} onClick={handleButtonClick} title="Import data">
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
									id="companiesImport"
									type="file"
									style={{ display: "none" }}
									accept=".tsv"
									onChange={(e) => HandleFileImport(e, "co")}
								/>
							</>
						) : (
							<></>
						)}
					</h6>
				</div>
			</div>

			<div className="flex flex-col">
				<div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-4">
					<div className="p-2.5 xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Name
						</h5>
					</div>

					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							CIF
						</h5>
					</div>

					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Headquarter
						</h5>
					</div>

					<div className="hidden p-2.5 text-center sm:block xl:p-5">
						<h5 className="text-sm font-medium uppercase xsm:text-base">
							Interests
						</h5>
					</div>
				</div>
				{filteredCompany?.length > 0 ? (
					<div>
						{filteredCompany.map((company, key) => (
							<div key={key}>
								<label htmlFor={`my_modal_${key}`} className={`grid grid-cols-3 sm:grid-cols-4 ${key === companies.length - 1
									? ""
									: "border-b border-stroke dark:border-strokedark"
									}`} key={key}>

									<div className="flex items-center gap-3 p-2.5 xl:p-5">
										<p className="hidden text-black dark:text-white sm:block">
											{company.CompanyName}
										</p>
									</div>

									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-black dark:text-white">{company.CIF}</p>
									</div>

									<div className="flex items-center justify-center p-2.5 xl:p-5">
										<p className="text-black dark:text-white">{company.Headquarter}</p>
									</div>

									<div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
										<p className="text-meta-5">{company.Interests}</p>
									</div>
								</label>
								{/* {userPermissions === createHash("sha512").update("admin", "utf8").digest("hex") ? ( */}
								<ModalCompany modalId={`my_modal_${key}`} company={company} secondButton={false} />
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
		</div>
	);
};

export default TableCompanyInfo;
