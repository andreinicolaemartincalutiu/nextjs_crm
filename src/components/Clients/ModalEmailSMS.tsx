"use client";
import React, { useRef, useState } from "react";
import Loader from "@/components/common/Loader";
import InfoPopup from "@/components/common/InfoPopup";
import { AssistantsV1ServiceCreateFeedbackRequest } from "twilio/lib/rest/assistants/v1/assistant/feedback";

type clientModal = {
	FirstName: string,
	LastName: string,
	Email: string,
	Phone: string,
}

const ModalEmailSMS = (props: any) => {
	const [subject, setSubject] = useState<string>("Subject");
	const [composedEmailSMS, setComposedEmailSMS] = useState<string>("EMAIL FOR TEST");
	const [clientsArrayForEmailsSMSs, setClientsArrayForEmailsSMSs] = useState<clientModal[]>([]);
	const [offerServicesArray, setOfferServicesArray] = useState<string[]>(props.offerServicesArray);
	const [discountPercent, setDiscountPercent] = useState<string>(props.discountPercent);
	const [offerDescription, setOfferDescription] = useState<string>(props.offerDescription);
	const modalRef = useRef<HTMLDivElement>(null);

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, firstName: string, lastName: string, email: string, phoneNr: string) => {
		let clientForEmailSMS = {
			FirstName: firstName,
			LastName: lastName,
			Email: email,
			Phone: phoneNr,
		}
		if (event.target.checked) {
			setClientsArrayForEmailsSMSs(prevArray => [...prevArray, clientForEmailSMS]);
		} else {
			setClientsArrayForEmailsSMSs(prevArray =>
				prevArray.filter(client => client !== clientForEmailSMS)
			);
		}
	};

	const sendEmails = async () => {
		if (setClientsArrayForEmailsSMSs.length === 0) {
			InfoPopup("Select clients to send emails");
			return;
		}
		if (subject === "") {
			InfoPopup("Type subject");
			return;
		}
		if (composedEmailSMS === "") {
			InfoPopup("Compose email");
			return;
		}
		for (let i = 0; i < setClientsArrayForEmailsSMSs.length; ++i) {

			try {
				const response = await fetch(`/api/sendEmail/${clientsArrayForEmailsSMSs[i].Email}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(
						{
							Subject: subject,
							EmailText: composedEmailSMS,
							OfferServiceArray: offerServicesArray,
							DiscountPercent: discountPercent,
							OfferDescription: offerDescription
						}
					),
				});

				if (!response.ok) {
					InfoPopup(`Failed to send email to ${clientsArrayForEmailsSMSs[i].Email}`);
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const res2 = await fetch("/api/insertUpdateSmsEmailStatuses", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						firstName: clientsArrayForEmailsSMSs[i].FirstName,
						lastName: clientsArrayForEmailsSMSs[i].LastName,
						clientSMS: "0",
						clientEmail: "1",
						companyEmail: "0",
					}),
				});

				const data2 = await res2.json();
				if (!data2.success) {
					InfoPopup(`Failed to add sent Email to ${clientsArrayForEmailsSMSs[i].Email} in database`);
					throw new Error(`HTTP error! Status: ${data2.error}`);
				}
			} catch (error) {
				console.error(error);
				InfoPopup(`Failed to send email to ${clientsArrayForEmailsSMSs[i].Email}`);
			}
		}
		InfoPopup("Emails sent");
	};

	const sendSMSs = async () => {
		if (clientsArrayForEmailsSMSs.length === 0) {
			InfoPopup("Select clients to send SMS");
			return;
		}
		if (composedEmailSMS === "") {
			InfoPopup("Compose SMS");
			return;
		}
		for (let i = 0; i < clientsArrayForEmailsSMSs.length; ++i) {
			try {
				const res = await fetch("/api/sendSMS", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						to: clientsArrayForEmailsSMSs[i].Phone,
						message: composedEmailSMS,
					}),
				});

				const data = await res.json();
				if (!data.success) {
					InfoPopup(`Failed to send SMS to ${clientsArrayForEmailsSMSs[i].Phone}`);
					throw new Error(`HTTP error! Status: ${data.error}`);
				}

				const res2 = await fetch("/api/insertUpdateSmsEmailStatuses", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						firstName: clientsArrayForEmailsSMSs[i].FirstName,
						lastName: clientsArrayForEmailsSMSs[i].LastName,
						clientSMS: "1",
						clientEmail: "0",
						companyEmail: "0",
					}),
				});

				const data2 = await res2.json();
				if (!data2.success) {
					InfoPopup(`Failed to add sent SMS to ${clientsArrayForEmailsSMSs[i].Phone} in database`);
					throw new Error(`HTTP error! Status: ${data.error}`);
				}
			} catch (error) {
				console.log(`Error: ${error}`);
				InfoPopup(`Failed to send SMS to ${clientsArrayForEmailsSMSs[i].Phone}`);
			}
		}
		InfoPopup("Finished to send SMS");
	};

	const handleDataFromChild = (offerServicesArray: string[], discountPercent: string, offerDescription: string) => {
		setOfferServicesArray(offerServicesArray);
		setDiscountPercent(discountPercent);
		setOfferDescription(offerDescription);
	};

	const handleModalsTransition = () => {
		const checkbox1 = document.getElementById("modalPDF");
		checkbox1?.click();
	}

	const handleButtonClick = () => {
		// console.log(2);
		// if (modalRef.current) {
		// 	console.log(3);
		// 	const checkbox1 = document.getElementById(props.modalId + "2");
		// 	console.log(checkbox1);
		// 	if (checkbox1) {
		// 		checkbox1.style.overscrollBehaviorY = "contain";
		// 	}
		// }
	};

	return (
		<>
			<input type="checkbox" id={props.modalId} className="modal-toggle" />
			<div id={props.modalId + "2"} ref={modalRef} className="h-[100%] modal" role="dialog">
				<div className="w-[70%] max-w-full modal-box">
					<div className="grid grid-cols-1">
						<label htmlFor={props.modalId} className="top-2 right-2 absolute btn btn-circle btn-ghost btn-sm">X</label>

						<input placeholder="Type subject" value={subject} className="flex items-center p-2 focus:border-black focus:ring-0 w-[98%] text-black focus:outline-none" onChange={(e) => setSubject(e.target.value)} />
						<textarea placeholder="Compose email or SMS" value={composedEmailSMS} className="flex justify-center items-center border-gray-300 focus:border-gray-500 p-2 border focus:ring-0 h-29 text-black focus:outline-none" onChange={(e) => setComposedEmailSMS(e.target.value)} />

						<div className="flex flex-col">
							<div className="grid grid-cols-3 sm:grid-cols-4 bg-gray-2 dark:bg-meta-4 rounded-sm">
								<div className="p-2.5 xl:p-5">
									<h5 className="font-medium text-sm xsm:text-base uppercase">
										First Name
									</h5>
								</div>
								<div className="p-2.5 xl:p-5 text-center">
									<h5 className="font-medium text-sm xsm:text-base uppercase">
										Last Name
									</h5>
								</div>
								<div className="p-2.5 xl:p-5 text-center">
									<h5 className="font-medium text-sm xsm:text-base uppercase">
										Email
									</h5>
								</div>
								<div className="p-2.5 xl:p-5 text-center">
									<h5 className="font-medium text-sm xsm:text-base uppercase">
										Phone
									</h5>
								</div>
							</div>

							{props.filteredClients?.length > 0 ? (
								<div>
									{props.filteredClients.map((client: any, key: any) => (
										<div key={key}>
											<div className={`grid grid-cols-3 sm:grid-cols-4 ${key === props.filteredClients.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}>
												<div className="flex items-center gap-3 p-2.5 xl:p-5">
													<p className="sm:block hidden text-black dark:text-white">
														<input type="checkbox" className="checkbox checkbox-info" onChange={(event) => handleCheckboxChange(event, client.FirstName, client.LastName, client.Email, client.Phone)} />
													</p>
													{client.FirstName}
												</div>

												<div className="flex justify-center items-center p-2.5 xl:p-5">
													<p className="text-black dark:text-white">{client.LastName}</p>
												</div>

												<div className="sm:flex justify-center items-center hidden p-2.5 xl:p-5">
													<p className="text-meta-5">{client.Email}</p>
												</div>

												<div className="sm:flex justify-center items-center hidden p-2.5 xl:p-5">
													<p className="text-meta-5">{client.Phone}</p>
												</div>

											</div>
										</div>
									))}
								</div>
							) : (
								<Loader />
							)}
						</div>
					</div>

					<div className="w-full modal-action">
						<label
							className="btn"
							htmlFor={props.modalId2}
							style={{ color: "white", backgroundColor: "#007bff", padding: "10px 20px", margin: "0.5rem" }}
						>
							<svg
								className="fill-current"
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M21.44 11.05L12.36 20.12C10.58 21.91 7.84 21.91 6.05 20.12C4.27 18.34 4.27 15.6 6.05 13.81L15.14 4.74C16.32 3.56 18.22 3.56 19.4 4.74C20.59 5.92 20.59 7.82 19.4 9.01L10.31 18.07C9.72 18.66 8.76 18.66 8.17 18.07C7.58 17.48 7.58 16.52 8.17 15.93L16.57 7.54"
									stroke="currentColor"
									strokeWidth="2"
									fill="none"
								/>
							</svg>
						</label>

						<button className="btn"
							style={{ color: "white", backgroundColor: "#007bff", padding: "10px 20px", margin: "0.5rem" }}
							onClick={sendEmails}
						>
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
						</button>
						<button className="btn"
							style={{ color: "white", backgroundColor: "#007bff", padding: "10px 20px", margin: "0.5rem" }}
							onClick={sendSMSs}
						>
							<svg
								className="fill-current"
								width="22"
								height="22"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M21 6.5C21 5.12 19.88 4 18.5 4H5.5C4.12 4 3 5.12 3 6.5V17.5C3 18.88 4.12 20 5.5 20H16.5L21 24V6.5Z"
									stroke="currentColor"
									strokeWidth="2"
									fill="none"
								/>
								<line x1="7" y1="9" x2="17" y2="9" stroke="currentColor" strokeWidth="1.5" />
								<line x1="7" y1="12" x2="17" y2="12" stroke="currentColor" strokeWidth="1.5" />
								<line x1="7" y1="15" x2="17" y2="15" stroke="currentColor" strokeWidth="1.5" />
							</svg>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalEmailSMS;
