"use client";
import React from "react";
import { createHash } from "crypto";
import ModalClients from "@/components/Clients/ModalClients";
import "@/components/Clients/style.css";

const FloatingButton = () => {
	const userPermissions = sessionStorage.getItem("Level");
	return (
		<>
			{/* {userPermissions === createHash("sha512").update("admin", "utf8").digest("hex") ? ( */}
			<>
				<label htmlFor="modalClientFloatingButton" className="floating-button" title="Add new item">
					+
				</label>
				<ModalClients modalId="modalClientFloatingButton" secondButton={true} />
			</>
			{/* ) : (
				<></>
			)} */}
		</>
	);
};

export default FloatingButton;
