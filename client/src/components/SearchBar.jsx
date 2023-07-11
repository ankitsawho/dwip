import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

function SearchBar() {
	const [searchText, setSearchText] = useState("");
	return (
		<div className="hidden md:flex items-center justify-center bg-slate-200 rounded-full px-3 py-2">
			<FiSearch size={18} className="text-slate-500 mr-2" />
			<input
				className=" bg-transparent outline-none"
				type="text"
				placeholder="Search ..."
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
			/>
		</div>
	);
}

export default SearchBar;
