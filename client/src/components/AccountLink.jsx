import React, { useEffect, useState } from "react";
import Identicon from "react-identicons";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import useAuthStore from "../../zustand/auth-store";
import axios from "axios";
import API_CONFIG from "../../api.config";

function AccountLink() {
	const accessToken = useAuthStore((state) => state.accessToken);
	const user_id = jwt_decode(accessToken).user_id;
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
		<Link to="/settings">
			<div className="flex items-center justify-center space-x-2 p-1 rounded-full bg-slate-200 hover:bg-slate-300 cursor-pointer">
				<div className="bg-slate-100 items-center justify-center flex rounded-full p-2">
					<Identicon string={user_id.toString()} size={24} />
				</div>
				<span className="font-bold text-sm text-slate-700 pr-4 hidden md:block">
					{user_detail && user_detail.username}
				</span>
			</div>
		</Link>
	);
}

export default AccountLink;
