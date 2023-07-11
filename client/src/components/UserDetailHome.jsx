import React from "react";
import Identicon from "react-identicons";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";

function UserDetailHome() {
	return (
		<div className="hidden lg:block w-80 pl-6 pr-3 space-y-3">
			<div className="flex flex-col bg-slate-100 p-8 rounded-2xl items-center justify-center">
				<Link
					to="profile"
					className="flex flex-col items-center justify-center"
				>
					<div className="bg-white rounded-full flex items-center justify-center p-5">
						<Identicon string="ankitsahu" size={50} />
					</div>
					<div className="font-bold text-xl mt-3 text-slate-700">
						Ankit Sahu
					</div>
					<div className=" font-medium text-slate-500">
						@ankitsahu
					</div>
					<div className="text-sm my-5 text-slate-600">
						Lorem ipsum dolor sit amet consectetur, adipisicing
						elit. Distinctio neque eum et nostrum quas non nisi
						libero
					</div>
					<div className="flex items-center justify-center space-x-4">
						<div className="space-x-2 font-bold text-sm text-slate-400">
							<span>2304</span>
							<span>Followers</span>
						</div>
						<div className="space-x-2 font-bold text-sm text-slate-400">
							<span>2304</span>
							<span>Followers</span>
						</div>
					</div>
				</Link>
			</div>
			<div>
				<MoreLinks icon={FaPen} title="Create" />
			</div>
		</div>
	);
}
const MoreLinks = ({ icon: Icon, title }) => {
	return (
		<div className="flex justify-center space-x-2 bg-slate-200 hover:bg-slate-300 py-4 my-2 text-slate-600 rounded-full cursor-pointer">
			<Icon size={18} />
			<span className="font-bold text-sm hidden lg:block">{title}</span>
		</div>
	);
};

export default UserDetailHome;
