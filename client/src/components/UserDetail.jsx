import React from "react";
import Identicon from "react-identicons";
import { RiUserAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const UserDetail = ({ user_id, username }) => {
	return (
		<Link to={`/profile/${user_id}`}>
			<div className="w-full cursor-pointer">
				<div className="rounded-md hover:bg-slate-200">
					<div className="py-2 flex items-center justify-between">
						<div className="flex items-center">
							<div className="my-3 p-2 mx-4 w-fit bg-white rounded-full">
								<Identicon string={user_id} size={28} />
							</div>

							<div className="flex flex-col items-start font-semibold text-slate-600">
								<span className="text-md">{username}</span>
							</div>
						</div>

						<button className="flex items-end justify-center space-x-3 bg-slate-300 px-4 py-2 rounded-full mx-4">
							<RiUserAddFill size={24} />
							<span className="text-sm font-semibold">
								Connect
							</span>
						</button>
					</div>
				</div>
				<hr class="h-px bg-slate-300 border-0 dark:bg-slate-300"></hr>
			</div>
		</Link>
	);
};

export default UserDetail;
