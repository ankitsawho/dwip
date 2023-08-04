import React from "react";
import Identicon from "react-identicons";
import moment from "moment";
import { Link } from "react-router-dom";

function RePostData({ data }) {
	return (
		<div className="border border-slate-300 hover:bg-white cursor-pointer bg-slate-50 w-full p-2 h-full rounded-2xl mt-2">
			<div className="flex items-center">
				<Link to={`/profile/${data.author}`}>
					<div className="p-2 m-3 w-fit bg-white rounded-full">
						<Identicon string={data.author.toString()} size={28} />
					</div>
				</Link>
				<div className="flex flex-col items-start font-semibold text-slate-600 w-full">
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center justify-center space-x-3">
							<Link to={`/profile/${data.author}`}>
								<span className="text-md">
									{data.author_username}
								</span>
							</Link>
							<span className="text-xs text-slate-400 font-bold">
								{moment(data.created_at)
									.utc()
									.format("DD.MM.YYYY HH:MM")}
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="text-md px-16 pt-3 pb-6">{data.content}</div>
		</div>
	);
}

export default RePostData;
