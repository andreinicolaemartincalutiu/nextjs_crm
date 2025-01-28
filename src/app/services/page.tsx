import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableServices from "@/components/Services/TableServices";
import FloatingButton from "@/components/Services/FloatingButton";

export const metadata: Metadata = {
	title: "Services",
	description: "",
};

const Services = () => {
	return (
		<DefaultLayout>
			<TableServices />
			<FloatingButton />
		</DefaultLayout>
	);
};

export default Services;
