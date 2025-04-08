import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableCompanyInfo from "@/components/CompanyInfo/TableCompanyInfo";
import FloatingButton from "@/components/CompanyInfo/FLoatingButton";

export const metadata: Metadata = {
	title: "Company Info",
	description:
		"This is Next.js Tables page for CRM - Next.js Tailwind CSS Admin Dashboard Template",
};

const CompanyInfo = () => {
	return (
		<DefaultLayout>
			<TableCompanyInfo />
			<FloatingButton />
		</DefaultLayout>
	)
}

export default CompanyInfo;
