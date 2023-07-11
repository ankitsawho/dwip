import React, { useEffect, useState } from "react";
import Identicon from "react-identicons";
import { AiOutlineLike } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { BiMessageSquareDetail, BiBookmark } from "react-icons/bi";
import moment from "moment";
import jwtDecode from "jwt-decode";
import useAuthStore from "../../zustand/auth-store";
import { FiMoreVertical } from "react-icons/fi";
import toast from "react-hot-toast";
import axios from "axios";
import API_CONFIG from "../../api.config";

function DwipPost({ data, setReload }) {
	const accessToken = useAuthStore((state) => state.accessToken);
	const user_id = jwtDecode(accessToken).user_id;
	const [showDelete, setShowDelete] = useState(false);

	const handleDeletePost = async () => {
		try {
			const response = await axios.delete(
				`${API_CONFIG.baseUrl}/post/${data.id}/`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			toast("Dwip deleted");
			setReload((prev) => !prev);
		} catch (error) {
			toast("Error Occurred");
			console.error(error);
		}
	};

	return (
		<div className="bg-slate-100 w-full p-2 rounded-2xl mt-2">
			<div className="flex items-center">
				<div className="p-2 m-3 w-fit bg-white rounded-full">
					<Identicon string="ankitsahu" size={28} />
				</div>
				<div className="flex flex-col items-start font-semibold text-slate-600 w-full">
					<div className="flex items-center justify-between w-full">
						<div className="flex items-center justify-center space-x-3">
							<span className="text-sm">{data.author_name}</span>
							<span className="text-xs font-light">
								{moment(data.create_at)
									.utc()
									.format("DD.MM.YYYY HH:MM")}
							</span>
						</div>

						{data.author === user_id && (
							<div className="flex items-center justify-center space-x-2">
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
									className="mr-3 p-1 text-slate-400 hover:text-slate-600 cursor-pointer hover:bg-slate-300 rounded-lg"
								>
									<FiMoreVertical size={20} />
								</div>
							</div>
						)}
					</div>
					<span className="text-xs">{data.author_username}</span>
				</div>
			</div>
			<div className="text-sm px-5">{data.content}</div>
			<div className="flex items-end justify-end space-x-4 mr-4">
				<div className="flex px-3 py-1  text-slate-500 rounded-lg space-x-2 items-center justify-center cursor-pointer hover:bg-slate-200">
					<AiOutlineLike size={20} />
					<span className="text-xs font-bold text-slate-500">
						{data.likes.length}
					</span>
				</div>
				<div className="flex px-3 py-1  text-slate-500 rounded-lg space-x-2 items-center justify-center cursor-pointer hover:bg-slate-200">
					<FaRetweet size={20} />
					<span className="text-xs font-bold text-slate-500">
						1242
					</span>
				</div>
				<div className="flex px-3 py-1  text-slate-500 rounded-lg space-x-2 items-center justify-center cursor-pointer hover:bg-slate-200">
					<BiMessageSquareDetail size={20} />
					<span className="text-xs font-bold text-slate-500">
						1242
					</span>
				</div>
				<div className="flex px-3 py-1  text-slate-500 rounded-lg space-x-2 items-center justify-center cursor-pointer hover:bg-slate-200">
					<BiBookmark size={20} />
				</div>
			</div>
		</div>
	);
}

export default DwipPost;
