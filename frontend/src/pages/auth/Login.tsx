//src\pages\auth\Login.tsx
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@store";
import type { RootState } from "@store";
import SubmitButton from "@components/ui/SubmitButton";

import { FULL_ROUTES } from "@config/routes";
import { PAGE_TITLES } from "@config/appConstants";
import { loginAPI } from "@redux/auth/login";
import { useToast } from "@components/ui/ToastProvider";
export default function Login() {
	const { addToast } = useToast();
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const authLoading = useAppSelector((s: RootState) => (s.loader as unknown as { authLoading: boolean }).authLoading);
	const schema = Yup.object({
		email: Yup.string().email("Invalid email").required("Required"),
		password: Yup.string().required("Required"),
	});

	return (
		<div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
			<div className="col-12 col-md-6 col-lg-4">
				<div className="card p-4 shadow">
					<h3 className="mb-3 text-center">{PAGE_TITLES.LOGIN}</h3>
					<Formik
						initialValues={{ email: "admin@gmail.com", password: "Admin@123" }}
						validationSchema={schema}
						onSubmit={async (values, { setSubmitting }) => {
							try {
								await loginAPI({ payload: values, showTost: true, addToast })(dispatch);
								navigate(FULL_ROUTES.ADMIN_DASHBOARD);
							} catch (err: unknown) {
								console.log("err in login", err);

								// addToast({ type: "error", message: "Invalid email or password" });
							} finally {
								setSubmitting(false);
							}
						}}
					>
						{() => (
							<Form>
								<div className="mb-3">
									<label htmlFor="email" className="form-label">
										Email
									</label>
									<Field id="email" name="email" type="email" className="form-control" />
									<div className="text-danger small">
										<ErrorMessage name="email" />
									</div>
								</div>
								<div className="mb-3">
									<label htmlFor="password" className="form-label">
										Password
									</label>
									<Field id="password" name="password" type="password" className="form-control" />
									<div className="text-danger small">
										<ErrorMessage name="password" />
									</div>
								</div>
								<div className="d-grid">
									<SubmitButton loading={authLoading} label={PAGE_TITLES.LOGIN} />
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	);
}
