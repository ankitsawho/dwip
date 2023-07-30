import React, { useEffect, useState } from "react";
import Identicon from "react-identicons";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRetweet } from "react-icons/fa";
import { BiMessageSquareDetail, BiBookmark } from "react-icons/bi";
import moment from "moment";
import jwtDecode from "jwt-decode";
import useAuthStore from "../../zustand/auth-store";
import { FiMoreVertical } from "react-icons/fi";
import toast, { ToastBar } from "react-hot-toast";
import axios from "axios";
import API_CONFIG from "../../api.config";
import { Link, useNavigate } from "react-router-dom";

function DwipPost({ data, setReload }) {
	const navigate = useNavigate();
	const accessToken = useAuthStore((state) => state.accessToken);
	const user_id = jwtDecode(accessToken).user_id;
	const [showDelete, setShowDelete] = useState(false);
	const [isLikedByUser, setIsLikedByUser] = useState(false);
	const [likesCount, setLikesCount] = useState(0);

	const likeThePost = async () => {
		try {
			const response = await axios.post(
				`${API_CONFIG.baseUrl}/post/${data.id}/like/`,
				{},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(response);
			setIsLikedByUser(true);
			setLikesCount((prev) => prev + 1);
			toast("Liked !!!");
		} catch (error) {
			toast("Error");
			console.error(error);
		}
	};

	const dislikeThePost = async () => {
		try {
			const response = await axios.delete(
				`${API_CONFIG.baseUrl}/post/${data.id}/dislike/`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			console.log(response);
			setIsLikedByUser(false);
			setLikesCount((prev) => prev - 1);
			toast("Unliked !!!");
		} catch (error) {
			toast("Error");
			console.error(error);
		}
	};

	useEffect(() => {
		setLikesCount(data.likes_count);
		isLiked();
	}, []);

	const handleLikes = async () => {
		if (isLikedByUser) {
			await dislikeThePost();
		} else {
			await likeThePost();
		}
	};

	const isLiked = async () => {
		try {
			const response = await axios.get(
				`${API_CONFIG.baseUrl}/post/${data.id}/is-liked/`,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			setIsLikedByUser(response.data.is_liked);
		} catch (error) {
			toast("Something went wrong");
			console.log(error);
		}
	};

	const handleComment = () => {
		return navigate(`/comment`, {
			state: { data },
		});
	};

	const handleAddBookmark = async () => {
		try {
			const response = await axios.post(
				`${API_CONFIG.baseUrl}/post/bookmark/`,
				{
					post_id: data.id,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			toast(response.data.message);
		} catch (error) {
			toast("Something went wrong");
			console.log(error);
		}
	};

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
		<div className="bg-slate-100 w-full p-2 h-full rounded-2xl mt-2">
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
				</div>
			</div>
			<div className="text-md px-16 pt-3 pb-6">{data.content}</div>
			<div className="flex items-end justify-end space-x-4 mr-4">
				<div
					onClick={handleLikes}
					className="flex px-3 py-1  text-slate-500 rounded-lg space-x-2 items-center justify-center cursor-pointer hover:bg-slate-200"
				>
					{isLikedByUser ? (
						<AiFillLike size={20} />
					) : (
						<AiOutlineLike size={20} />
					)}
					<span className="text-xs font-bold text-slate-500">
						{likesCount}
					</span>
				</div>

				<div
					onClick={handleComment}
					className="flex px-3 py-1  text-slate-500 rounded-lg space-x-2 items-center justify-center cursor-pointer hover:bg-slate-200"
				>
					<BiMessageSquareDetail size={20} />
					<span className="text-xs font-bold text-slate-500">
						{data.comments_count}
					</span>
				</div>
				<div className="flex px-3 py-1  text-slate-500 rounded-lg space-x-2 items-center justify-center cursor-pointer hover:bg-slate-200">
					<FaRetweet size={20} />
				</div>
				<div
					onClick={handleAddBookmark}
					className="flex px-3 py-1  text-slate-500 rounded-lg space-x-2 items-center justify-center cursor-pointer hover:bg-slate-200"
				>
					<BiBookmark size={20} />
				</div>
			</div>
		</div>
	);
}

export default DwipPost;
