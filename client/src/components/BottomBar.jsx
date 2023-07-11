import React from "react";
import { HiHome } from "react-icons/hi";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { PiBellSimpleFill } from "react-icons/pi";
import { RiBardFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { PiBookmarksSimpleFill } from "react-icons/pi";

function BottomBar() {
	return (
		<div className="bg-white pt-4 fixed bottom-0 items-center justify-evenly pb-2 space-x-2 w-full text-slate-600 flex md:hidden">
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
		<div className="flex flex-col items-center justify-center pb-2 space-y-2 cursor-pointer">
			<Icon size={22} />
			<span className="font-bold text-xs sm:block hidden">{title}</span>
		</div>
	);
};

export default BottomBar;
