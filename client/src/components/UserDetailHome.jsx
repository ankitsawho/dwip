import React, { useEffect, useState } from "react";
import Identicon from "react-identicons";
import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAuthStore from "../../zustand/auth-store";
import jwtDecode from "jwt-decode";
import API_CONFIG from "../../api.config";
import axios from "axios";
import CreatePostModal from "./CreatePostModal";

function UserDetailHome() {
	const accessToken = useAuthStore((state) => state.accessToken);
	const user_id = jwtDecode(accessToken).user_id;
	const [user_detail, setUserDetail] = useState(null);
	useEffect(() => {
		const getUserDetail = async () => {
			try {
				const response = await axios.get(
					`${API_CONFIG.baseUrl}/account/get-detail/${user_id}/`,
					{
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					}
				);
				setUserDetail(response.data.data);
			} catch (error) {
				console.error(error);
			}
		};
		getUserDetail();
	}, []);

	return (
		<div className="hidden lg:block w-80 pl-6 pr-3 space-y-3">
			<div className="flex flex-col bg-slate-100 p-8 rounded-2xl items-center justify-center">
				<Link
					to={`profile/${user_id}`}
					className="flex flex-col items-center justify-center"
				>
					<div className="bg-white rounded-full flex items-center justify-center p-5">
						<Identicon string={user_id.toString()} size={50} />
					</div>
					<div className="font-bold text-xl mt-3 text-slate-700">
						{user_detail && user_detail.username}
					</div>
					<div className="my-2"></div>
					<div className="flex items-center justify-center space-x-4">
						<div className="space-x-2 font-bold text-sm text-slate-500">
							<span>{145}</span>
							<span>connections</span>
						</div>
					</div>
				</Link>
			</div>
			<CreatePostModal />
		</div>
	);
}
const MoreLinks = ({ icon: Icon, title }) => {
	return (
		<div className="flex justify-center space-x-2 bg-slate-200 hover:bg-slate-300 py-4 my-2 text-slate-600 rounded-full cursor-pointer">
			<Icon size={18} />
			<span className="font-bold text-sm hidden lg:block">{title}</span>
		</div>
	);
};

export default UserDetailHome;
