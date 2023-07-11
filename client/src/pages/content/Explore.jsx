import React from "react";
import Identicon from "react-identicons";
import { RiUserAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import DwipPost from "../../components/DwipPost";

function Explore() {
	let arr = [1, 2, 3, 4, 5, 5, 6, 7, 8, 9];
	return (
		<div className="w-full">
			<h1 className="pb-4 pl-4 font-bold text-2xl cursor-default">
				Explore
			</h1>

			{/* To Follow */}
			<div className="flex flex-col bg-slate-100 p-1 rounded-2xl items-start justify-start">
				<div className="font-bold text-lg ml-8 mt-6 text-slate-700 mb-3">
					Who to follow
				</div>
				<UserDetail />
				<UserDetail />
				<UserDetail />
				<UserDetail />
				<Link to="">
					<div className="text-sm text-right ml-8 pl-2 font-bold text-slate-500 py-3">
						Show More
					</div>
				</Link>
			</div>

			{/* Trending */}
			{/* <div className="mt-3">
				{arr.map((item) => (
					<DwipPost key={item} />
				))}
			</div> */}
		</div>
	);
}

const UserDetail = () => {
	return (
		<div className="w-full cursor-pointer">
			<div className="rounded-md hover:bg-slate-200">
				<div className="py-2 flex items-center justify-between">
					<div className="flex items-center">
						<div className="my-3 mx-4 w-fit bg-white rounded-full">
							<Identicon string="ankitsahu" size={28} />
						</div>
						<div className="flex flex-col items-start font-semibold text-slate-600">
							<span className="text-md">Ankit Sahu</span>
							<span className="text-sm">ankitsahu</span>
						</div>
					</div>

					<button className="flex items-end justify-center space-x-3 bg-slate-300 px-4 py-2 rounded-full mx-4">
						<RiUserAddFill size={24} />
						<span className="text-sm font-semibold">Follow</span>
					</button>
				</div>
			</div>
			<hr class="h-px bg-slate-300 border-0 dark:bg-slate-300"></hr>
		</div>
	);
};

export default Explore;
