"use client";
import React, { useRef, useState } from "react";
import { createHash } from "crypto";
import { Client, getEmptyClient } from "@/types/Client";
import InfoPopup from "@/components/common/InfoPopup";
import LoadingPopup from "@/components/common/LoadingPopup";

export const addClient = async (
	firstName: string | undefined,
	lastName: string | undefined,
	CI: string | undefined,
	CNP: string | undefined,
	companyId: string | undefined,
	companyRole: string | undefined,
	address: string | undefined,
	email: string | undefined,
	phone: string | undefined,
	interests: string | undefined,
	birthDate: string | undefined,
	details: string | undefined,
	modalId?: string
) => {
	let modalInput, addSuccessfuly = "0";
	if (modalId) {
		modalInput = document.getElementById(modalId) as HTMLInputElement;
	}
	if (firstName === "" || firstName === undefined || firstName === null ||
		lastName === "" || lastName === undefined || lastName === null ||
		CI === "" || CI === undefined || CI === null ||
		CNP === "" || CNP === undefined || CNP === null ||
		companyId === "" || companyId === undefined || companyId === null ||
		companyRole === "" || companyRole === undefined || companyRole === null ||
		address === "" || address === undefined || address === null ||
		email === "" || email === undefined || email === null ||
		phone === "" || phone === undefined || phone === null ||
		interests === "" || interests === undefined || interests === null ||
		birthDate === "" || birthDate === undefined || birthDate === null ||
		details === "" || details === undefined || details === null
	) {
		if (modalInput?.checked) {
			InfoPopup("Missing some required fields");
		}
		return addSuccessfuly;
	}
	try {
		const response = await fetch(`/api/insertClient`, {
			method: "POST",
			cache: "no-store",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				FirstName: firstName,
				LastName: lastName,
				CI: CI,
				CNP: CNP,
				CompanyId: companyId,
				CompanyRole: companyRole,
				Address: address,
				Email: email,
				Phone: phone,
				Interests: interests,
				BirthDate: birthDate,
				Details: details,
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

const ModalClients = (props: any) => {
	const userPermissions = sessionStorage.getItem("Level");
	const [client, setClient] = useState<Client>(props?.client ?? getEmptyClient());
	const detailsRef = useRef<HTMLDetailsElement>(null);

	const [companiesArray, setCompaniesArray] = useState<{ CompanyId: string, CompanyName: string }[]>(
		() => {
			const storedData = sessionStorage.getItem("companiesArray");
			return storedData ? JSON.parse(storedData) : [];
		}
	);

	const getCompanyName = (companyId: any) => {
		const company = companiesArray.find(c => c.CompanyId === companyId);
		return company ? company.CompanyName : "";
	};

	const [companyIdLayout, setCompanyIdLayout] = useState<string>(
		client?.CompanyId !== undefined ? getCompanyName(client.CompanyId) : "Company Name"
	);

	const handleItemClick = (companyId: any, companyName: string) => {
		setClient({ ...client, CompanyId: companyId });
		// setCompanyId(companyId);
		setCompanyIdLayout(companyName);

		if (detailsRef.current) {
			detailsRef.current.removeAttribute("open");
		}
	};

	const updateClient = async () => {
		if (client.FirstName === "" || client.FirstName === undefined || client.FirstName === null ||
			client.LastName === "" || client.LastName === undefined || client.LastName === null ||
			client.CI === "" || client.CI === undefined || client.CI === null ||
			client.CNP === "" || client.CNP === undefined || client.CNP === null ||
			client.CompanyId === "" || client.CompanyId === undefined || client.CompanyId === null ||
			client.CompanyRole === "" || client.CompanyRole === undefined || client.CompanyRole === null ||
			client.Address === "" || client.Address === undefined || client.Address === null ||
			client.Email === "" || client.Email === undefined || client.Email === null ||
			client.Phone === "" || client.Phone === undefined || client.Phone === null ||
			client.Interests === "" || client.Interests === undefined || client.Interests === null ||
			client.BirthDate === "" || client.BirthDate === undefined || client.BirthDate === null ||
			client.Details === "" || client.Details === undefined || client.Details === null
		) {
			InfoPopup("Missing some required fields");
			return;
		}
		const modalInput = document.getElementById(props?.modalId) as HTMLInputElement;
		LoadingPopup(true);
		try {
			const response = await fetch(`/api/updateClients/${client?.ClientId}`, {
				method: "PUT",
				cache: "no-store",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					FirstName: client?.FirstName,
					LastName: client?.LastName,
					CI: client?.CI,
					CNP: client?.CNP,
					CompanyId: client?.CompanyId,
					CompanyRole: client?.CompanyRole,
					Address: client?.Address,
					Email: client?.Email,
					Phone: client?.Phone,
					Interests: client?.Interests,
					BirthDate: client?.BirthDate,
					Details: client?.Details,
				}),
			});
			if (!response.ok) {
				const error = await response.json();
				throw new Error(`Error: ${error.message}`);
			} else {
				modalInput.checked = false;
				props?.onUpdateClient(client);
				LoadingPopup(false);
				InfoPopup("Changes saved");
			}
		} catch (error) {
			LoadingPopup(false);
			InfoPopup("Connection error. Try again");
		}
	};

	const deleteClient = async () => {
		const modalInput = document.getElementById(props?.modalId) as HTMLInputElement;
		LoadingPopup(true);
		try {
			const response = await fetch(`/api/deleteClient/${client?.ClientId}`, {
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
				props?.onDeleteClient(client.ClientId);
				LoadingPopup(false);
				InfoPopup("Changes saved");
			}
		} catch (error) {
			LoadingPopup(false);
			InfoPopup("Connection error. Try again");
		}
	};

	return (
		<>
			<input type="checkbox" ref={props?.modalCheckboxRef} id={props?.modalId} className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box w-[70%] max-w-3xl">
					<div className="grid grid-cols-1 sm:grid-rows-30 w-[90%]">
						<label htmlFor={props?.modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>

						<p>First Name <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="First Name" value={client?.FirstName} className="flex items-center gap-3 p-2.5 xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setClient({ ...client, FirstName: e.target.value })} />

						<p>Last Name <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="Last Name" value={client?.LastName} className="flex items-center justify-center p-2.5 xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setClient({ ...client, LastName: e.target.value })} />

						<p>CI <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="CI" value={client?.CI} className="flex items-center justify-center p-2.5 xl:p-5 text-meta-3 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setClient({ ...client, CI: e.target.value })} />

						<p>CNP <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="CNP" value={client?.CNP} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-black focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setClient({ ...client, CNP: e.target.value })} />

						<p>Company <span style={{ color: "red" }}>*</span></p>
						<details className="dropdown hidden p-2.5 sm:flex xl:p-5 text-black" ref={detailsRef}>
							<summary className="btn m-1">{companyIdLayout}</summary>
							<ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
								{companiesArray?.map((company, index) => (
									<li key={index} onClick={() => handleItemClick(company.CompanyId, company.CompanyName)}><a>{company.CompanyName}</a></li>
								))}
							</ul>
						</details>

						<p>Company role <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="Company role" value={client?.CompanyRole} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setClient({ ...client, CompanyRole: e.target.value })} />

						<p>Address <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="Address" value={client?.Address} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setClient({ ...client, Address: e.target.value })} />

						<p>Email <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="Email" value={client?.Email} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setClient({ ...client, Email: e.target.value })} />

						<p>Phone <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="Phone" value={client?.Phone} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setClient({ ...client, Phone: e.target.value })} />

						<p>Interests <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="Interests" value={client?.Interests} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setClient({ ...client, Interests: e.target.value })} />

						<p>Birth date <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="Birth date" value={client?.BirthDate} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setClient({ ...client, BirthDate: e.target.value })} />

						<p>Details <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="Details" value={client?.Details} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setClient({ ...client, Details: e.target.value })} />

						{props?.secondButton === false ? (
							<>
								<p>Date last email sent</p>
								<input type="text" placeholder="Date last email sent" value={client?.StatusEmail === "" ? "-" : client?.StatusEmail?.toString().split('T')[0].split('-').reverse().join('-')} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" disabled />

								<p>Date last SMS sent</p>
								<input type="text" placeholder="Date last SMS sent" value={client?.StatusSMS === "" ? "-" : client?.StatusSMS?.toString().split('T')[0].split('-').reverse().join('-')} className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 text-meta-5 focus:outline-none focus:ring-0 focus:border-transparent" disabled />
							</>
						) : (
							<></>
						)}
					</div>
					<div className="modal-action">
						<button className="btn btn-info text-white" onClick={props?.secondButton === false ? updateClient : () => addClient(
							client?.FirstName,
							client?.LastName,
							client?.CI,
							client?.CNP,
							client?.CompanyId,
							client?.CompanyRole,
							client?.Address,
							client?.Email,
							client?.Phone,
							client?.Interests,
							client?.BirthDate,
							client?.Details,
							props?.modalId
						)}>Save</button>
						{userPermissions === createHash("sha512").update("admin", "utf8").digest("hex") ?
							<button className="btn btn-outline btn-error"
								onClick={deleteClient}
								disabled={props?.secondButton} style={{ display: props?.secondButton ? "none" : "inline-block" }}>Delete</button>
							: <></>}
					</div>
				</div>
			</div >
		</>
	);
};

export default ModalClients;
