"use client";
import React, { useState } from "react";
import { createHash } from "crypto";
import InfoPopup from "@/components/common/InfoPopup";
import LoadingPopup from "@/components/common/LoadingPopup";
import { Service, getEmptyService } from "@/types/Service";

export const addService = async (name: string | undefined, description: string | undefined, price: string | undefined, modalId?: string) => {
	let modalInput, addSuccessfuly = "0";
	if (modalId) {
		modalInput = document.getElementById(modalId) as HTMLInputElement;
	}
	if (!name || !description || !price) {
		if (modalInput?.checked) {
			InfoPopup("Missing some required fields");
		}
		return addSuccessfuly;
	}
	try {
		const response = await fetch(`/api/insertService`, {
			method: "POST",
			cache: "no-store",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				Name: name,
				Description: description,
				Price: price,
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

const ModalServices = (props: any) => {
	const userPermissions = sessionStorage.getItem("Level");
	const [service, setService] = useState<Service>(props?.service ?? getEmptyService());

	const updateService = async () => {
		if (service.Name === "" || service.Description === "" || service.Price === "") {
			InfoPopup("Type name, description and price");
			return;
		}
		const modalInput = document.getElementById(props?.modalId) as HTMLInputElement;
		LoadingPopup(true);
		try {
			const response = await fetch(`/api/updateService/${service.Id}`, {
				method: "PUT",
				cache: "no-store",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					Name: service.Name,
					Description: service.Description,
					Price: service.Price,
				}),
			});

			if (!response.ok) {
				const error = await response.json();
				throw new Error(`Error: ${error.message}`);
			} else {
				modalInput.checked = false;
				props?.onUpdateService(service);
				LoadingPopup(false);
				InfoPopup("Changes saved");
			}
		} catch (error) {
			LoadingPopup(false);
			InfoPopup("Connection error. Try again");
		}
	};

	const deleteService = async () => {
		const modalInput = document.getElementById(props?.modalId) as HTMLInputElement;
		LoadingPopup(true);
		try {
			const response = await fetch(`/api/deleteService/${service.Id}`, {
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
				props?.onDeleteService(service.Id);
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
			<input type="checkbox" id={props?.modalId} className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box w-[70%] max-w-3xl">
					<div className="grid grid-cols-1 sm:grid-rows-8">
						<label htmlFor={props?.modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>
						<p>Service name <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="Name" value={service?.Name} className="flex items-center pl-2.5 pb-2.5 xl:pl-5 text-black focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setService({ ...service, Name: e.target.value })} />
						<p>Description <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="Description" value={service?.Description} className="flex items-center justify-center pl-2.5 pb-2.5 xl:pl-5 text-black focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setService({ ...service, Description: e.target.value })} />
						<p>Price <span style={{ color: "red" }}>*</span></p>
						<input type="text" placeholder="Price" value={service?.Price} className="flex items-center justify-center pl-2.5 pb-2.5 xl:pl-5 text-meta-3 focus:outline-none focus:ring-0 focus:border-transparent"
							onChange={(e) => setService({ ...service, Price: e.target.value })} />
					</div>

					<div className="modal-action">
						<button className="btn btn-info text-white" onClick={props?.secondButton === false ? updateService : () => addService(service?.Name, service?.Description, service?.Price, props?.modalId)}>Save</button>
						{userPermissions === createHash("sha512").update("admin", "utf8").digest("hex") ?
							<button className="btn btn-outline btn-error" onClick={deleteService} disabled={props?.secondButton} style={{ display: props?.secondButton ? "none" : "inline-block" }}>Delete</button>
							: <></>}
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalServices;
