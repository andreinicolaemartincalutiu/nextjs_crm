"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarItem from "@/components/Sidebar/SidebarItem";
import ClickOutside from "@/components/ClickOutside";
import useLocalStorage from "@/hooks/useLocalStorage";

interface SidebarProps {
	sidebarOpen: boolean;
	setSidebarOpen: (arg: boolean) => void;
}

const menuGroups = [
	{
		name: "MENU",
		menuItems: [
			{
				icon: (
					<svg
						className="fill-current"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M3 11.9998L12 3L21 11.9998V20.9998C21 21.5521 20.5523 21.9998 20 21.9998H15C14.4477 21.9998 14 21.5521 14 20.9998V16.9998C14 16.4476 13.5523 15.9998 13 15.9998H11C10.4477 15.9998 10 16.4476 10 16.9998V20.9998C10 21.5521 9.55228 21.9998 9 21.9998H4C3.44772 21.9998 3 21.5521 3 20.9998V11.9998Z"
							fill="currentColor"
						/>
					</svg>
				),
				label: "Home",
				route: "/home",
			},
			{
				icon: (
					<svg
						className="fill-current"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M16 11C17.6569 11 19 9.65685 19 8C19 6.34315 17.6569 5 16 5C14.3431 5 13 6.34315 13 8C13 9.65685 14.3431 11 16 11ZM8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11ZM8 13C5.79086 13 2 14.1193 2 16.3333V18H14V16.3333C14 14.1193 10.2091 13 8 13ZM16 13C15.6561 13 15.2962 13.0197 14.9297 13.0581C15.6156 13.6349 16 14.4024 16 15.3333V18H22V16.3333C22 14.1193 18.2091 13 16 13Z"
							fill="currentColor"
						/>
					</svg>
				),
				label: "Clients",
				route: "/clients",
			},
			{
				icon: (
					<svg
						className="fill-current"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M3 22V2C3 1.44772 3.44772 1 4 1H10C10.5523 1 11 1.44772 11 2V7H13V4C13 3.44772 13.4477 3 14 3H20C20.5523 3 21 3.44772 21 4V22H17V18H7V22H3ZM5 20H9V16H15V20H19V5H15V8H9V3H5V20ZM7 11H9V13H7V11ZM11 11H13V13H11V11ZM7 15H9V17H7V15ZM11 15H13V17H11V15ZM15 11H17V13H15V11ZM15 15H17V17H15V15Z"
							fill="currentColor"
						/>
					</svg>
				),
				label: "Company info",
				route: "/company_info",
			},
			{
				icon: (
					<svg
						className="fill-current"
						width="18"
						height="18"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 2C12.5523 2 13 2.44772 13 3V4.48168C13.7416 4.61552 14.4514 4.86726 15.1046 5.22493L16.2069 4.1226C16.5974 3.73206 17.2246 3.73206 17.6151 4.1226L19.8774 6.38492C20.268 6.77545 20.268 7.40261 19.8774 7.79314L18.7751 8.89547C19.1327 9.54864 19.3845 10.2585 19.5183 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H19.5183C19.3845 13.7416 19.1327 14.4514 18.7751 15.1045L19.8774 16.2069C20.268 16.5974 20.268 17.2246 19.8774 17.6151L17.6151 19.8774C17.2246 20.268 16.5974 20.268 16.2069 19.8774L15.1046 18.7751C14.4514 19.1327 13.7416 19.3845 13 19.5183V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V19.5183C10.2585 19.3845 9.54864 19.1327 8.89547 18.7751L7.79314 19.8774C7.40261 20.268 6.77545 20.268 6.38492 19.8774L4.1226 17.6151C3.73206 17.2246 3.73206 16.5974 4.1226 16.2069L5.22493 15.1045C4.86726 14.4514 4.61552 13.7416 4.48168 13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H4.48168C4.61552 10.2585 4.86726 9.54864 5.22493 8.89547L4.1226 7.79314C3.73206 7.40261 3.73206 6.77545 4.1226 6.38492L6.38492 4.1226C6.77545 3.73206 7.40261 3.73206 7.79314 4.1226L8.89547 5.22493C9.54864 4.86726 10.2585 4.61552 11 4.48168V3C11 2.44772 11.4477 2 12 2ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
							fill="currentColor"
						/>
					</svg>

				),
				label: "Services",
				route: "/services",
			},
		],
	},
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
	const pathname = usePathname();
	const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

	return (
		<ClickOutside onClick={() => setSidebarOpen(false)}>
			<aside
				className={`fixed left-0 top-0 z-9999 flex h-screen flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
					}`}
			>
				{/* <!-- SIDEBAR HEADER --> */}
				<div className="flex items-center justify-between gap-2 px-3 py-5.5 lg:py-6.5">
					<div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "35px" }}>
						<Image
							width={50}
							height={50}
							src={"/images/favicon.ico"}
							// src={"/images/logo/logo.svg"}
							alt="Logo"
							priority
						/>
						<h2 style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}>CRM</h2>
					</div>

					<button
						onClick={() => setSidebarOpen(!sidebarOpen)}
						aria-controls="sidebar"
						className="block lg:hidden"
					>
						<svg
							className="fill-current"
							width="20"
							height="18"
							viewBox="0 0 20 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
								fill=""
							/>
						</svg>
					</button>
				</div>
				{/* <!-- SIDEBAR HEADER --> */}

				<div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
					{/* <!-- Sidebar Menu --> */}
					<nav className="mt-5 px-3 py-4 lg:mt-9 lg:px-6">
						{menuGroups.map((group, groupIndex) => (
							<div key={groupIndex}>
								<h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
									{group.name}
								</h3>

								<ul className="mb-6 flex flex-col gap-1.5">
									{group.menuItems.map((menuItem, menuIndex) => (
										<SidebarItem
											key={menuIndex}
											item={menuItem}
											pageName={pageName}
											setPageName={setPageName}
										/>
									))}
								</ul>
							</div>
						))}
					</nav>
					{/* <!-- Sidebar Menu --> */}
				</div>
			</aside>
		</ClickOutside>
	);
};

export default Sidebar;
