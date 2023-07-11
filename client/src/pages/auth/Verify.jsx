import React, { useEffect, useState } from "react";
import API_CONFIG from "../../../api.config";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import GridLoader from "react-spinners/GridLoader";
import toast, { Toaster } from "react-hot-toast";

const override = {
	display: "block",
	margin: "5",
};

function Verify() {
	const navigate = useNavigate();
	const location = useLocation();
	const [email, setEmail] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		try {
			setEmail(location.state.email);
		} catch {
			return navigate("/auth");
		}
	}, []);

	const [pin, setPin] = useState("");

	const handleVerification = async () => {
		if (pin.trim().length != 6) {
			toast("Invalid PIN");
			return;
		}

		if (!email) {
			return toast("Error Occurred");
		}
		try {
			setLoading(true);
			const response = await axios.post(
				`${API_CONFIG.baseUrl}/account/verify/`,
				{
					email,
					otp: pin,
				}
			);
			const res = response.data;
			toast(res.message);
			if (Object.keys(res.data).length > 0) {
				navigate("/auth");
			}
			setLoading(false);
		} catch (error) {
			toast("Error Occured");
			setLoading(false);
		}
	};

	return (
		<div className="w-screen h-screen bg-slate-100 flex items-center justify-center">
			<Toaster />
			<div className="md:w-1/2 lg:w-1/3 w-10/12 m-2 py-10 space-y-4 flex flex-col items-center justify-center rounded-2xl shadow-md bg-white">
				<Logo size={50} />
				<p className="text-xl md:text-3xl font-semibold">
					Verify your Email
				</p>
				<p className="text-xs text-slate-500">
					OTP is sent to your registered email id
				</p>
				<div className="space-y-3 flex p-4 w-full flex-col items-center justify-center">
					<input
						className="w-full px-4 py-3 rounded-2xl border border-slate-300 focus:outline-none focus:ring-slate-500 focus:border-slate-500"
						type="text"
						placeholder="PIN"
						value={pin}
						onChange={(e) => setPin(e.target.value)}
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
							onClick={handleVerification}
						>
							Verify
						</button>
					)}
				</div>
			</div>
		</div>
	);
}

export default Verify;
