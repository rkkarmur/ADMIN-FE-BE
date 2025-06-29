import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import React, { lazy, Suspense } from "react";

const AuthIndex = lazy(() => import("@pages/auth/AuthIndex"));
const Login = lazy(() => import("@pages/auth/Login"));
const AdminIndex = lazy(() => import("@pages/admin/AdminIndex"));
const Dashboard = lazy(() => import("@pages/admin/Dashboard"));
const Profile = lazy(() => import("@pages/admin/Profile"));
const ChangePassword = lazy(() => import("@pages/admin/ChangePassword"));
const PageNotFound = lazy(() => import("@pages/PageNotFound"));

import { ROUTES, FULL_ROUTES } from "@config/routes";

import type { Auth } from "@store/reducers/authReducer";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@store";
import { useToast } from "@components/ui/ToastProvider";
import { profileAPI } from "@redux/auth/profile";
import FullPageLoader from "@components/ui/FullPageLoader";

function PrivateRoute({ children }: { children: React.ReactElement }) {
	const auth = useSelector((state: Auth) => state.auth);
	const dispatch = useAppDispatch();
	const { addToast } = useToast();
	const location = useLocation();
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		const load = async () => {
			try {
				await profileAPI({ addToast })(dispatch);
			} catch (err) {
				const message = err instanceof Error ? err.message : "Session expired";
				addToast({ type: "error", message });
			} finally {
				setChecked(true);
			}
		};

		if (!auth.isLoggedIn || !auth.user) {
			load();
		} else {
			setChecked(true);
		}
		// Only run this check once on mount to avoid API calls after logout
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (!checked) return <FullPageLoader />;

	return auth.isLoggedIn ? children : <Navigate to={FULL_ROUTES.AUTH_LOGIN} replace state={{ from: location.pathname }} />;
}
export default function App() {
	// const { user } = useSelector((state: Auth) => state.auth);

	return (
		<Suspense fallback={<FullPageLoader />}>
			<Routes>
				<Route path={ROUTES.AUTH.ROOT} element={<AuthIndex />}>
					<Route path={ROUTES.AUTH.LOGIN} element={<Login />} />
				</Route>
				<Route
					path={ROUTES.ADMIN.ROOT}
					element={
						<PrivateRoute>
							<AdminIndex />
						</PrivateRoute>
					}
				>
					<Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
					<Route path={ROUTES.ADMIN.PROFILE} element={<Profile />} />
					<Route path={ROUTES.ADMIN.CHANGE_PASSWORD} element={<ChangePassword />} />
					<Route path="*" element={<PageNotFound />} />
				</Route>
				<Route path="*" element={<Navigate to={FULL_ROUTES.AUTH_LOGIN} replace />} />
			</Routes>
		</Suspense>
	);
}
