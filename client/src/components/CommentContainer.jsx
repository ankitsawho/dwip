import React, { useEffect, useState } from "react";
import Identicon from "react-identicons";
import { AiOutlineLike } from "react-icons/ai";
import moment from "moment";
import jwtDecode from "jwt-decode";
import useAuthStore from "../../zustand/auth-store";
import { FiMoreVertical } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import API_CONFIG from "../../api.config";
import { Link, useNavigate } from "react-router-dom";

function CommentContainer({ data, setReload, comment_id }) {
	const accessToken = useAuthStore((state) => state.accessToken);
	const user_id = jwtDecode(accessToken).user_id;
	const [showDelete, setShowDelete] = useState(false);

	const handleDeletePost = async () => {
		try {
			const response = await axios.delete(
				`${API_CONFIG.baseUrl}/post/comment/${comment_id}/`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			toast("Comment deleted");
			setReload((prev) => !prev);
		} catch (error) {
			toast("Error Occurred");
			console.error(error);
		}
	};

	return (
		<div className="bg-slate-100 w-full h-full rounded-2xl mt-1">
			<div className="flex items-center">
				<Link to={`/profile/${data.author}`}>
					<div className="m-3 p-2 w-fit bg-white rounded-full">
						<Identicon string={data.author.toString()} size={24} />
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

						{data.author === user_id && (
							<div className="flex items-center justify-center space-x-2 mr-4">
								{showDelete && (
									<button
										onClick={handleDeletePost}
										className="text-xs bg-red-500 text-white px-2 py-1 rounded-full"
									>
										Delete
									</button>
								)}
								<div
									onClick={() =>
										setShowDelete((prev) => !prev)
									}
									className="text-slate-400 hover:text-slate-600 cursor-pointer hover:bg-slate-300 rounded-lg"
								>
									<FiMoreVertical size={20} />
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="text-md px-16">{data.content}</div>
			<div className="flex items-end p-3 justify-start ml-10 space-x-4"></div>
		</div>
	);
}

export default CommentContainer;
