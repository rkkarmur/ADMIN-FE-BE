import { Routes, Route, Navigate } from "react-router-dom";
import AuthIndex from "@alias/auth/AuthIndex";
import Login from "@alias/auth/Login";
import AdminIndex from "@alias/admin/AdminIndex";
import Dashboard from "@alias/admin/Dashboard";
import { useSelector } from "react-redux";
import type React from "react";
import type { RootState } from "@store";

function PrivateRoute({ children }: { children: React.ReactElement }) {
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
	return isLoggedIn ? children : <Navigate to="/auth/login" replace />;
}
export default function App() {
	return (
		<Routes>
			<Route path="/auth" element={<AuthIndex />}>
				<Route path="login" element={<Login />} />
			</Route>
			<Route
				path="/admin"
				element={
					<PrivateRoute>
						<AdminIndex />
					</PrivateRoute>
				}
			>
				<Route path="dashboard" element={<Dashboard />} />
			</Route>
			<Route path="*" element={<Navigate to="/auth/login" replace />} />
		</Routes>
	);
}
