"use client";
import React, { useState } from "react";
import InfoPopup from "@/components/common/InfoPopup";

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
	modalId?: string
) => {
	console.log(isActive);
	let modalInput, addSuccessfuly = "0";
	if (modalId) {
		modalInput = document.getElementById(modalId) as HTMLInputElement;
	}
	if (companyName === "" || companyName === undefined || companyName === null ||
		CIF === "" || CIF === undefined || CIF === null ||
		COM === "" || COM === undefined || COM === null ||
		headquarter === "" || headquarter === undefined || headquarter === null ||
		mainActivity === "" || mainActivity === undefined || mainActivity === null ||
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
		if (modalInput?.checked) {
			InfoPopup("Missing some required fields");
		}
		return addSuccessfuly;
	}
	try {
		const response = await fetch(`/api/insertCompanyInfo`, {
			method: "POST",
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
		console.log(response);
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
		console.error(error);
	}
	return addSuccessfuly;
}

const ModalCompany = (props: any) => {
	const [companyName, setCompanyName] = useState(props.company?.CompanyName || "");
	const [TVA, setTVA] = useState(props.company?.TVA || "0");
	const [shareholders, setShareholders] = useState(props.company?.Shareholders || "-");
	const [CIF, setCIF] = useState(props.company?.CIF || "");
	const [COM, setCOM] = useState(props.company?.COM || "");
	const [headquarter, setHeadquarter] = useState(props.company?.Headquarter || "");
	const [subsidiary, setSubsidiary] = useState(props.company?.Subsidiary || "-");
	const [mainActivity, setMainActivity] = useState(props.company?.MainActivity || "");
	const [secondaryActivity, setSecondaryActivity] = useState(props.company?.SecondaryActivity || "-");
	const [interests, setInterests] = useState(props.company?.Interests || "");
	const [email, setEmail] = useState(props.company?.Email || "");
	const [region, setRegion] = useState(props.company?.Region || "");
	const [employees, setEmployees] = useState(props.company?.Employees || "");
	const [dataYear, setDataYear] = useState(props.company?.DataYear || "");
	const [profit, setProfit] = useState(props.company?.Profit || "");
	const [loss, setLoss] = useState(props.company?.Loss || "");
	const [turnover, setTurnover] = useState(props.company?.Turnover || "");
	const [capital, setCapital] = useState(props.company?.Capital || "");
	const [liabilities, setLiabilities] = useState(props.company?.Liabilities || "");
	const [assets, setAssets] = useState(props.company?.Assets || "");
	const [isActive, setIsActive] = useState(props.company?.IsActive || "");
	const statusEmail = useState(props.company?.StatusEmail || "");
	
	const saveCompanyChanges = async () => {
		console.log(companyName);
		console.log(CIF);
		console.log(COM);
		console.log(headquarter);
		console.log(mainActivity);
		console.log(interests);
		console.log(email);
		console.log(region);
		console.log(dataYear);
		console.log(profit);
		console.log(loss);
		console.log(turnover);
		console.log(capital);
		console.log(liabilities);
		console.log(assets);
		console.log(isActive);

		if (companyName === "" || companyName === undefined || companyName === null ||
			CIF === "" || CIF === undefined || CIF === null ||
			COM === "" || COM === undefined || COM === null ||
			headquarter === "" || headquarter === undefined || headquarter === null ||
			mainActivity === "" || mainActivity === undefined || mainActivity === null ||
			interests === "" || interests === undefined || interests === null ||
			email === "" || email === undefined || email === null ||
			region === "" || region === undefined || region === null ||
			dataYear === "" || dataYear === undefined || dataYear === null ||
			profit === "" || profit === undefined || profit === null ||
			loss === "" || loss === undefined || loss === null ||
			turnover === "" || turnover === undefined || turnover === null ||
			capital === "" || capital === undefined || capital === null ||
			liabilities === "" || liabilities === undefined || liabilities === null ||
			assets === "" || assets === undefined || assets === null ||
			isActive === "" || isActive === undefined || isActive === null
		) {
			InfoPopup("Missing some required fields");
			return;
		}

		try {
			const response = await fetch(`/api/updateCompanyInfo/${props.company?.CompanyId}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					CompanyName: companyName,
					TVA: TVA.toString(),
					Shareholders: shareholders,
					CIF: CIF.toString(),
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
				const error = await response.json();
				throw new Error(`Error: ${error.message}`);
			}
		} catch (error) {
			console.error(error);
		}
		window.location.reload();
	}

	const deleteCompany = async () => {
		try {
			await fetch(`/api/deleteCompanyInfo/${props.company?.CompanyId}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				}
			});
		} catch (error) {
			console.error(error);
		}
		window.location.reload();
	}

	const loadApiData = async () => {
		let dataApi1;
		let dataApi2;

		try {
			if (!CIF.toString().trim()) {
				console.log('Input is empty. Please provide a value.');
				return;
			}
	
			const response1 = await fetch(`https://lista-firme.info/api/v1/info?cui=${encodeURIComponent(CIF)}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
	
			if (!response1.ok) {
				throw new Error(`Failed with status: ${response1.status}`);
			}
	
			const data1 = await response1.json();
			dataApi1 = data1;
			console.log('API Response:', data1);

			const currentYear = new Date().getFullYear() - 1;

			const response2 = await fetch(`https://cors-anywhere.herokuapp.com/https://webservicesp.anaf.ro/bilant?an=${currentYear}&cui=${encodeURIComponent(CIF)}`, {
				method: 'GET',
				// mode: "cors",
				headers: {
					'Content-Type': 'application/json',
					'x-requested-with': 'XMLHttpRequest',
				},
			});
	
			if (!response2.ok) {
				throw new Error(`Second API call failed with status: ${response2.status}`);
			}
	
			const data2 = await response2.json();

			if (data2.caen === 0) {
				let currentYear = new Date().getFullYear() - 2;
				const response2 = await fetch(`https://cors-anywhere.herokuapp.com/https://webservicesp.anaf.ro/bilant?an=${currentYear}&cui=${encodeURIComponent(CIF)}`, {
						method: 'GET',
						// mode: "cors",
						headers: {
							'Content-Type': 'application/json',
							'x-requested-with': 'XMLHttpRequest',
						},
					});
			
					if (!response2.ok) {
						throw new Error(`Second API call failed with status: ${response2.status}`);
					}
			
					const data2 = await response2.json();
					dataApi2 = data2;
					console.log('Second API Response:', data2);
			}

			setCompanyName(dataApi1.name);
			setCOM(dataApi1.reg_com);
			setHeadquarter(dataApi1.info.address);
			setRegion(dataApi1.address.county);
			setIsActive(dataApi1.status[0].details.description === "func?iune" ? "activa" : "inactiva");
			setDataYear(dataApi2.an);
			setMainActivity(dataApi2.caen + " - " + dataApi2.den_caen);
			setEmployees(dataApi2.i[0].val_indicator);
			setProfit(dataApi2.i[2].val_indicator);
			setLoss(dataApi2.i[1].val_indicator);
			setTurnover(dataApi2.i[7].val_indicator);
			setCapital(dataApi2.i[10].val_indicator);
			setLiabilities(dataApi2.i[13].val_indicator);
			setAssets(dataApi2.i[14].val_indicator + dataApi2.i[18].val_indicator + dataApi2.i[19].val_indicator);
			
		} catch (error) {
			console.error('Error calling API:', error);
		}

	};
	
	return (
		<>
			<input type="checkbox" id={props.modalId} className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box w-[70%] max-w-3xl">
					<div className="grid grid-cols-1 sm:grid-rows-30">
						<label htmlFor={props.modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>
						<p>Company name</p>
						<input placeholder="Company name" value={companyName} className="flex items-center p-2.5 xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setCompanyName(e.target.value)} />
						<p>TVA</p>
						<input type="number" placeholder="TVA" value={TVA} className="flex items-center justify-center p-2.5 xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setTVA(e.target.value)} />
						<p>Shareholders</p>
						<input placeholder="Shareholders" value={shareholders} className="flex items-center justify-center p-2.5 xl:p-5 text-meta-3 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setShareholders(e.target.value)} />
						<p>CIF</p>
						<input type="number" placeholder="CIF" value={CIF} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => 
							setCIF(e.target.value)}/>
						<p>COM</p>
						<input placeholder="COM" value={COM} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setCOM(e.target.value)} />
						<p>Headquarter</p>
						<input placeholder="Headquarter" value={headquarter} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setHeadquarter(e.target.value)} />
						<p>Subsidiary</p>
						<input placeholder="Subsidiary" value={subsidiary} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setSubsidiary(e.target.value)} />
						<p>Main activity</p>
						<input placeholder="Main activity" value={mainActivity} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setMainActivity(e.target.value)} />
						<p>Second activity</p>
						<input placeholder="Second activity" value={secondaryActivity} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setSecondaryActivity(e.target.value)} />
						<p>Interests <span style={{color: "red"}}>*</span></p>
						<input placeholder="Interests" value={interests} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setInterests(e.target.value)} />
						<p>Email <span style={{color: "red"}}>*</span></p>
						<input placeholder="Email" value={email} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setEmail(e.target.value)} />
						<p>Region</p>
						<input placeholder="Region" value={region} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setRegion(e.target.value)} disabled />
						<p>Employees</p>
						<input placeholder="Employees" value={employees} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setEmployees(e.target.value)} disabled />
						<p>Profit</p>
						<input placeholder="Profit" value={profit} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setProfit(e.target.value)} disabled />
						<p>Loss</p>
						<input placeholder="Loss" value={loss} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setLoss(e.target.value)} disabled />
						<p>Turnover</p>
						<input placeholder="Turnover" value={turnover} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setTurnover(e.target.value)} disabled />
						<p>Capital</p>
						<input placeholder="Capital" value={capital} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setCapital(e.target.value)} disabled />
						<p>Liabilities</p>
						<input placeholder="Liabilities" value={liabilities} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setLiabilities(e.target.value)} disabled />
						<p>Assets</p>
						<input placeholder="Assets" value={assets} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setAssets(e.target.value)} disabled />
						<p>isActive</p>
						<input placeholder="isActive" value={isActive} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setIsActive(e.target.value)} disabled />

						<p>Data from</p>
						<input placeholder="DataYear" value={dataYear} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setDataYear(e.target.value)} disabled />
						{props.secondButton === false ? (
							<>
								<p>Date last email sent</p>
								<input placeholder="Date last email sent" value={statusEmail.toString()[0] === "," ? "-" : statusEmail.toString().split('T')[0]} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" disabled />
							</>
						) : (
							<></>
						)}
					</div>
					<div className="modal-action">
						<button className="btn btn-outline btn-info" onClick={props.secondButton === false ? loadApiData : loadApiData}>Load Data</button>
						<button className="btn btn-outline btn-success" onClick={props.secondButton === false ? saveCompanyChanges : () => addCompany(
							companyName,
							TVA,
							shareholders,
							CIF,
							COM,
							headquarter,
							subsidiary,
							mainActivity,
							secondaryActivity,
							interests,
							email,
							region,
							employees,
							dataYear,
							profit,
							loss,
							turnover,
							capital,
							liabilities,
							assets,
							isActive,
							props.modalId
						)}>Save</button>
						<button className="btn btn-outline btn-error" onClick={deleteCompany} disabled={props.secondButton} style={{ display: props.secondButton ? "none" : "inline-block" }}>Delete</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalCompany;
