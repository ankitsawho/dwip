import React, { useState } from "react";
import API_CONFIG from "../../../api.config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import toast, { Toaster } from "react-hot-toast";
import GridLoader from "react-spinners/GridLoader";

const override = {
	display: "block",
	margin: "5",
};

function Register() {
	var usernameRegex =
		/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/;
	var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [repassword, setRepassword] = useState("");
	const [loading, setLoading] = useState(false);

	const handleRegister = async () => {
		if (!usernameRegex.test(username)) {
			return toast("Invalid Username");
		}
		if (!emailRegex.test(email)) {
			return toast("Invalid Email");
		}
		if (password !== repassword) {
			return toast("Password Mismatch");
		}
		if (password.trim().length < 4) {
			toast("Invalid Password");
			return;
		}
		try {
			setLoading(true);
			const response = await axios.post(
				`${API_CONFIG.baseUrl}/account/register/`,
				{
					username,
					email,
					password,
				}
			);
			const res = response.data;
			setLoading(false);
			toast(res.message);
			if (Object.keys(res.data).length > 0) {
				return navigate("/auth/verify", {
					state: { email },
				});
			}
		} catch (error) {
			setLoading(false);
			console.log(error.response.data);
			toast(error.response.data.message);
		}
	};

	return (
		<div className="w-screen h-screen bg-slate-100 flex items-center justify-center">
			<Toaster />
			<div className="md:w-1/2 lg:w-1/3 w-10/12 m-2 py-10 space-y-4 flex flex-col items-center justify-center rounded-2xl shadow-md bg-white">
				<Logo size={50} />
				<p className="text-xl md:text-3xl font-semibold">
					Create your account
				</p>
				<div className="space-y-3 flex p-4 w-full flex-col items-center justify-center">
					<input
						className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-slate-500 focus:border-slate-500"
						type="text"
						placeholder="Username"
						value={username}
						onChange={(e) =>
							setUsername(e.target.value.toLowerCase())
						}
					/>
					<input
						className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-slate-500 focus:border-slate-500"
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-slate-500 focus:border-slate-500"
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<input
						className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-slate-500 focus:border-slate-500"
						type="password"
						placeholder="Confirm Password"
						value={repassword}
						onChange={(e) => setRepassword(e.target.value)}
					/>
					{loading ? (
						<GridLoader
							color="#708090"
							loading={loading}
							cssOverride={override}
							size={10}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					) : (
						<button
							className="w-full bg-slate-500 hover:bg-slate-600 text-white font-bold py-3 rounded-full transition duration-200"
							onClick={handleRegister}
						>
							Sign Up
						</button>
					)}
					<div className="space-x-1 font-light text-slate-600 items-end flex justify-center">
						<span className="">Already have an account?</span>
						<Link to="/auth">
							<span className="font-bold text-sm hover:underline underline-offset-8 hover:text-slate-800 text-slate-600">
								Login In
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Register;
