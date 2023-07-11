import React from "react";
import { Outlet, Link, Navigate } from "react-router-dom";
import useAuthStore from "../../zustand/auth-store";
import Logo from "../components/Logo";

function UnauthorizedRoutes() {
	const accessToken = useAuthStore((state) => state.accessToken);
	if (accessToken) return <Navigate to="/" />;
	return (
		<div>
			<nav></nav>
			<Outlet />
		</div>
	);
}

export default UnauthorizedRoutes;
