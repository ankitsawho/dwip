import React, { useState } from "react";
import Modal from "react-modal";
import { TfiClose } from "react-icons/tfi";
import Identicon from "react-identicons";
import DynamicTextarea from "./DynamicTextarea";
import { BiSolidSend } from "react-icons/bi";
import API_CONFIG from "../../api.config";
import useAuthStore from "../../zustand/auth-store";
import axios from "axios";
import toast from "react-hot-toast";
import jwtDecode from "jwt-decode";
import useReloadStore from "../../zustand/reload-store";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "90%",

		borderRadius: "30px",
	},
};

Modal.setAppElement("#root");

function CreatePostModal() {
	const [modalIsOpen, setIsOpen] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
	}

	const [text, setText] = useState("");
	const accessToken = useAuthStore((state) => state.accessToken);
	const user_id = jwtDecode(accessToken).user_id;
	const setReloadPosts = useReloadStore((state) => state.setReloadPosts);

	const handlePost = async () => {
		try {
			const response = await axios.post(
				`${API_CONFIG.baseUrl}/post/`,
				{
					content: text,
				},
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				}
			);
			toast("Dwipped !!!");
			setText("");
			setReloadPosts();
			closeModal();
		} catch (error) {
			toast("Can't dwip :(");
			console.error(error);
		}
	};

	return (
		<div>
			<button
				onClick={openModal}
				className="w-full bg-slate-100 shadow-md rounded-full"
			>
				<h1 className="p-4 text-slate-600 font-extrabold">Create</h1>
			</button>
			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Example Modal"
			>
				<button onClick={closeModal} className="pb-8">
					<TfiClose size={24} />
				</button>
				<div className="w-full bg-slate-100 rounded-2xl p-3">
					<div className="flex items-start">
						<div className="p-2 m-3 bg-white rounded-full">
							<Identicon string={user_id} size={36} />
						</div>
						<div className="flex-1">
							<DynamicTextarea text={text} setText={setText} />
						</div>
					</div>
					<div className="flex items-end justify-end">
						<button
							onClick={handlePost}
							className="flex items-end justify-center space-x-3 bg-slate-600 text-slate-50 px-4 py-2 rounded-full m-2"
						>
							<BiSolidSend size={28} />
						</button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

export default CreatePostModal;
