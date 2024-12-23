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
	modalId?: string
) => {
	let modalInput, addSuccessfuly = "0";
	if (modalId) {
		modalInput = document.getElementById(modalId) as HTMLInputElement;
	}
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
		employees === "" || employees === undefined || employees === null
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
		console.error(error);
	}
	return addSuccessfuly;
}

const ModalCompany = (props: any) => {
	const [companyName, setCompanyName] = useState(props.company?.CompanyName);
	const [TVA, setTVA] = useState(props.company?.TVA);
	const [shareholders, setShareholders] = useState(props.company?.Shareholders);
	const [CIF, setCIF] = useState(props.company?.CIF);
	const [COM, setCOM] = useState(props.company?.COM);
	const [headquarter, setHeadquarter] = useState(props.company?.Headquarter);
	const [subsidiary, setSubsidiary] = useState(props.company?.Subsidiary);
	const [mainActivity, setMainActivity] = useState(props.company?.MainActivity);
	const [secondaryActivity, setSecondaryActivity] = useState(props.company?.SecondaryActivity);
	const [interests, setInterests] = useState(props.company?.Interests);
	const [email, setEmail] = useState(props.company?.Email);
	const [region, setRegion] = useState(props.company?.Region);
	const [employees, setEmployees] = useState(props.company?.Employees);
	const statusEmail = useState(props.company?.StatusEmail);

	const saveCompanyChanges = async () => {
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
			employees === "" || employees === undefined || employees === null
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

	return (
		<>
			<input type="checkbox" id={props.modalId} className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box w-[70%] max-w-3xl">
					<div className="grid grid-cols-1 sm:grid-rows-10">
						<label htmlFor={props.modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>
						<input placeholder="Company name" value={companyName} className="flex items-center gap-3 p-2.5 xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setCompanyName(e.target.value)} />
						<input type="number" placeholder="TVA" value={TVA} className="flex items-center justify-center p-2.5 xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setTVA(e.target.value)} />
						<input placeholder="Shareholders" value={shareholders} className="flex items-center justify-center p-2.5 xl:p-5 text-meta-3 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setShareholders(e.target.value)} />
						<input type="number" placeholder="CIF" value={CIF} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setCIF(e.target.value)} />
						<input placeholder="COM" value={COM} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setCOM(e.target.value)} />
						<input placeholder="Headquarter" value={headquarter} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setHeadquarter(e.target.value)} />
						<input placeholder="Subsidiary" value={subsidiary} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setSubsidiary(e.target.value)} />
						<input placeholder="Main activity" value={mainActivity} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setMainActivity(e.target.value)} />
						<input placeholder="Second activity" value={secondaryActivity} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setSecondaryActivity(e.target.value)} />
						<input placeholder="Interests" value={interests} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setInterests(e.target.value)} />
						<input placeholder="Email" value={email} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setEmail(e.target.value)} />
						<input placeholder="Region" value={region} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setRegion(e.target.value)} />
						<input placeholder="Employees" value={employees} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setEmployees(e.target.value)} />
						{props.secondButton === false ? (
							<input placeholder="Last email sent date" value={statusEmail.toString()[0] === "," ? "-" : statusEmail.toString().split('T')[0]} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" disabled />
						) : (
							<></>
						)}
					</div>
					<div className="modal-action">
						<button className="btn btn-info text-white" onClick={props.secondButton === false ? saveCompanyChanges : () => addCompany(
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
