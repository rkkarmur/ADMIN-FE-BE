import { Outlet } from "react-router-dom";

export default function AdminIndex() {
	const projectName = import.meta.env.VITE_ALIAS;

	console.log(`Project Name: ${projectName}`);
	return (
		<div className="container mt-5">
			<h2>{`${projectName || ""} `}Admin Panel auth index</h2>
			<Outlet />
		</div>
	);
}
