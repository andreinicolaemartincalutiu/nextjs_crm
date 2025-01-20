"use client";
import React, { useState } from "react";
import Loader from "@/components/common/Loader";
import InfoPopup from "@/components/common/InfoPopup";
import { AssistantsV1ServiceCreateFeedbackRequest } from "twilio/lib/rest/assistants/v1/assistant/feedback";

type companyModal = {
	FirstName: string,
	LastName: string,
	Email: string,
}

const ModalEmail = (props: any) => {
	const [subject, setSubject] = useState<string>("Subject");
	const [composedEmailSMS, setComposedEmailSMS] = useState<string>("EMAIL FOR TEST");
	const [emailAddressesToSendEmailArray, setEmailAddressesToSendEmailArray] = useState<companyModal[]>([]);

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, companyName: string, email: string) => {
		let companyForEmail = {
			FirstName: companyName,
			LastName: "$",
			Email: email,
		}
		if (event.target.checked) {
			setEmailAddressesToSendEmailArray(prevArray => [...prevArray, companyForEmail]);
		} else {
			setEmailAddressesToSendEmailArray(prevArray =>
				prevArray.filter(company => company !== companyForEmail)
			);
		}
	}

	const sendEmails = async () => {
		if (emailAddressesToSendEmailArray.length === 0) {
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
		for (let i = 0; i < emailAddressesToSendEmailArray.length; ++i) {

			try {
				const response = await fetch(`/api/sendEmail/${emailAddressesToSendEmailArray[i].Email}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(
						{
							Subject: subject,
							EmailText: composedEmailSMS,
							OfferServiceArray: props.offerServicesArray,
							DiscountPercent: props.discountPercent,
							OfferDescription: props.offerDescription
						}
					),
				});
				if (!response.ok) {
					InfoPopup(`Failed to send email to ${emailAddressesToSendEmailArray[i].Email}`);
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const res2 = await fetch("/api/insertUpdateStatus_EmailSMS", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						firstName: emailAddressesToSendEmailArray[i].FirstName,
						lastName: emailAddressesToSendEmailArray[i].LastName,
						clientSMS: "0",
						clientEmail: "0",
						companyEmail: "1",
					}),
				});

				if (!res2.ok) {
					InfoPopup(`Failed to add sent Email to ${emailAddressesToSendEmailArray[i].Email} in database`);
					throw new Error(`HTTP error! Status: ${res2.status}`);
				}
			} catch (error) {
				console.error(error);
				InfoPopup(`Failed to send email to ${emailAddressesToSendEmailArray[i].Email}`);
			}
		}
		InfoPopup("Emails sent");
	}

	return (
		<>
			<input type="checkbox" id={props.modalId} className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box w-[70%] max-w-full">
					<div className="grid grid-cols-1">
						<label htmlFor={props.modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>

						<input placeholder="Type subject" value={subject} className="flex w-[98%] items-center p-2 text-black focus:outline-none focus:ring-0 focus:border-black" onChange={(e) => setSubject(e.target.value)} />
						<textarea placeholder="Compose email or SMS" value={composedEmailSMS} className="flex h-29 items-center justify-center p-2 text-black border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-500" onChange={(e) => setComposedEmailSMS(e.target.value)} />

						<div className="flex flex-col">

							<div className="grid grid-cols-2 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-2">
								<div className="p-2.5 text-center xl:p-5">
									<h5 className="text-sm font-medium uppercase xsm:text-base">
										Company Name
									</h5>
								</div>
								<div className="p-2.5 text-center xl:p-5">
									<h5 className="text-sm font-medium uppercase xsm:text-base">
										Email
									</h5>
								</div>
							</div>

							{props.filteredCompanies?.length > 0 ? (
								<div>
									{props.filteredCompanies.map((company: any, key: any) => (
										<div key={key}>
											<div className={`grid grid-cols-2 sm:grid-cols-2 ${key === props.filteredCompanies.length - 1 ? "" : "border-b border-stroke dark:border-strokedark"}`}>

												<div className="flex items-center gap-3 p-2.5 xl:p-5">
													<p className="hidden text-black dark:text-white sm:block">
														<input type="checkbox" className="checkbox checkbox-info" onChange={(event) => handleCheckboxChange(event, company.CompanyName, company.Email)} />
													</p>
													{company.CompanyName}
												</div>

												<div className="flex items-center justify-center p-2.5 xl:p-5">
													<p className="text-black dark:text-white">{company.Email}</p>
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

					<div className="modal-action w-full">
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
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalEmail;
