import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "@store/authSlice";

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogin = () => {
		dispatch(login());
		navigate("/admin/dashboard");
	};

	return (
		<>
			<div className="card p-4 shadow">
				<h3>Login Page</h3>
				<button className="btn btn-primary mt-3" onClick={handleLogin}>
					Dummy Login
				</button>
			</div>
		</>
	);
}
