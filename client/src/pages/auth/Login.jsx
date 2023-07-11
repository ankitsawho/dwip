import React, { useState } from "react";
import API_CONFIG from "../../../api.config";
import axios from "axios";
import useAuthStore from "../../../zustand/auth-store";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import GridLoader from "react-spinners/GridLoader";
import toast, { Toaster } from "react-hot-toast";

const override = {
	display: "block",
	margin: "5",
};

function Login() {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
	const [loading, setLoading] = useState(false);

	const handleLogin = async () => {
		if (email.trim().length < 4) {
			return toast("Invalid Email");
		}
		if (password.trim().length < 4) {
			return toast("Invalid Password");
		}
		try {
			setLoading(true);
			const response = await axios.post(
				`${API_CONFIG.baseUrl}/account/token/`,
				{
					email,
					password,
				}
			);
			const data = response.data;
			if (data.access && data.refresh) {
				setAccessToken(data.access);
				setRefreshToken(data.access);
				navigate("/");
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			return toast("Login Failed");
		}
	};

	return (
		<div className="w-screen h-screen bg-slate-100 flex items-center justify-center">
			<Toaster />
			<div className="md:w-1/2 lg:w-1/3 w-10/12 m-2 py-10 space-y-4 flex flex-col items-center justify-center rounded-2xl shadow-md bg-white">
				<Logo size={50} />
				<p className="text-xl md:text-3xl font-semibold">
					Sign In to dwip
				</p>
				<div className="space-y-3 flex p-4 w-full flex-col items-center justify-center">
					<input
						className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-slate-500 focus:border-slate-500"
						type="email"
						placeholder="Email ..."
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-slate-500 focus:border-slate-500"
						type="password"
						placeholder="Password ..."
						value={password}
						onChange={(e) => setPassword(e.target.value)}
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
							onClick={handleLogin}
						>
							Login
						</button>
					)}
					<div>
						<Link t0="">
							<span className="font-semibold text-xs text-slate-700">
								Forgot password?
							</span>
						</Link>
					</div>
					<div className="space-x-1 font-light text-slate-600 items-end flex justify-center">
						<span className="">Don't have an account?</span>
						<Link to="register">
							<span className="font-bold text-sm hover:underline underline-offset-8 hover:text-slate-800 text-slate-600">
								Sign Up
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Login;
