import React from "react";
import { PiChatTeardropFill } from "react-icons/pi";

function Logo({ size }) {
	return (
		<div className="text-slate-500 items-center justify-center flex space-x-1 cursor-pointer">
			<PiChatTeardropFill size={size} />
		</div>
	);
}

export default Logo;
