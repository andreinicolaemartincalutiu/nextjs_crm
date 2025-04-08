import Chart from "@/components/Charts/page";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";
import ECommerce from "@/components/Dashboard/E-commerce";

export const metadata: Metadata = {
	title: "Next.js Chart | CRM - Next.js Dashboard Template",
	description:
		"This is Next.js Chart page for CRM - Next.js Tailwind CSS Admin Dashboard Template",
};

const BasicChartPage: React.FC = () => {
	return (
		<DefaultLayout>
			<Chart />
		</DefaultLayout>
	);
};

export default BasicChartPage;
