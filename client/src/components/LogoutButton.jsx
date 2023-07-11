import useAuthStore from "../../zustand/auth-store";
import { useNavigate } from "react-router-dom";

import React from "react";

function LogoutButton() {
	const setAccessToken = useAuthStore((state) => state.setAccessToken);
	const setRefreshToken = useAuthStore((state) => state.setRefreshToken);
	const navigate = useNavigate();
	const handleLogout = () => {
		setAccessToken(null);
		setRefreshToken(null);
		navigate("/");
	};
	return (
		<div>
			<button onClick={handleLogout}>Logout</button>
		</div>
	);
}

export default LogoutButton;
