import React from "react";
import { NavLink } from "react-router-dom";
import { LOGO_URL } from "@config/constants";
import { FULL_ROUTES } from "@config/routes";
import ProfileCorner from "./profile/ProfileCorner";
// import type { User } from "@store/reducers/authReducer";

import "./sidebar.css";
import { ROLES } from "@config/appConstants";
// import { useAppSelector, type RootState } from "@store/index";

interface SidebarProps {
	open?: boolean;
	onClose?: () => void;
}

function Sidebar({ open, onClose }: SidebarProps) {
	// const user = useAppSelector((s: RootState) => (s.auth as { user?: User })?.user);

	const sidebarLinks = [
		{
			label: "Dashboard",
			path: FULL_ROUTES.ADMIN_DASHBOARD,
			roleSlugs: [ROLES?.ADMIN?.SLUG],
		},
		{
			label: "Users",
			path: FULL_ROUTES.ADMIN_USER_LIST,
			roleSlugs: [ROLES?.ADMIN?.SLUG],
		},
		{
			label: "Settings",
			path: FULL_ROUTES.ADMIN_SETTING,
			roleSlugs: [ROLES?.ADMIN?.SLUG],
		},
		// Add more items here
	];
	// const filteredLinks = sidebarLinks.filter((link) => link.roleSlugs.includes(user?.role?.slug ? user?.role?.slug : null));
	const filteredLinks = sidebarLinks;

	return (
		<>
			<div className={`sidebar d-flex flex-column ${open ? "show" : ""}`.trim()}>
				<div className="sidebar-content d-flex flex-column p-3 bg-light">
					<div className="text-center mb-4">
						<NavLink to={FULL_ROUTES.ADMIN_DASHBOARD} onClick={onClose}>
							<img src={LOGO_URL} alt="Logo" className="img-fluid" />
						</NavLink>
					</div>
					<div className="flex-grow-1 overflow-auto">
						<ul className="nav nav-pills flex-column mb-3">
							{filteredLinks.map((link) => (
								<li className="nav-item" key={link.path}>
									<NavLink to={link.path} className={({ isActive }) => "nav-link " + (isActive ? "active" : "link-dark")} onClick={onClose}>
										{link.label}
									</NavLink>
								</li>
							))}
						</ul>
					</div>
					<div className="profile-corner-wrapper">
						<ProfileCorner onNavigate={onClose} />
					</div>
				</div>
			</div>
			{open ? <div className="sidebar-backdrop" onClick={onClose} /> : null}
		</>
	);
}

export default React.memo(Sidebar);
