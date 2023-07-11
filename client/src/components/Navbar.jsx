import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import Options from "./Options";
import AccountLink from "./AccountLink";

function Navbar() {
	return (
		<div className="w-screen flex items-center justify-between p-4 bg-white fixed z-50">
			<div className="flex space-x-6">
				<Logo size={48} />
				<SearchBar />
			</div>
			<div className="flex space-x-4">
				<Options />
				<AccountLink />
			</div>
		</div>
	);
}

export default Navbar;
