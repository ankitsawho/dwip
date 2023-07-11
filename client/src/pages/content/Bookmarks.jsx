import React from "react";
import Identicon from "react-identicons";
import { RiUserAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import DwipPost from "../../components/DwipPost";

function Bookmarks() {
	let arr = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9];
	return (
		<div className="w-full">
			<h1 className="pb-4 pl-4 font-bold text-2xl cursor-default">
				Bookmarks
			</h1>

			{/* Trending */}
			{/* <div className="mt-3">
				{arr.map((item) => (
					<DwipPost key={item} />
				))}
			</div> */}
		</div>
	);
}

export default Bookmarks;
