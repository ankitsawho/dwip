import React from "react";
import { HiHome } from "react-icons/hi";
import { PiBellSimpleFill } from "react-icons/pi";
import { RiBardFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { PiBookmarksSimpleFill } from "react-icons/pi";

function Options() {
	return (
		<div className="items-center justify-center space-x-2 text-slate-600 hidden md:flex">
			<NavLink to="/">
				<OptionLinks icon={HiHome} title="Home" />
			</NavLink>
			<NavLink to="/explore">
				<OptionLinks icon={RiBardFill} title="Explore" />
			</NavLink>
			<NavLink to="/bookmarks">
				<OptionLinks icon={PiBookmarksSimpleFill} title="Bookmarks" />
			</NavLink>
			<NavLink to="/notifications">
				<OptionLinks icon={PiBellSimpleFill} title="Notifications" />
			</NavLink>
		</div>
	);
}

const OptionLinks = ({ icon: Icon, title }) => {
	return (
		<div className="flex items-center justify-center space-x-2 py-2 px-3 hover:bg-slate-200 rounded-full cursor-pointer">
			<Icon size={24} />
			<span className="font-bold text-sm hidden lg:block">{title}</span>
		</div>
	);
};

export default Options;
