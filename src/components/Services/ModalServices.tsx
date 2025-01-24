"use client";
import React, { useState } from "react";
import InfoPopup from "@/components/common/InfoPopup";
import { createHash } from "crypto";

export const addService = async (name: string | undefined, description: string | undefined, price: string | undefined, modalId?: string) => {
	let modalInput, addSuccessfuly = "0";
	if (modalId) {
		modalInput = document.getElementById(modalId) as HTMLInputElement;
	}
	try {
		const response = await fetch(`/api/insertService`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-store"
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
}

const ModalServices = (props: any) => {
	const userPermissions = sessionStorage.getItem("Level");
	const [name, setName] = useState<string | undefined>(props?.name);
	const [description, setDescription] = useState<string | undefined>(props?.description);
	const [price, setPrice] = useState<string | undefined>(props?.price);

	const saveServiceChanges = async () => {
		if (name === "" || description === "" || price === "") {
			InfoPopup("Type name, description and price");
			return;
		}
		const modalInput = document.getElementById(props.modalId) as HTMLInputElement;
		let Id = props.Id;
		try {
			const response = await fetch(`/api/updateService/${Id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-store"
				},
				body: JSON.stringify({
					Name: name,
					Description: description,
					Price: price,
				}),
			});

			if (!response.ok) {
				InfoPopup("Changes not saved");
				const error = await response.json();
				throw new Error(`Error: ${error.message}`);
			} else {
				modalInput.checked = false;
				window.location.reload();
				InfoPopup("Changes saved");
			}
		} catch (error) {
			InfoPopup("Connection error. Try again");
			console.log(error);
		}
	}

	const deleteService = async () => {
		const modalInput = document.getElementById(props.modalId) as HTMLInputElement;
		try {
			const response = await fetch(`/api/deleteService/${props.Id}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					"Cache-Control": "no-store"
				}
			});

			if (!response.ok) {
				InfoPopup("Service not deleted. Try again");
				const error = await response.json();
				throw new Error(`Error: ${error.message}`);
			} else {
				modalInput.checked = false;
				window.location.reload();
				InfoPopup("Changes saved");
			}
		} catch (error) {
			InfoPopup("Connection error. Try again");
			console.log(error);
		}
	}

	return (
		<>
			<input type="checkbox" id={props.modalId} className="modal-toggle" />
			<div className="modal" role="dialog">
				<div className="modal-box w-[70%] max-w-3xl">
					<div className="grid grid-cols-1 sm:grid-rows-8">
						<label htmlFor={props.modalId} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</label>
						<p>Service name</p>
						<input placeholder="Name" value={name} className="flex items-center pl-2.5 pb-2.5 xl:pl-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setName(e.target.value)} />
						<p>Description</p>
						<input placeholder="Description" value={description} className="flex items-center justify-center pl-2.5 pb-2.5 xl:pl-5 text-black focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setDescription(e.target.value)} />
						<p>Price</p>
						<input type="number" placeholder="Price" value={price} className="flex items-center justify-center pl-2.5 pb-2.5 xl:pl-5 text-meta-3 focus:outline-none focus:ring-0 focus:border-transparent" onChange={(e) => setPrice(e.target.value)} />
					</div>

					<div className="modal-action">
						<button className="btn btn-info text-white" onClick={props.secondButton === false ? saveServiceChanges : () => addService(name, description, price, props.modalId)}>Save</button>
						{userPermissions === createHash("sha512").update("admin", "utf8").digest("hex") ?
							<button className="btn btn-outline btn-error" onClick={deleteService} disabled={props.secondButton} style={{ display: props.secondButton ? "none" : "inline-block" }}>Delete</button>
							: <></>}
					</div>
				</div>
			</div>
		</>
	);
};

export default ModalServices;
