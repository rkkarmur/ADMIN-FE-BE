import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@store";
import type { RootState } from "@store";
import { changePasswordAPI } from "@redux/auth/changePassword";
import { useToast } from "@components/ui/ToastProvider";
import SubmitButton from "@components/ui/SubmitButton";
import CancelButton from "@components/ui/CancelButton";
import { useNavigate } from "react-router-dom";
import { PAGE_TITLES } from "@config/appConstants";
import { FULL_ROUTES } from "@config/routes";

export default function ChangePassword() {
	const dispatch = useAppDispatch();
	const { addToast } = useToast();
	const navigate = useNavigate();
	const authLoading = useAppSelector((s: RootState) => (s.loader as unknown as { authLoading: boolean }).authLoading);

	const schema = Yup.object({
		old_password: Yup.string().required("Required"),
		new_password: Yup.string().min(6, "At least 6 characters").required("Required"),
	});

	return (
		<div className="container" style={{ maxWidth: "600px" }}>
			{/* Title and Top Buttons */}
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h4 className="mb-0">{PAGE_TITLES.CHANGE_PASSWORD}</h4>
				<div className="d-flex gap-2">
					<SubmitButton loading={authLoading} label="Save" form="change-password-form" />
					<CancelButton onClick={() => navigate(FULL_ROUTES.ADMIN_PROFILE)} />
				</div>
			</div>

			{/* Form Card */}
			<div className="card position-relative">
				<div className="card-body">
					<Formik
						initialValues={{ old_password: "", new_password: "" }}
						validationSchema={schema}
						onSubmit={async (values, { setSubmitting, resetForm }) => {
							const success = await changePasswordAPI({ payload: values, addToast })(dispatch);
							setSubmitting(false);
							if (success) {
								resetForm();
								navigate(FULL_ROUTES.ADMIN_PROFILE);
							}
						}}
					>
						{() => (
							<Form id="change-password-form">
								<div className="mb-3">
									<label htmlFor="old_password" className="form-label">
										Old Password
									</label>
									<Field id="old_password" name="old_password" type="password" className="form-control" />
									<div className="text-danger small">
										<ErrorMessage name="old_password" />
									</div>
								</div>
								<div className="mb-3">
									<label htmlFor="new_password" className="form-label">
										New Password
									</label>
									<Field id="new_password" name="new_password" type="password" className="form-control" />
									<div className="text-danger small">
										<ErrorMessage name="new_password" />
									</div>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>

			{/* Bottom Buttons */}
			<div className="d-flex justify-content-end gap-2 mt-3">
				<SubmitButton loading={authLoading} label="Save" form="change-password-form" />
				<CancelButton onClick={() => navigate(FULL_ROUTES.ADMIN_PROFILE)} />
			</div>
		</div>
	);
}
