import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableClients from "@/components/Clients/TableClients";
import FloatingButton from "@/components/Clients/FLoatingButton";

export const metadata: Metadata = {
	title: "Clients",
	description:
		"This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Clients = () => {
	return (
		<DefaultLayout>
			<TableClients />
			<FloatingButton />
		</DefaultLayout>
	)
}

export default Clients;
