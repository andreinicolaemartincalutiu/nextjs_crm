"use client";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import React, { useState } from "react";

export default function DefaultLayout({ children, }: { children: React.ReactNode; }) {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<>
			{/* <!-- ===== Page Wrapper Start ===== --> */}
			<div className="flex">
				{/* <!-- ===== Sidebar Start ===== --> */}
				<div className="w-[12%]">
					<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				</div>
				{/* <!-- ===== Sidebar End ===== --> */}

				{/* <!-- ===== Content Area Start ===== --> */}
				<div className="relative flex flex-1 flex-col w-[88%]">
					{/* <!-- ===== Header Start ===== --> */}
					<Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
					{/* <!-- ===== Header End ===== --> */}

					{/* <!-- ===== Main Content Start ===== --> */}
					<main>
						<div className="mx-auto max-w-screen-xl ml-12 mt-8 mb-8">
							{children}
						</div>
					</main>
					{/* <!-- ===== Main Content End ===== --> */}
				</div>
				{/* <!-- ===== Content Area End ===== --> */}
			</div>
			{/* <!-- ===== Page Wrapper End ===== --> */}
		</>
	);
}
