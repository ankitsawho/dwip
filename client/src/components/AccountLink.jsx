import React from "react";
import Identicon from "react-identicons";
import { Link } from "react-router-dom";

function AccountLink() {
	return (
		<Link to="/settings">
			<div className="flex items-center justify-center space-x-2 p-1 rounded-full bg-slate-200 hover:bg-slate-300 cursor-pointer">
				<div className="bg-slate-100 items-center justify-center flex rounded-full p-2">
					<Identicon string="ankitsahu" size={24} />
				</div>
				<span className="font-bold text-sm text-slate-700 pr-4 hidden md:block">
					ankitsahu
				</span>
			</div>
		</Link>
	);
}

export default AccountLink;
