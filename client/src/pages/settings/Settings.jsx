import React from "react";
import LogoutButton from "../../components/LogoutButton";
import Identicon from "react-identicons";

function Settings() {
	return (
		<div className="pt-32 h-full w-full bg-slate-100 flex justify-center">
			<div className="w-1/2">
				<h1 className="text-slate-600 text-2xl mb-10">Settings</h1>
				<div className="p-3 m-3 w-fit bg-white rounded-full">
					<Identicon string="ankit" size={60} />
				</div>
				<LogoutButton />
			</div>
		</div>
	);
}

export default Settings;
