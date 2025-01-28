import React from "react";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Charts from "@/components/Home/Charts";

export const metadata: Metadata = {
	title: "Home",
	description:
		"This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Home = () => {
	return (
		<DefaultLayout>
			<Charts />
		</DefaultLayout>
	);
};

export default Home;
