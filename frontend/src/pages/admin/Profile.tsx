import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch, useAppSelector } from "@store";
import type { RootState } from "@store";
import { profileAPI } from "@redux/auth/profile";
import { updateProfileAPI } from "@redux/auth/updateProfile";
import { useToast } from "@components/ui/ToastProvider";
import SubmitButton from "@components/ui/SubmitButton";
import CancelButton from "@components/ui/CancelButton";
import Button from "@components/ui/Button";
import { PAGE_TITLES } from "@config/appConstants";
import type { User } from "@store/reducers/authReducer";

export default function Profile() {
	const dispatch = useAppDispatch();
	const { addToast } = useToast();
	const user = useAppSelector((s: RootState) => (s.auth as { user?: User }).user);
	const authLoading = useAppSelector((s: RootState) => (s.loader as unknown as { authLoading: boolean }).authLoading);
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		if (!user) {
			profileAPI({ addToast })(dispatch);
		}
	}, [dispatch, addToast, user]);

	const schema = Yup.object({
		first_name: Yup.string().required("Required"),
		last_name: Yup.string().required("Required"),
	});

	return (
		<div className="container" style={{ maxWidth: "600px" }}>
			<div className="d-flex justify-content-between align-items-center mb-3">
				<h4 className="mb-0">{edit ? PAGE_TITLES?.EDIT_PROFILE : PAGE_TITLES.PROFILE}</h4>
				{edit ? (
					<div className="d-flex gap-2">
						<SubmitButton loading={authLoading} form="profile-form" />
						<CancelButton onClick={() => setEdit(false)} />
					</div>
				) : (
					<Button variant="primary" onClick={() => setEdit(true)}>
						Edit
					</Button>
				)}
			</div>

			<div className="card position-relative">
				{edit ? (
					<>
						<div className="card-body">
							<Formik
								initialValues={{
									first_name: user?.first_name || "",
									last_name: user?.last_name || "",
								}}
								enableReinitialize
								validationSchema={schema}
								onSubmit={async (values, { setSubmitting }) => {
									await updateProfileAPI({ payload: values, addToast })(dispatch);
									setSubmitting(false);
									setEdit(false);
								}}
							>
								{() => (
									<Form id="profile-form">
										<div className="mb-3">
											<label htmlFor="first_name" className="form-label">
												First Name
											</label>
											<Field id="first_name" name="first_name" className="form-control" />
											<div className="text-danger small">
												<ErrorMessage name="first_name" />
											</div>
										</div>
										<div className="mb-3">
											<label htmlFor="last_name" className="form-label">
												Last Name
											</label>
											<Field id="last_name" name="last_name" className="form-control" />
											<div className="text-danger small">
												<ErrorMessage name="last_name" />
											</div>
										</div>
									</Form>
								)}
							</Formik>
						</div>
					</>
				) : (
					<div className="card-body">
						<p>
							<strong>Full Name:</strong> {user?.first_name} {user?.last_name}
						</p>
						<p>
							<strong>Email:</strong> {user?.email}
						</p>
						<p>
							<strong>Role:</strong> {user?.role?.name}
						</p>
					</div>
				)}
			</div>
			{/* Bottom Buttons */}
			{edit ? (
				<div className="d-flex justify-content-end gap-2 mt-3">
					<SubmitButton loading={authLoading} form="profile-form" />
					<CancelButton onClick={() => setEdit(false)} />
				</div>
			) : (
				<div className="d-flex justify-content-end mt-3">
					<Button variant="primary" onClick={() => setEdit(true)}>
						Edit
					</Button>
				</div>
			)}
		</div>
	);
}
