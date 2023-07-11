import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import useAuthStore from "../../zustand/auth-store";
import Navbar from "../components/Navbar";
import BottomBar from "../components/BottomBar";

function AuthorizedRoutes() {
	const accessToken = useAuthStore((state) => state.accessToken);
	return accessToken ? (
		<div className="h-screen w-screen">
			<Navbar />
			<Outlet />
			<BottomBar />
		</div>
	) : (
		<Navigate to="auth/" />
	);
}

export default AuthorizedRoutes;
