"use client";
import React, { useState } from "react";
import InfoPopup from "@/components/common/InfoPopup";
import LoadingPopup from "@/components/common/LoadingPopup";
import { createHash } from "crypto";
import { Company, getEmptyCompany } from "@/types/Company";

export const addCompany = async (
	companyName: string | undefined,
	TVA: string | undefined,
	shareholders: string | undefined,
	CIF: string | undefined,
	COM: string | undefined,
	headquarter: string | undefined,
	subsidiary: string | undefined,
	mainActivity: string | undefined,
	secondaryActivity: string | undefined,
	interests: string | undefined,
	email: string | undefined,
	region: string | undefined,
	employees: string | undefined,
	dataYear: string | undefined,
	profit: string | undefined,
	loss: string | undefined,
	turnover: string | undefined,
	capital: string | undefined,
	liabilities: string | undefined,
	assets: string | undefined,
	isActive: string | undefined,
	modalId?: string,
	anafApiCalledStatus?: boolean
) => {
	let modalInput, addSuccessfuly = "0";
	if (modalId) { // add data manualy
		modalInput = document.getElementById(modalId) as HTMLInputElement;
		if (!TVA || !shareholders || !CIF || !subsidiary || !mainActivity || !email) {
			if (modalInput?.checked) {
				InfoPopup("Missing some required fields");
			}
			return addSuccessfuly;
		}
		if (anafApiCalledStatus === false) {
			InfoPopup("Load Data first");
			return;
		}
		if (companyName === "") {
			companyName = "-";
		}
		if (TVA === "") {
			TVA = "-"
		}
		if (shareholders === "") {
			shareholders = "-"
		}
		if (CIF === "") {
			CIF = "-"
		}
		if (COM === "") {
			COM = "-";
		}
		if (headquarter === "") {
			headquarter = "-";
		}
		if (subsidiary === "") {
			subsidiary = "-";
		}
		if (mainActivity === "") {
			mainActivity = "-";
		}
		if (secondaryActivity === "") {
			secondaryActivity = "-";
		}
		if (interests === "") {
			interests = "-";
		}
		if (email === "") {
			email = "-";
		}
		if (region === "") {
			region = "-";
		}
		if (employees === "") {
			employees = "-";
		}
		if (dataYear === "") {
			dataYear = "-";
		}
		if (profit === "") {
			profit = "-";
		}
		if (loss === "") {
			loss = "-";
		}
		if (turnover === "") {
			turnover = "-";
		}
		if (capital === "") {
			capital = "-";
		}
		if (liabilities === "") {
			liabilities = "-";
		}
		if (assets === "") {
			assets = "-";
		}
		if (isActive === "") {
			assets = "-";
		}
	} else { // add data with import tsv
		if (companyName === "" || companyName === undefined || companyName === null ||
			TVA === "" || TVA === undefined || TVA === null ||
			shareholders === "" || shareholders === undefined || shareholders === null ||
			CIF === "" || CIF === undefined || CIF === null ||
			COM === "" || COM === undefined || COM === null ||
			headquarter === "" || headquarter === undefined || headquarter === null ||
			subsidiary === "" || subsidiary === undefined || subsidiary === null ||
			mainActivity === "" || mainActivity === undefined || mainActivity === null ||
			secondaryActivity === "" || secondaryActivity === undefined || secondaryActivity === null ||
			interests === "" || interests === undefined || interests === null ||
			email === "" || email === undefined || email === null ||
			region === "" || region === undefined || region === null ||
			employees === "" || employees === undefined || employees === null ||
			dataYear === "" || dataYear === undefined || dataYear === null ||
			profit === "" || profit === undefined || profit === null ||
			loss === "" || loss === undefined || loss === null ||
			turnover === "" || turnover === undefined || turnover === null ||
			capital === "" || capital === undefined || capital === null ||
			liabilities === "" || liabilities === undefined || liabilities === null ||
			assets === "" || assets === undefined || assets === null ||
			isActive === "" || isActive === undefined || isActive === null
		) {
			return addSuccessfuly;
		}
	}
	try {
		const response = await fetch(`/api/insertCompanyInfo`, {
			method: "POST",
			cache: "no-store",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				CompanyName: companyName,
				TVA: TVA,
				Shareholders: shareholders,
				CIF: CIF,
				COM: COM,
				Headquarter: headquarter,
				Subsidiary: subsidiary,
				MainActivity: mainActivity,
				SecondaryActivity: secondaryActivity,
				Interests: interests,
				Email: email,
				Region: region,
				Employees: employees,
				DataYear: dataYear,
				Profit: profit,
				Loss: loss,
				Turnover: turnover,
				Capital: capital,
				Liabilities: liabilities,
				Assets: assets,
				IsActive: isActive,
			}),
		});
		if (!response.ok) {
			if (modalInput?.checked) {
				InfoPopup("Changes not saved");
			}
			const error = await response.json();
			throw new Error(`Error: ${error.message}`);
		} else {
			addSuccessfuly = "1";
			if (modalInput?.checked) {
				modalInput.checked = false;
				InfoPopup("Changes saved");
			}
			window.location.reload();
		}
	} catch (error) {
		console.log(error);
	}
	return addSuccessfuly;
};

const ModalCompany = (props: any) => {
	const userPermissions = sessionStorage.getItem("Level");
	const [company, setCompany] = useState<Company>(props?.company ?? getEmptyCompany());
	const [anafApiCalledStatus, setAnafApiCalledStatus] = useState<boolean>(false);

	const updateCompany = async () => {
		if (!company.TVA || !company.Shareholders || !company.CIF || !company.Subsidiary || !company.MainActivity || !company.Email) {
			InfoPopup("Missing some required fields");
			return;
		}
		if (company.CompanyName === "") {
			company.CompanyName = "-";
		}
		if (company.TVA === "") {
			company.TVA = "-";
		}
		if (company.Shareholders === "") {
			company.Shareholders = "-";
		}
		if (company.CIF === "") {
			company.CIF = "-";
		}
		if (company.COM === "") {
			company.COM = "-";
		}
		if (company.Headquarter === "") {
			company.Headquarter = "-";
		}
		if (company.Subsidiary === "") {
			company.Subsidiary = "-";
		}
		if (company.MainActivity === "") {
			company.MainActivity = "-";
		}
		if (company.SecondaryActivity === "") {
			company.SecondaryActivity = "-";
		}
		if (company.Interests === "") {
			company.Interests = "-";
		}
		if (company.Email === "") {
			company.Email = "-";
		}
		if (company.Region === "") {
			company.Region = "-";
		}
		if (company.Employees === "") {
			company.Employees = "-";
		}
		if (company.DataYear === "") {
			company.DataYear = "-";
		}
		if (company.Profit === "") {
			company.Profit = "-";
		}
		if (company.Loss === "") {
			company.Loss = "-";
		}
		if (company.Turnover === "") {
			company.Turnover = "-";
		}
		if (company.Capital === "") {
			company.Capital = "-";
		}
		if (company.Liabilities === "") {
			company.Liabilities = "-";
		}
		if (company.Assets === "") {
			company.Assets = "-";
		}
		if (company.IsActive === "") {
			company.IsActive = "-";
		}
		const modalInput = document.getElementById(props?.modalId) as HTMLInputElement;
		LoadingPopup(true);
		try {
			const response = await fetch(`/api/updateCompanyInfo/${company?.CompanyId}`, {
				method: "PUT",
				cache: "no-store",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					CompanyName: company?.CompanyName,
					TVA: company?.TVA,
					Shareholders: company?.Shareholders,
					CIF: company?.CIF,
					COM: company?.COM,
					Headquarter: company?.Headquarter,
					Subsidiary: company?.Subsidiary,
					MainActivity: company?.MainActivity,
					SecondaryActivity: company?.SecondaryActivity,
					Interests: company?.Interests,
					Email: company?.Email,
					Region: company?.Region,
					Employees: company?.Employees,
					DataYear: company?.DataYear,
					Profit: company?.Profit,
					Loss: company?.Loss,
					Turnover: company?.Turnover,
					Capital: company?.Capital,
					Liabilities: company?.Liabilities,
					Assets: company?.Assets,
					IsActive: company?.IsActive,
				}),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(`Error: ${error.message}`);
			} else {
				modalInput.checked = false;
				props?.onUpdateCompany(company);
				LoadingPopup(false);
				InfoPopup("Changes saved");
			}
		} catch (error) {
			LoadingPopup(false);
			InfoPopup("Connection error. Try again");
		}
	};

	const deleteCompany = async () => {
		const modalInput = document.getElementById(props?.modalId) as HTMLInputElement;
		LoadingPopup(true);
		try {
			const response = await fetch(`/api/deleteCompanyInfo/${company?.CompanyId}`, {
				method: "DELETE",
				cache: "no-store",
				headers: {
					"Content-Type": "application/json",
				}
			});
			if (!response.ok) {
				const error = await response.json();
				throw new Error(`Error: ${error.message}`);
			} else {
				modalInput.checked = false;
				props?.onDeleteCompany(company?.CompanyId);
				LoadingPopup(false);
				InfoPopup("Changes saved");
			}
		} catch (error) {
			console.log(error)
			LoadingPopup(false);
			InfoPopup("Connection error. Try again");
		}
	};

	const loadApiData = async () => {
		let dataApi1;
		let dataApi2;

		if (company?.CIF === "") {
			InfoPopup("CUI missing");
			return;
		}

		LoadingPopup(true);
		setAnafApiCalledStatus(true);
		try {
			const response1 = await fetch(`https://lista-firme.info/api/v1/info?cui=${encodeURIComponent(company?.CIF)}`, {
				method: "GET",
				cache: "no-store",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response1.ok) {
				throw new Error(`Failed with status: ${response1.status}`);
			}

			const data1 = await response1.json();
			dataApi1 = data1;
			if (data1?.message) {
				LoadingPopup(false);
				InfoPopup(data1.message);
				return;
			}

			const currentYear = new Date().getFullYear() - 1;

			const timestamp = new Date().toISOString();
			const response2 = await fetch(`/api/readAnafInfo/${timestamp}`, {
				method: "POST",
				cache: "no-store",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					an: currentYear,
					CIF: company?.CIF,
				}),
			});

			if (!response2.ok) {
				throw new Error(`Second API call failed with status: ${response2.status}`);
			}

			const data2 = await response2.json();

			if (data2.caen === 0) {
				let currentYear = new Date().getFullYear() - 2;
				const timestamp = new Date().toISOString();
				const response2 = await fetch(`/api/readAnafInfo/${timestamp}`, {
					method: "POST",
					cache: "no-store",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						an: currentYear,
						CIF: company?.CIF,
					}),
				});

				if (!response2.ok) {
					throw new Error(`Second API call failed with status: ${response2.status}`);
				}

				const data2 = await response2.json();
				dataApi2 = data2;
			}
			LoadingPopup(false);
			setCompany({ ...company, CompanyName: dataApi1?.name });
			setCompany({ ...company, COM: dataApi1?.reg_com })
			setCompany({ ...company, Headquarter: dataApi1?.info.address })
			setCompany({ ...company, Region: dataApi1?.address.county })
			setCompany({ ...company, IsActive: dataApi1?.status[0].details.description === "func?iune" ? "activa" : "inactiva" })
			setCompany({ ...company, DataYear: dataApi2?.an })
			setCompany({ ...company, MainActivity: dataApi2?.caen + " - " + dataApi2?.den_caen })
			setCompany({ ...company, Employees: dataApi2?.i[0].val_indicator.toString() })
			setCompany({ ...company, Profit: dataApi2?.i[2].val_indicator.toString() })
			setCompany({ ...company, Loss: dataApi2?.i[1].val_indicator.toString() })
			setCompany({ ...company, Turnover: dataApi2?.i[7].val_indicator.toString() })
			setCompany({ ...company, Capital: dataApi2?.i[10].val_indicator.toString() })
			setCompany({ ...company, Liabilities: dataApi2?.i[13].val_indicator.toString() })
			setCompany({ ...company, Assets: (dataApi2?.i[14].val_indicator + dataApi2?.i[18].val_indicator + dataApi2?.i[19].val_indicator).toString() })
		} catch (error) {
			console.log(error);
			LoadingPopup(false);
			InfoPopup("ANAF API connection error. Try again.");
		}
	};

	return (
		<>
			<input type="checkbox" id={props?.modalId} className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box w-[70%] max-w-3xl">
					<div className="grid grid-cols-1 sm:grid-rows-30">
						<label htmlFor={props?.modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>
						<p>Company name</p>
						<input type="text" placeholder="Company name" value={company?.CompanyName} className="flex items-center p-2.5 xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, CompanyName: e.target.value })} />
						<p>TVA <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="TVA" value={company?.TVA} className="flex items-center justify-center p-2.5 xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, TVA: e.target.value })} />
						<p>Shareholders <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="Shareholders" value={company?.Shareholders} className="flex items-center justify-center p-2.5 xl:p-5 text-meta-3 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, Shareholders: e.target.value })} />
						<p>CUI <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="CUI" value={company?.CIF} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, CIF: e.target.value })} />
						<p>COM</p>
						<input type="text" placeholder="COM" value={company?.COM} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, COM: e.target.value })} />
						<p>Headquarter</p>
						<input type="text" placeholder="Headquarter" value={company?.Headquarter} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, Headquarter: e.target.value })} />
						<p>Subsidiary <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="Subsidiary" value={company?.Subsidiary} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, Subsidiary: e.target.value })} />
						<p>Main activity <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="Main activity" value={company?.MainActivity} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, MainActivity: e.target.value })} />
						<p>Second activity</p>
						<input type="text" placeholder="Second activity" value={company?.SecondaryActivity} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, SecondaryActivity: e.target.value })} />
						<p>Interests</p>
						<input type="text" placeholder="Interests" value={company?.Interests} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, Interests: e.target.value })} />
						<p>Email <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="Email" value={company?.Email} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, Email: e.target.value })} />
						<p>Region</p>
						<input type="text" placeholder="Region" value={company?.Region} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, Region: e.target.value })} />
						<p>Employees</p>
						<input type="text" placeholder="Employees" value={company?.Employees} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, Employees: e.target.value })} />
						<p>Profit</p>
						<input type="text" placeholder="Profit" value={company?.Profit} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, Profit: e.target.value })} />
						<p>Loss</p>
						<input type="text" placeholder="Loss" value={company?.Loss} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, Loss: e.target.value })} />
						<p>Turnover</p>
						<input type="text" placeholder="Turnover" value={company?.Turnover} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, Turnover: e.target.value })} />
						<p>Capital</p>
						<input type="text" placeholder="Capital" value={company?.Capital} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, Capital: e.target.value })} />
						<p>Liabilities</p>
						<input type="text" placeholder="Liabilities" value={company?.Liabilities} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, Liabilities: e.target.value })} />
						<p>Assets</p>
						<input type="text" placeholder="Assets" value={company?.Assets} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, Assets: e.target.value })} />
						<p>isActive</p>
						<input type="text" placeholder="isActive" value={company?.IsActive} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setCompany({ ...company, IsActive: e.target.value })} />

						<p>Data from</p>
						<input type="text" placeholder="DataYear" value={company?.DataYear} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" disabled />
						{props?.secondButton === false ? (
							<>
								<p>Date last email sent</p>
								<input type="text" placeholder="Date last email sent" value={company?.StatusEmail === "" ? "-" : company?.StatusEmail?.toString().split('T')[0].split('-').reverse().join('-')} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" disabled />
							</>
						) : (
							<></>
						)}
					</div>
					<div className="modal-action">
						<button className="btn btn-outline btn-info" onClick={props?.secondButton === false ? loadApiData : loadApiData}>Load Data</button>
						<button className="btn btn-outline btn-success" onClick={props?.secondButton === false ? updateCompany : () => addCompany(
							company?.CompanyName,
							company?.TVA,
							company?.Shareholders,
							company?.CIF,
							company?.COM,
							company?.Headquarter,
							company?.Subsidiary,
							company?.MainActivity,
							company?.SecondaryActivity,
							company?.Interests,
							company?.Email,
							company?.Region,
							company?.Employees,
							company?.DataYear,
							company?.Profit,
							company?.Loss,
							company?.Turnover,
							company?.Capital,
							company?.Liabilities,
							company?.Assets,
							company?.IsActive,
							props?.modalId,
							anafApiCalledStatus
						)}>Save</button>
						{userPermissions === createHash("sha512").update("admin", "utf8").digest("hex") ?
							<button className="btn btn-outline btn-error" onClick={deleteCompany} disabled={props?.secondButton} style={{ display: props?.secondButton ? "none" : "inline-block" }}>Delete</button>
							: <></>}
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalCompany;
