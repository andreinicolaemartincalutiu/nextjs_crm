import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import InfoPopup from "@/components/common/InfoPopup";

type service = {
	Id: any,
	Name: any,
	Description: any,
	Price: any,
}

const ModalPDF = (props: any) => {
	const [services, setServices] = useState<service[]>([]);
	const [offerServicesArray, setOfferServicesArray] = useState<string[]>([]);
	const [discountPercent, setDiscountPercent] = useState<string>("");
	const [offerDescription, setOfferDescription] = useState<string>("");

	const getServices = async () => {
		try {
			await fetch("api/readService", {
				method: "GET",
				headers: {
					"Cache-Control": "no-store"
				}
			})
				.then(response => response.json())
				.then(data => {
					setServices(data);
				})
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		getServices();
	}, [])

	const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, service: string) => {

		if (event.target.checked) {
			setOfferServicesArray(prevArray => [...prevArray, service]);
		} else {
			setOfferServicesArray(prevArray =>
				prevArray.filter(services => services !== service)
			);
		}
	}

	const createPDF = () => {
		if (offerServicesArray.length === 0 || discountPercent === "" || offerDescription === "") {
			InfoPopup("Configure the PDF");
			return;
		}
		const modalInput = document.getElementById(props.modalId) as HTMLInputElement;
		modalInput.checked = false;

		props.handleDataFromChild(offerServicesArray, discountPercent, offerDescription);
	}

	return (
		<>
			<input type="checkbox" id={props.modalId} className="hidden modal-toggle" />
			<div id={props.modalId + "2"} className="flex justify-center items-center w-[98.4%] h-[100%] modal">
				<div className="relative w-[70%] max-w-full h-[100%] overflow-hidden modal-box">
					<label htmlFor={props.modalId} className="top-2 right-2 absolute btn btn-circle btn-ghost btn-sm">
						X
					</label>
					<div className="flex w-full h-full">

						<div className="flex flex-col h-full">
							<h4 className="mb-6 font-semibold text-black text-xl dark:text-white">
								Services
							</h4>

							<div className="flex-grow overflow-y-auto">
								<div className="grid grid-cols-2 sm:grid-cols-2 bg-gray-2 dark:bg-meta-4 rounded-sm">
									<div className="p-2.5 xl:p-5">
										<h5 className="font-medium text-sm xsm:text-base uppercase">
											Service Name
										</h5>
									</div>
									<div className="p-2.5 xl:p-5 text-center">
										<h5 className="font-medium text-sm xsm:text-base uppercase">
											Price
										</h5>
									</div>
								</div>

								{services?.length > 0 ? (
									<div>
										{services.map((service, key) => (
											<div key={key}>
												<label
													className={`grid grid-cols-2 sm:grid-cols-2 ${key === services.length - 1
														? ""
														: "border-b border-stroke dark:border-strokedark"
														}`}
												>
													<div className="flex items-center gap-3 p-2.5 xl:p-5">
														<p className="sm:block hidden text-black dark:text-white">
															<input type="checkbox" className="mr-2 checkbox checkbox-info"
																onChange={(event) => handleCheckboxChange(event, service.Name)}
															/>
															{service.Name}
														</p>
													</div>

													<div className="flex justify-center items-center p-2.5 xl:p-5">
														<p className="text-meta-3">{service.Price}</p>
													</div>
												</label>
											</div>
										))}
									</div>
								) : (
									<Loader />
								)}
							</div>
						</div>

						<div className="divider divider-horizontal"></div>

						<div>
							<h4 className="mb-6 font-semibold text-black text-xl dark:text-white">
								Offer conditions
							</h4>

							<input type="number" placeholder="Discount percentage..." className="input-bordered w-full max-w-xs input"
								onChange={e => setDiscountPercent(e.target.value)} />

							<textarea className="mt-5 textarea-bordered w-full h-[65%] textarea" placeholder="Offer description..."
								onChange={e => setOfferDescription(e.target.value)} />

							<button
								// htmlFor={props.modalId} 
								className="btn"
								style={{ color: "white", backgroundColor: "#007bff", padding: "10px 20px", margin: "0.5rem" }}
								onClick={createPDF}>
								Attach PDF
							</button>

						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default ModalPDF;
