"use client";
import React from "react";
import { createHash } from "crypto";
import ModalServices from "@/components/Services/ModalServices";
import "@/components/Services/style.css";

const FloatingButton = () => {
	const userPermissions = sessionStorage.getItem("Level");
	return (
		<>
			{/* {userPermissions === createHash("sha512").update("admin", "utf8").digest("hex") ? ( */}
			<>
				<label htmlFor="modalServiceFloatingButton" className="floating-button" title="Add new item">
					+
				</label>
				<ModalServices modalId="modalServiceFloatingButton" secondButton={true} />
			</>
			{/* ) : (
				<></>
			)} */}
		</>
	);
};

export default FloatingButton;
