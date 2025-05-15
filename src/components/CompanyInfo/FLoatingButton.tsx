"use client";
import React from "react";
import { createHash } from "crypto";
import ModalCompany from "@/components/CompanyInfo/ModalCompany";
import "@/components/CompanyInfo/style.css";

const FloatingButton = () => {
	const userPermissions = sessionStorage.getItem("Level");
	return (
		<>
			{/* {userPermissions === createHash("sha512").update("admin", "utf8").digest("hex") ? ( */}
			<>
				<label htmlFor="modalCompanyFloatingButton" className="floating-button" title="Add new item">
					+
				</label>
				<ModalCompany modalId="modalCompanyFloatingButton" secondButton={true} />
			</>
			{/* ) : (
				<></>
			)} */}
		</>
	);
};

export default FloatingButton;
