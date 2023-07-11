import React from "react";
import { LuThumbsUp } from "react-icons/lu";
import { AiOutlineRetweet } from "react-icons/ai";
import { Link } from "react-router-dom";

function Sidebar() {
	return (
		<div className="hidden lg:block w-80 pl-2 pr-6">
			<div className="flex flex-col bg-slate-100 p-2 rounded-2xl items-center justify-center">
				<div className="font-bold text-lg p-3 text-slate-700 mb-3">
					Trending
				</div>
				<TrendingPost />
				<TrendingPost />
				<TrendingPost />
				<Link to="/explore">
					<div className="text-sm text-right font-bold text-slate-500 py-3">
						Show More
					</div>
				</Link>
			</div>
		</div>
	);
}

const TrendingPost = () => {
	return (
		<div>
			<div className="text-sm my-2 text-slate-600 hover:bg-slate-200 rounded-lg p-2 cursor-pointer">
				<span>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Distinctio neque eum et nostrum quas non nisi libero
				</span>
				<div className="flex items-center space-x-3">
					<div className="flex items-center justify-start mt-2 space-x-1">
						<LuThumbsUp size={12} />
						<span className="text-xs">12k</span>
					</div>
					<div className="flex items-center justify-start mt-2 space-x-1">
						<AiOutlineRetweet size={12} />
						<span className="text-xs">901</span>
					</div>
				</div>
			</div>
			<hr class="h-px my-2 bg-slate-300 border-0 dark:bg-slate-300"></hr>
		</div>
	);
};

export default Sidebar;
