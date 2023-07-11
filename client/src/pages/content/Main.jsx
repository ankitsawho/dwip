import React from "react";
import { Outlet } from "react-router-dom";
import UserDetailHome from "../../components/UserDetailHome";
import Sidebar from "../../components/Sidebar";

function Main() {
	return (
		<div className="flex justify-between pt-24 screen">
			<div className="fixed">
				<UserDetailHome />
			</div>
			<div className="w-full md:px-20 lg:px-80">
				<Outlet />
			</div>
			<div className="fixed right-0">
				<Sidebar />
			</div>
		</div>
	);
}

export default Main;
