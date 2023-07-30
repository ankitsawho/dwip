import React, { useState } from "react";
import Identicon from "react-identicons";
import DynamicTextarea from "./DynamicTextarea";
import { BiSolidSend } from "react-icons/bi";
import API_CONFIG from "../../api.config";
import useAuthStore from "../../zustand/auth-store";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function CreateComment({ post_id, setReload }) {
	const [text, setText] = useState("");
	const accessToken = useAuthStore((state) => state.accessToken);
	const handlePost = async () => {
		try {
			const response = await axios.post(
				`${API_CONFIG.baseUrl}/post/${post_id}/comments/`,
				{
					content: text,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			toast("Commented");
			setText("");
			setReload((prev) => !prev);
		} catch (error) {
			toast("Nothing to comment");
			console.error(error);
		}
	};
	return (
		<div className="w-full bg-slate-100 rounded-2xl pt-2 mt-4">
			<Toaster />
			<div className="flex items-start">
				<div className="p-2 m-3 bg-white rounded-full">
					<Identicon string="ankitsahu" size={24} />
				</div>
				<div className="flex-1">
					<DynamicTextarea
						text={text}
						placeholder={"comment on this dwip ..."}
						setText={setText}
					/>
				</div>
			</div>
			<div className="flex items-end justify-end">
				<button
					onClick={handlePost}
					className="flex items-end justify-center space-x-3 bg-slate-600 text-slate-50 px-4 py-2 rounded-full m-2"
				>
					<BiSolidSend size={24} />
				</button>
			</div>
		</div>
	);
}

export default CreateComment;
